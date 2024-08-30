# isopod_js
Trivial adventure game to learn about build scripts for Plain js and HTML.

See it live [here](https://matthewdeanmartin.github.io/isopod_js/src/)

## Build Script

Works:
- uses modules
- format with prettier
- some tests with jest (mocking failing to intercept a function)
- linting with eslint
- 1/2 of minifying with terser, but doesn't update index.html
- live reload with live-server

Doesn't work:
- jsdoc
- creating a full "production" build
- jest mocks

## setup

`npm install -g live-server`
