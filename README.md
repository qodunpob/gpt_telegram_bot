# GPT Telegram Bot

A simple Node.js implementation of a Telegram Bot that uses the OpenAI API to generate responses.

<img src="misc/demo.gif" width="231" height="500" alt="Demo">

## Environment variables

### `TELEGRAM_TOKEN`

Telegram Bot token that you got from BotFather
https://core.telegram.org/bots/tutorial

### `OPENAI_TOKEN`

OpenAI API key that you made in your OpenAI account
https://platform.openai.com/account/api-keys

### `OPENAI_MODEL`

OpenAI chat model
https://platform.openai.com/docs/models

**Note**: `gpt-3.5-turbo` is used as the default model

### `OPENAI_SYSTEM_MESSAGE`

The system message sets the bot's communication style
https://platform.openai.com/docs/guides/chat

**Note**: default system message is `You are a helpful assistant`

### `DB_URL`

DB connection URL

### `DB_SYNC`

Model synchronization mode. Could be `true` or `false`
https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization

**Note**: not recommended for use in production environment

### `DB_LOGGING`

Whether to log queries to the database. Could be `true` or `false`

## Running

### Install dependencies

```
npm install
```

### Run migrations

```
npm run migrate:up
```

### Build and run

```
npm run build
npm start
```

## Contributing

### Run in development mode

```
npm run start:dev
```

### Test

```
npm test
```

### Lint

```
npm run lint
npm run lint:fix
```

### Generate migration skeleton

```
npm run migration:generate -- <migration name>
```

### Roll back migrations

```
npm run migrate:down
```


