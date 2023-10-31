# AI Devs 2

Repo that uses Playwright test runner with TypeScript and axios for the second edition of [AI Devs](https://www.aidevs.pl/).
AI_Devs is a 5-week hands-on course on combining Generative AI tools (specifically OpenAI models) with application logic and automation tools that connects directly to models via APIs, building tailored tools to increase the efficiency of everyday tasks

## Getting started

## Install dependencies

```bash
npm i
```

# Add .env file with:

- AI_DEVS_API_KEY
- AI_DEVS_API_BASE_URL

# Delete .skip near the test that you'd like to run

This step is required to not run several tests at once that would consume more tokens when it's not intended

# Run tests

```bun
npm run <script_name>
```

Example:

```npm
npm run C02L02
```
