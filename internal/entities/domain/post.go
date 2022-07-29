package domain

import (
	"time"
)

type Tag struct {
	Name string
	// Later we might want to add rank
}

type Post struct {
	Author          string
	Category        string
	AuthorAvatarURL string
	PublishedAt     time.Time
	CoverImageURL   string
	OriginURL       string
	Title           string
	Description     string
	Tags            []Tag
}
