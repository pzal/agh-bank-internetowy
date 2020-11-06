Development environment setup:
--

* Install docker
* Install python3.8
* Install postgres locally (required to build python lib even inside venv)
```bash
brew install postgres
```
* Create virtualenv for the project
```bash
python3.8 -m venv ./.iksde_bank_env
```
* Setup env vars
```bash
cp ./config.env.dist ./config.env
```
* Install requirements
```bash
source ./.iksde_bank_env/bin/activate
pip install -r ./requirements.txt
pip install -r ./requirements-dev.txt
```
