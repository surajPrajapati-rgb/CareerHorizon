#!/usr/bin/env bash
# exit on error
set -o errexit
# Load .env if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

pip install -r requirements.txt
python3 manage.py collectstatic --no-input

# python3 manage.py collectstatic --no-input
python3 manage.py makemigrations
python3 manage.py migrate

# python3 manage.py runserver
