## Todo

### v1.0

- [x] Render guess word for each try in a 6x4 grids like wordle
- [x] Support generate url link for specified idiom
- [x] Stroke button turns to grey when it is clicked
- [x] Transfer this repo to a github organization
- [x] Mobile device adaptation

### v2.0

- [x] Nav bar v2.0: Help, Dark, Title, Stat, Share
- [x] Better UI: 5*4 Grid
- [x] Input in Grid directly: double-click or click a button to input

### v2.1

Focus on function improvement.

- [x] [not do]Move most HTML element related logic into HTML files
- [x] adjust element size
- [x] Beautify Buttons (no need to change logic in this stage)
- [x] Beautify all pages (background color, font size, etc)
- [ ] Share Page: generate url
- [ ] Stat Page: Add data tracking function, to record user's daily guess results like wordle
- [ ] Help Page: Add explanation to teach people what does the idiom mean

### v2.2

Focus on tech improvement.

- [ ] When input stroke, do not flash the page
- [ ] Double-check game logic

### v3.0

- [ ] Performance optimization
- [ ] China mainland deploy
- [ ] Donate page (static)

## Usage

Install dependency:

    bash install.sh

Run locally:

    bash run.sh

Then, open in your broswer:

http://127.0.0.1:7890/

## Static Model

The app can run in static model now, so it can be deployed on github pages.

To commit, you must run

    python tools/freeze.py

This command will report an error. But it doesn't matter. To generate the rendered `index.html` file. And then, push this repo, and open github pages in your github repo setting, and then you can access this app on

    https://<your_github_username>.github.io/guessidioms/

If you access the the URL above, you would get a random word to guess. Or you can set the "code" by,

    https://<your_github_username>.github.io/guessidioms/?code=E79BB8E6BFA1E4BBA5E6B2AB

## Important library

Render by,

https://hanziwriter.org/docs.html

Please search "renderFanningStrokes" in this page.

Stroke name data is from,

https://theajack.gitee.io/cnchar/doc/order.html

