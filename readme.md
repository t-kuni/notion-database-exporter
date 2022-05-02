# About

Project skeleton for TypeScript CLI application.

# Usage

```
git clone --depth 1 https://github.com/t-kuni/ts-cli-app-skeleton.git [ProjectName]
cd [ProjectName]
rm -rf .git 
npm install
```

# Build application

```
npm run build
# or
npm run watch
```

# Run application

```
node dist/example.js
```

# Run tests

```
npm run test
```

# Build container

```
docker build --tag example-container .
```

# Run container

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
node dist/example.js --message="Test Message" --config=config.example.yml
```