# The Cryptocurrency Price Tracking API provides real-time information about cryptocurrency prices and allows users to manage their favorite cryptocurrencies.

## Cryptocurrency API Documentation 

Base URL:
 ```console
      http://localhost:5001
 ```

## Authentication
JWT (JSON Web Token)
To access protected endpoints, users need to authenticate using JWT.

Register User
```console
      POST /register
 ```
Request:
```console
{
  "username": "Mahesh Abeykoon",
  "email": "mahesh@test.com"
  "password": "something404"
}
 ```

Response:
```console
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

Login
```console
 POST /login
```
Request:

```console
{
  "username": "john_doe",
  "password": "secure_password"
}
```

### WebSocket

Real-time cryptocurrency updates are available through WebSocket.



 ```jsx harmony
     import TestRenderer from "react-test-renderer";
```
![Site preview](/incorrect_email.png)
![Site preview](/signup.png)
![Site preview](/sucessfull_signup.png)
![Site preview](/live_data.png)
![Site preview](/crud.png)


