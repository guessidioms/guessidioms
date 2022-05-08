## Static Model

The app can run in static model now, so it can be deployed on github pages.

To commit, you must run

    python freeze.py

to generate the rendered `index.html` file. And then, push this repo, and open github pages in your github repo setting, and then you can access this app on

    https://<your_github_username>.github.io/guessidioms/

If you access the the URL above, you would get a random word to guess. Or you can set the "code" by,

    https://<your_github_username>.github.io/guessidioms/?code=E79BB8E6BFA1E4BBA5E6B2AB

## Usage

Install dependency:

    bash install.sh

Run locally:

    bash run.sh

Then, open in your broswer:

http://127.0.0.1:7890/

## Todo

- [x] Render guess word for each try in a 6x4 grids like wordle
- [x] Support generate url link for specified idiom
- [x] Stroke button turns to grey when it is clicked
- [x] Transfer this repo to a github organization
- [x] Mobile device adaptation
- [ ] Add explanation to teach people what does the idiom mean
- [ ] Guess input support enter to submit
- [ ] When input stroke, do not flash the page
- [ ] Add data tracking function, to record user's daily guess results like wordle

## Important library

Render by,

https://hanziwriter.org/docs.html

Please search "renderFanningStrokes" in this page.

Stroke name data is from,

https://theajack.gitee.io/cnchar/doc/order.html
