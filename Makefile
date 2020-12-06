# GNU Make 3.8.2 and above

MAKEFLAGS += --no-print-directory

.EXPORT_ALL_VARIABLES:
.SILENT:

PATH := $(PWD)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

dev: NODE_ENV=true

all: clean
	esbuild src/index.js --bundle --minify --outfile=public/index.js
	html-minifier --collapse-whitespace src/index.html -o public/index.html

html:
	cp src/index.html public/index.html

js:
	esbuild src/index.js --bundle --sourcemap --outfile=public/index.js

clean:
	rm -rf public
	mkdir public
