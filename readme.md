# notion-database-exporter

This tool exports Notion's database in csv format.

# Usage (node/npm)

Install command

```
npm i -g notion-database-exporter
```

# Development
## Build

```
npm run build
# or
npm run watch
```

## Run

```
dist/main.js
```

## Run tests

```
npm run test
```

## Build container

```
docker build --tag example-container .
```

## Run container

```
docker run example-container example
```

# Update all packages

```
npm install -g npm-check-updates
ncu -u
npm install

# Check
npm run test
npm run build
node dist/main.js
```