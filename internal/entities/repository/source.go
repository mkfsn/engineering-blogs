package repository

import (
	"database/sql/driver"

	"gorm.io/gorm"
)

type SourceType int64

const (
	SourceTypeRSS SourceType = iota + 1
)

func (t *SourceType) Scan(value interface{}) error {
	*t = SourceType(value.(int64))
	return nil
}

func (t SourceType) Value() (driver.Value, error) {
	return int64(t), nil
}

type Source struct {
	gorm.Model
	Name    string `gorm:"uniqueIndex"`
	Type    SourceType
	Link    string `gorm:"uniqueIndex"`
	Posts   []Post
	Authors []Author
}
