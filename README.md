# rocket-design

sudo apt-get install python3-pip build-essential python3 git

Add the ssh key as explained here https://docs.gitlab.com/ee/ssh/

git clone git@github.com:oZ-0/rocket-design.git

cd rocket-design 

pip3 install --user virtualenv

sudo apt-get install python3-venv

python3 -m venv .python-env

./.python-env/bin/pip3 install -r requirements.txt  If you have an error installing progress, it should not matter

Optional
***********************
cd physics

make 

make clean_o
************************

cd ..

source ./.python-env/bin/activate 

export FLASK_APP=app.py

flask run

Go to http://127.0.0.1:5000/

************************
If you do not have much time but still want to see fine trajectories, try to lower the payload Mass :

Ariane 5 with 3 tons of payload mass (instead of 7) to a GTO orbit computed by the random optimizer with default parameters is a good try. (I had an error of 10^{-6})
