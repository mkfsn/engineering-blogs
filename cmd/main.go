package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/mkfsn/engineering-blogs/internal/config"
	"github.com/mkfsn/engineering-blogs/internal/entities/domain"
	"github.com/mkfsn/engineering-blogs/internal/entities/repository"
	"github.com/mmcdole/gofeed"
	"golang.org/x/sync/errgroup"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&repository.Tag{})
	db.AutoMigrate(&repository.Author{})
	db.AutoMigrate(&repository.Post{})
	db.AutoMigrate(&repository.Source{})

	cfg, err := config.ReadFile("./config.yaml")
	if err != nil {
		log.Fatal(err)
	}

	sourceCh := make(chan domain.Source, 100)

	go func() {
		defer close(sourceCh)

		log.Printf("all sources: %d\n", len(cfg.Sources))

		for _, source := range cfg.Sources[:] {
			sourceCh <- source
		}
	}()

	g, ctx := errgroup.WithContext(ctx)

	parsed := 0

	for i := 0; i < 10; i++ {
		g.Go(func() error {
			for source := range sourceCh {
				sourceDAO := &repository.Source{
					Name: source.Name,
					Type: repository.SourceTypeRSS,
					Link: source.Link,
				}
				_ = db.FirstOrCreate(sourceDAO, &repository.Source{Name: sourceDAO.Name})

				// feed reader -> post scraper

				// fmt.Printf("source: %#v\n", source)

				childCtx, cancel := context.WithTimeout(ctx, time.Second*10)

				fp := gofeed.NewParser()
				feed, err := fp.ParseURLWithContext(source.Link, childCtx)
				if err != nil {
					cancel()
					log.Printf("failed to parse %s: %s: %s\n", source.Name, source.Link, err)
					return fmt.Errorf("failed to parse %s: %s: %w", source.Name, source.Link, err)
				}
				cancel()

				for _, item := range feed.Items {
					postDAO := &repository.Post{
						Title:         item.Title,
						Description:   item.Description,
						SourceID:      sourceDAO.ID,
						PublishedAt:   item.PublishedParsed,
						CoverImageURL: "", // TODO
						OriginURL:     item.Link,
					}

					result := db.FirstOrCreate(postDAO, &repository.Post{OriginURL: postDAO.OriginURL})
					if result.RowsAffected == 0 {
						continue
					}

					for _, author := range item.Authors {
						if author.Name == "" && author.Email == "" {
							continue
						}

						// find and append
						authorDAO := &repository.Author{
							Name:     author.Name,
							Email:    author.Email,
							SourceID: sourceDAO.ID,
						}
						db.FirstOrCreate(authorDAO, &repository.Author{Name: authorDAO.Name, SourceID: sourceDAO.ID})

						db.Model(postDAO).Association("Authors").Append(authorDAO)
					}

					for _, category := range item.Categories {
						if category == "" {
							continue
						}

						// find and append
						tagDAO := &repository.Tag{Name: category}
						db.FirstOrCreate(tagDAO, &repository.Tag{Name: category})

						db.Model(postDAO).Association("Tags").Append(tagDAO)
					}

					fmt.Printf("new post: %s\n", postDAO.Title)
				}

				parsed++
			}
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		log.Printf("error: %s\n", err)
		return
	}

	log.Printf("parsed sources: %d\n", parsed)
}
