------------------Initial Setup-----------------------

1. run npm install to install all dependencies

2. configure app.properties file (shared in the email) as per mongodb configuration

3. Run npm start to start the node server



--------------------------API documentation--------------------------------
I am adding full url so that it is easy to test locally

1. First register with using following api 

http://localhost:3000/api/auth/register

  METHOD : POST
  HEADERS : {Content-Type : 'application/x-www-form-urlencoded'}

  BODY :  KEY   :   Value
        username : <username>
        password : <password>
        email  : <email>
        DOB   : <DOB>
        role : <admin/user>  (user by default)

2. Now login using the following api - returns jwt token

http://localhost:3000/api/auth/login

  METHOD : POST
  Add header  [{"key":"Content-Type","value":"application/x-www-form-urlencoded"}]


  BODY :  KEY   :   Value
        username   <username>
        password   <password>

Returns a token which is to be added to headers in the key x-access-token

3. http://localhost:3000/api/user/balanced

METHOD : POST

Add headers {Content-Type : 'application/x-www-form-urlencoded'}
            {x-access-token : <jwt token returned from successful login>}

BODY     KEY   : Value
        input  : <any bracket expression using {, },[ or ]>

4. To delete a user
  Only user with admin role will be able to do that
  
  http://localhost:3000/api/user/delete
  
  METHOD : POST

  Add headers {Content-Type : 'application/x-www-form-urlencoded'}
            {x-access-token : <jwt token returned from successful login>}

  BODY        KEY   :   Value
             username : <username to be deleted>

5. To list all the users
Only user with admin role will be able to do that

http://localhost:3000/api/user/all

METHOD : GET

Add headers {Content-Type : 'application/x-www-form-urlencoded'}
            {x-access-token : <jwt token returned from successful login>}


NOTE : authentication logic under auth folder
NOTE : user based api logic under user folder
NOTE : app.properties (to be placed in root folder)
       --file is sent separately in mail as it is not a good practice(security) to add configuration data to online repo.


