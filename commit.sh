# usage: source commit.sh commit

python freeze.py
git add --all
git commit -am "$@"