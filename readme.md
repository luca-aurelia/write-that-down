# Write That Down

*Write That Down* is an Alfred 3 workflow. It lets you interact with Trello right in Alfred. Perfect for jotting down quick ideas.

We're still in alpha, so documentation will be minimal. We'll add support for non-technical users in beta.

## Features

- For now, only supports interacting with a single board.
- Search all lists and cards in a board.
- Action a search result to open the card in your default web browser.
- When creating a new card, use `;` to separate the title from the card description. For example:
  ```
  This is the title of my new card; this is the description.
  ```

## Limitations

**Connecting to Trello**

While in alpha, you'll have to set up the Trello API keys and whatnot yourself. Take a look at `trello.js` to see what information *Write That Down* requires.

**Setting up icons**

*Write That Down* can use specific icons for different lists. If you have a list named `Music Practice`, *Write That Down* will look for an icon at `./icons/music_practice.png`.

## License

[MIT](https://opensource.org/licenses/MIT) © 2017 [C. Thomas Bailey](https://github.com/noise-machines)
