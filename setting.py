import os

DEBUG = True

REPO_NAME="guessidioms"
# Assumes the app is located in the same directory
# where this file resides
APP_DIR = os.path.dirname(os.path.abspath(__file__))

# In order to deploy to Github pages, you must build the static files to
# the project root
FREEZER_DESTINATION = APP_DIR

# Since this is a repo page (not a Github user page),
# we need to set the BASE_URL to the correct url as per GH Pages' standards
FREEZER_BASE_URL = "http://localhost/{0}".format(REPO_NAME)
FREEZER_REMOVE_EXTRA_FILES = False  # IMPORTANT: If this is True, all app files
                                    # will be deleted when you run the freezer