# GNU Make 3.8.2 and above

MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.SILENT:

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

dev: NODE_ENV=true

all: clean
	esbuild src/index.js --bundle --minify --outfile=dist/index.js
	html-minifier --collapse-whitespace src/index.html -o dist/index.html

watch: clean sprites js html
	chokidar "src/**/*.js" -c "make js" \
	& chokidar "src/**/*.html" -c "make html" \
	& chokidar "src/**/*.png" -c "make sprites js"

html:
	cp src/index.html dist/index.html

js:
	esbuild src/index.js --bundle --sourcemap --outfile=dist/index.js

sprites:
	node bin/sprites.js $(shell find src/sprites -type f -name '*.png')

clean:
	rm -rf dist
	mkdir dist
