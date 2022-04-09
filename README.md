## Static Model

The app can run in static model now, so it can be deployed on github pages.

To commit, you must run

    python freeze.py

to generate the rendered `index.html` file. And then, push this repo, and open github pages in your github repo setting, and then you can access this app on

    https://<your_github_username>.github.io/moneyword/

If you access the the URL above, you would get a random word to guess. Or you can set the "code" by,

    https://<your_github_username>.github.io/moneyword/?code=E79BB8E6BFA1E4BBA5E6B2AB

## Usage

Install dependency:

    bash install.sh

Run locally:

    bash run.sh

Then, open in your broswer:

http://127.0.0.1:7890/

## Important library

Render by,

https://hanziwriter.org/docs.html

Please search "renderFanningStrokes" in this page.

Stroke name data is from,

https://theajack.gitee.io/cnchar/doc/order.html
