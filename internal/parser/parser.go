package parser

import (
	"context"
	"time"
)

type ParseResult interface {
	Title() string
	PublishedAt() time.Time
	UpdatedAt() time.Time
	Author() string
	Content() []byte

	// TODO: OpenGraph related data
}

type Parser interface {
	Parse(ctx context.Context, link string) (<-chan ParseResult, error)
}
