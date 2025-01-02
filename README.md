# GitHubBackend
This is the GitHub Backend Project using Nodemailer and twilio
To setup the GitHub replica project follow the given instructions
Includes following features:
	1.	Users
	2.	Repos
	3.	Gists

Make sure the config folder is setup and apply the below variables for better clarity in your config/default.json
{
  "PORT": 5050,
  "DB_URL": "",
  "EMAIL": "",
  "PASS": "",
  "SID": "",
  "TOKEN": "",
  "PHONE": "",
  "JWT_SECRET": "",
  "URL": "http://localhost:5050"
}
Then follow these Instructions:


       
       1.	 First,Clone the repository

       ==>  git clone <repository_url>


	2.	 Navigate to the project directory

            --> cd GitHubBackend


	3.	Install all dependencies

            --> npm install packageName


	4.	Ensure nodemon is installed globally
            If not installed, run:

            --> npm install -g nodemon


	5.	Set up the config folder

	•	Create the config folder:

              --> mkdir config


	•	Inside the config folder, create a default.json file:

           --> cd config && touch default.json


	6.	Then, Run the project