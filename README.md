# Shteam
A simple web web application that provides simple minimal functionalities of a mock-up online game store (think Steam, hence the name)

## How to run
In order to run, you need to first run the backend service. The backend is developed using Flask in Python, so the first step would be to create a virtual environment and install the requirements from `requirements.txt`. Then, you can run the back-end service using the following command:
```bash
flask --app main.py run
```
The back-end would then run on (presumably) port 5000. If the port is *not* 5000, then please make sure that this change is reflected in the file `shteam-front-end/src/constants.tsx` at line 6.

After running the back-end service successfully, the next thing is to run the front-end service, which can be done by first installing all the node packages, and then running the following command:
```bash
npm start
```
You should then be apple to view the web application in your browser.