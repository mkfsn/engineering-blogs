package repository

import (
	"time"

	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
}

type Author struct {
	gorm.Model
	Name     string `gorm:"index:source_author,unique"`
	Email    string
	SourceID uint `gorm:"index:source_author,unique"`
}

type Post struct {
	gorm.Model
	Title           string
	Description     string
	SourceID        uint
	Authors         []*Author `gorm:"many2many:post_authors;"`
	AuthorAvatarURL string
	PublishedAt     *time.Time
	CoverImageURL   string
	OriginURL       string `gorm:"uniqueIndex"`
	Tags            []*Tag `gorm:"many2many:post_tags;"`
}
