# twitch.tv Markov chat bot
A chat bot for twitch.tv using Markov chains.

## Usage
1. Clone repo
2. npm install
3. Get a piece of literature or chat log and place it in the `texts/` folder.
4. Set up the config file with `cp config_template.js config.js` and enter in the appropriate twitch.tv username and password. Grab your password [here](https://twitchapps.com/tmi/).
5. Run `twitch_markov_bot.js` with this command: `node twitch_markov_bot.js [filename] [twitchtv channel] [seconds between messages]`. Example: `node twitch_markov_bot.js texts/keats.txt sodapoppin 10`.

## Playing around with it
Simply edit markov.js to play around with sentence generation algorithm.
