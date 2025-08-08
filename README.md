# Payment Gateway Integration with Razorpay and Express.js

This project provides a robust integration of the Razorpay payment gateway using Node.js and Express.js. It supports order creation, request validation, stored procedure mapping, and logging — suitable for production-ready applications.

# Requirements
Node.js (v14.x or later)

Razorpay Account (for API Key & Secret)

MySQL Database (with stored procedure support)

Express.js

shortid for unique receipt IDs

Joi for request validation

# Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/payment-gateway.git
cd payment-gateway
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:
Create a .env file in the project root with the following:

env
Copy
Edit
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET_KEY=your_secret_key
Replace your_key_id and your_secret_key with your actual Razorpay credentials.

🚀 Running the Application
Start the application with:

bash
Copy
Edit
node app.js
By default, it runs on:
👉 http://localhost:3000/

📡 API Endpoint
🎯 Create Payment Order
URL: /api/razorpay/order

Method: POST

📥 Request Body:
json
Copy
Edit
{
  "amount": 1000,
  "org_id": 1,
  "user_id": 101,
  "payment_mode_id": 2,
  "scheme_transactions": [
    {
      "scheme_id": 5,
      "scheme_payment_transaction_id": 301
    }
  ]
}
amount – Amount in INR (e.g. 1000 = ₹1000)

org_id, user_id – Organization/User reference

payment_mode_id – Reference to payment method

scheme_transactions (optional) – Array of scheme-payment mappings

📤 Response:
Success:

json
Copy
Edit
{
  "success": true,
  "order": {
    "id": "order_LdqwDfP7xT9nzt",
    "amount": 100000,
    "currency": "INR",
    "receipt": "SriCWJ_A1b2C3"
    // Other Razorpay fields...
  },
  "amount": 1000
}
Failure:

json
Copy
Edit
{
  "success": false,
  "message": "Error creating payment order"
}
🧠 How It Works
Validates input using Joi schema

Initializes Razorpay using environment credentials

Creates order with amount × 100 (Razorpay uses paise)

Generates receipt using shortid (e.g., SriCWJ_xxx)

Maps order to scheme transactions using stored procedure:

sql
Copy
Edit
CALL usp_insert_create_order_mapping(order_id, org_id, user_id, amount, payment_mode_id, razorpay_order_json);
Logs activity (e.g., auditLog('Razorpay order created', { ... }))

🗃️ Project Structure
bash
Copy
Edit
├── app.js                         # Entry point
├── controllers/
│   └── razorpay.controller.js    # Razorpay integration logic
├── .env                          # API credentials
├── package.json                  # Dependencies
└── README.md                     # Project documentation
📦 Dependencies
Package	Description
express	Web framework for Node.js
razorpay	Razorpay SDK for Node.js
shortid	Generate short unique receipt IDs
joi	Input validation
mysql	Database connector for stored procedures
dotenv	Load environment variables from .env
winston	Logging system (optional, for audits)

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🔖 Notes
Update the stored procedure name and parameters as per your actual MySQL logic.

Always validate payment success using Razorpay webhook verification (recommended).

Secure your API routes using authentication middleware (e.g., JWT).

Replace "Sri" with dynamic org shortcode if needed.
