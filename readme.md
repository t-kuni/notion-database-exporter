# notion-database-exporter

This tool exports Notion's database in csv format.

# Development
## Build

```
npm run build
# or
npm run watch
```

## Run

```
node dist/example.js
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
node dist/example.js
```