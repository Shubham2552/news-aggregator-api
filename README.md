# news-api <br>
npm start to start the project <br>

## POST /register: Register a new user :send data in raw json format using postman <br>
eg {
    "id":"1",
    "fullName": "Shrey Mehta",
    "email": "shrey.mehta@gmail.com",
    "password": "12345678"
  }
<br>

## POST /login: Log in a user. send data in raw jason format using postman <br>

eg {
    "email": "shrey.mehta@gmail.com",
    "password": "12345678"
  }
  <br>
  
## POST /preferences: Update the news preferences for the logged-in user.<br>
add following header<br>
key:authorization value:JWT "token recieved from login route"<br>
also add the preferences in body raw json format<br>
eg. 
{
    "preferences":["Sports","Tech"]
}
<br>

## GET /preferences: Retrieve the news preferences for the logged-in user.<br>
set the authorization header with token recieved from login route and send request it will fetch the preferences.
<br>

## GET /news: Fetch news articles based on the logged-in user's preferences.<br>
set authorization hearder with token revcieved from login route and send request it will fetch the response object that contains articles.
if it shows wait click again.
