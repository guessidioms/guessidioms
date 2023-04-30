# usage: bash commit.sh -am 'comments'

python tools/freeze.py
git add --all
git commit "$@"
