# notion-database-exporter

This tool exports Notion's database in csv format.

# Usage (node/npm)

The supported node version is **16.15**. Other versions have not been tested.

1. Install command.

```
npm i -g notion-database-exporter
```

2. Add Notion Integration from the following page.

https://www.notion.so/my-integrations

![](https://i.gyazo.com/8d7df191143076f35d7931686df1f035.png)

3. Copy the token

![](https://i.gyazo.com/fafb5f6977d9eff158d42351f1e31fb9.png)

4. Open the page containing the database (even the parent page), click the Share button in the upper right corner, and then click the Invite button.

![](https://i.gyazo.com/66b77eaa604c689e0b76ef95f29c489f.png)

5. Select the integration you just created.

![](https://i.gyazo.com/d5d183d82679a2faecfd66e0b2209240.png)

6. Create `notion-db-exporter-secret.yml` in the folder where you run the command and write the token you just copied.

```yaml
notionToken: XXXX
```

7. The following command will output CSV to the `notion-db-csv` folder.

```bash
notion-database-exporter --export
```

You can also only display a list of databases.

```bash
notion-database-exporter --list
```

# Command Options

| option | description | default |
| --- | --- | --- |
| `-c`, `--config` | Specify the path to the configuration file | `./notion-db-exporter.yml` |
| `-s`, `--secret` | Specify the path to the secret file | `./notion-db-exporter-secret.yml` |
| `-l`, `--list` | display a list of databases | true |
| `-e`, `--export` | export databases | false | 

# Configuration

You can change the settings by placing `notion-db-exporter.yml` in the folder where you run the command.

```yaml
# Output directory.
outDir: './notion-db-csv'

# if want to filter database by title or id so enable below
#includes:
#  - title: "Your Database Title1"
#  - title: "Your Database Title2"
#  - id: "Your Database id1"
#  - id: "Your Database id2"
#excludes:
#  - title: "Your Database Title1"
#  - id: "Your Database id1"
```

# For development
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

## Release new version

[Document](https://gist.github.com/t-kuni/3d0a5cc86ab63cab3188160f5535afc0#%E6%96%B0%E3%81%97%E3%81%84%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%92%E6%8E%A1%E7%95%AA%E3%81%99%E3%82%8B)

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