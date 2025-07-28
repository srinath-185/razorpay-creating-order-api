# Payment Gateway Integration with Razorpay and Express.js

This project provides a simple integration of the Razorpay payment gateway using Node.js and Express.js. It enables the creation of Razorpay orders for payments in INR currency.

## Requirements

- Node.js (v14.x or later)
- Razorpay Account (for API key and secret)
- Express.js
- ShortID for generating unique receipt IDs

## Installation

1. Clone the repository or download the code:
   ```
   git clone https://github.com/your-username/payment-gateway.git
```
Navigate into the project directory:

```
cd payment-gateway

``
Install the required dependencies:

```
npm install
```

Set up environment variables for Razorpay: Create a .env file in the root of your project and add the following:

```
{
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET_KEY=your_secret_key
}
```
Replace your_key_id and your_secret_key with your actual Razorpay credentials.

Running the Application
To start the application, run:
```
node app.js
```

By default, it will run on http://localhost:3000/.

API Endpoint
Create Payment Order
URL: /payment-gateway

Method: POST

Request Body:

json
```
{
  "amount": 1000
}
```
amount: The payment amount in INR (without decimals).
Response:

On success, the API returns the created order and the requested amount:
json
```
{
  "success": true,
  "order": {
    "id": "order_HZ5G8pCQW0iObv",
    "entity": "order",
    "amount": 100000,
    "currency": "INR",
    "receipt": "CWJ_pKfcY9FGs",
    ...
  },
  "amount": 1000
}

```
On failure, the API returns an error with a status code of 500.
Project Structure

├── app.js                # Entry point of the application  
├── package.json          # Project metadata and dependencies  
├── README.md             # Project documentation  
└── .env                  # Environment variables for Razorpay credentials  


## How It Works

The Razorpay instance is initialized using your key ID and secret key from the environment variables.
The paymentGateway function receives a POST request with an amount.
It creates a Razorpay order with the amount multiplied by 100 (since Razorpay accepts the amount in paise).
A unique receipt ID is generated using the shortid package and concatenated with the string 'CWJ'.
The created order is sent back to the client as the API response.
Dependencies
Express: A minimal and flexible Node.js web application framework.
Razorpay: A Razorpay SDK for integrating payment gateway functionality.
ShortID: A package to generate short non-sequential unique IDs.


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Notes:
1. You can adjust the project structure depending on how your application is organized.
2. Make sure to add your actual Razorpay credentials in the `.env` file.
3. The `shortid` package is used to generate unique receipt IDs for each order created.





