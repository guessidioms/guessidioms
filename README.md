## Todo

### v1.0

- [x] Render guess word for each try in a 6x4 grids like wordle
- [x] Support generate url link for specified idiom
- [x] Stroke button turns to grey when it is clicked
- [x] Transfer this repo to a github organization
- [x] Mobile device adaptation

### v2.0

- [x] Nav bar v2.0: Help, Dark, Title, Stat, Share
- [ ] Better UI: 5*4 Grid, When input stroke, do not flash the page
- [ ] Beautify Buttons
- [ ] Share Page
- [ ] Stat Page: Add data tracking function, to record user's daily guess results like wordle
- [ ] Help Page: Add explanation to teach people what does the idiom mean

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

