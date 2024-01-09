## Cryptocurrency API Documentation 
![Site preview](/crypto-api.mp4)

## The Cryptocurrency Price Tracking API provides real-time information about cryptocurrency prices and allows users to manage user's favorite cryptocurrencies.

### Base URL:
 ```console
 http://localhost:5001
 ```

## WebSocket

### Real-time cryptocurrency updates are available through WebSocket.
### WebSocket Connection
 ```jsx harmony
  const socket = new WebSocket('ws://localhost:5001');
```
### Real-Time Updates

 ```jsx harmony
 socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

## Authentication
## JWT (JSON Web Token)
## To access protected endpoints, users need to authenticate using JWT.

### Register User
```console
http://localhost:5001/signup
 ```
### Request:
```console
{
  "username": "Mahesh Abeykoon",
  "email": "mahesh@test.com"
  "password": "something404"
}
 ```

### Response:
```console
{
 {
    "message": "User signed in successfully",
    "success": true,
    "user": {
        "email": "mahesh@test.com",
        "username": "Mahesh Abeykoon",
        "password": "$2b$15$9WifaIubKW7v2CflS.L1POqtIOnFeSD3pgThmYbO/ylHyTUybXvtC",
        "createdAt": "2024-01-09T18:35:05.099Z",
        "_id": "659d9d8f922d8d5d24de14c1",
        "__v": 0
    }
}
}
```

### Login
```console
http://localhost:5001/login
```
### Request:

```console
{
  "username": "Mahesh Abeykoon",
  "password": "secure_password"
}
```
### Response
```console
{
    "message": "User logged in successfully",
    "success": true
}
```
## Cryptocurrencies
### Get All Cryptocurrencies

```console
http://localhost:5001/all-cryptos
```
### Get Predifined Cryptocurrencies from the API

```console
http://localhost:5001/predefined-cryptos
```
### User make POST requests on favourites Cryptocurrencies

 ```jsx harmony
[
  {
    "id": "1",
    "name": "Bitcoin",
    "symbol": "BTC",
    "price": 45051.18
  },
  {
    "id": "2",
    "name": "Ethereum",
    "symbol": "ETH",
    "price": 2270.76
  },
  //..
]
```
#### Request:
```console
POST localhost:5001/crypto
```

### Request:
```console
 {
    "name": "Bitcoin",
    "symbol": "BTC",
    "price": "345.21"
 }
```
### Response:
```console
{
    "name": "Bitcoin",
    "symbol": "BTC",
    "price": 345.21,
    "_id": "659d9b38922d8d5d24de14ba",
    "__v": 0
}
```
### Make a GET Request for Specified Id

```console
http://localhost:5001/crypto/:id
```
### Make a PUT Request for Specified Id
```console
http://localhost:5001/crypto/:id
```
### Make a DELETE Request for Specified Id
```console
http://localhost:5001/crypto/:id
```
### Response
```console
Cryptocurrency deleted successfully
```

## This API documentation provides an overview of available endpoints, authentication procedures, and real-time updates through WebSocket. 
 
![Site preview](/incorrect_email.png)
![Site preview](/signup.png)
![Site preview](/sucessfull_signup.png)
![Site preview](/live_data.png)
![Site preview](/crud.png)


