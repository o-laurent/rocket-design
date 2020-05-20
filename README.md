# rocket-design


sudo apt-get install python-pip build-essential python

pip3 install --user virtualenv

sudo apt-get install python3-venv

python3 -m venv .python-env

./.python-env/bin/pip3 install -r requirements.txt

source ./.python-env/bin/activate 

export FLASK_APP=app.py

cd physics

make

make clean_o

flask run