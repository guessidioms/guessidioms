# usage: bash commit.sh -am 'comments'

python freeze.py
git add --all
git commit "$@"
