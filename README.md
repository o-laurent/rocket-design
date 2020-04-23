# rocket-design


sudo apt-get install python-pip build-essential python

pip install --user virtualenv

virtualenv .python-env

./.python-env/bin/pip3 install -r requirements.txt

export FLASK_APP=app.py

./.python-env/bin/python flask run

cd physics

make

make clean_o