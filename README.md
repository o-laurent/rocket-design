# rocket-design


sudo apt-get install python-pip build-essential python

pip3 install --user virtualenv

python3 -m venv .python-env

./.python-env/bin/pip3 install -r requirements.txt

export FLASK_APP=app.py

source ./.python-env/bin/activate 

cd physics

make

make clean_o

flask run