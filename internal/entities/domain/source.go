package domain

import (
	"encoding/json"
	"errors"
)

type SourceType string

const (
	SourceTypeRSS SourceType = "rss"
)

type Source struct {
	Name string     `json:"name"`
	Type SourceType `json:"type"`
	Link string     `json:"link"`
}

func (s *Source) UnmarshalJSON(data []byte) error {
	// Define a secondary type so that we don't end up with a recursive call to json.Unmarshal
	type Aux Source
	alias := (*Aux)(s)
	err := json.Unmarshal(data, &alias)
	if err != nil {
		return err
	}

	// Validate the valid enum values
	switch s.Type {
	case SourceTypeRSS:
		return nil
	default:
		return errors.New("invalid value for Type")
	}
}
