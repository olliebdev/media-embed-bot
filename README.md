# Media Embed Bot

<!--toc:start-->
- [Media Embed Bot](#media-embed-bot)
  - [Installation](#installation)
  - [License](#license)
<!--toc:end-->

Automatically embeds into Discord chat:

- X
- Reddit

>requires webhook permissions
>as it creates a webhook to "fake" looking like the user posted it.

## Installation

`npm` package manager

```sh
npm install
```

Discord bot token is stored in a `.env` in `./` with the format:

```dotenv
TOKEN="token"
CLIENT_ID="client id"
```

## License

[MIT](https://github.com/olliebdev/media-embed-bot/blob/main/LICENSE)
