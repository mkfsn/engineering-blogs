package config

import (
	"os"

	"github.com/mkfsn/engineering-blogs/internal/entities/domain"
	"gopkg.in/yaml.v3"
)

type Config struct {
	Sources []domain.Source `yaml:"sources"`
}

func ReadFile(filename string) (*Config, error) {
	f, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	decoder := yaml.NewDecoder(f)

	var cfg Config
	if err := decoder.Decode(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}
