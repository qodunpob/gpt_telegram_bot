# GPT Telegram Bot

A simple Node.js implementation of a Telegram Bot that uses the OpenAI API to generate responses.

## Environment variables

```
TELEGRAM_TOKEN
OPENAI_TOKEN
OPENAI_MODEL
OPENAI_SYSTEM_MESSAGE

DB_PROVIDER
DB_URL

FEATURE_CONVERSATION_MODE
```

### Note

1. `gpt-3.5-turbo` is used as the default model.
2. Default system message is "You are a helpful assistant".
3. Variables related to the DB are only needed if the conversation mode is used.

## Running

```
npm install
npm run start
```

