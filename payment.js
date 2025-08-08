const express = require('express');
const Razorpay = require('razorpay');
const short = require('shortid')
const app = express();
const Joi = require('joi');

//Razorpay key id and secret key
const key_id = process.env.RAZORPAY_KEY_ID
const key_secret = process.env.RAZORPAY_SECRET_KEY;

app.use(express.json());
       
var instance = new Razorpay({ key_id, key_secret });

module.exports.createRazorpayOrder = async function (req, res) {
  // Input validation
  const schema = Joi.object({
    amount: Joi.number().positive().required(),
    org_id: Joi.number().required(),
    user_id: Joi.number().required(),
    payment_mode_id: Joi.number().required(),
    scheme_transactions: Joi.array().items(
      Joi.object({
        scheme_id: Joi.number().required(),
        scheme_payment_transaction_id: Joi.number().required()
      })
    ).optional()
  });
  const { error } = schema.validate(req.body);
  if (error) return sendError(res, 400, error.details.map(x => x.message).join(', '));

  // Authorization (pseudo-code)
  // if (!req.user) return sendError(res, 403, 'Forbidden');

  connection.getConnection(async (err, conn) => {
    if (err) {
      winston.error('Error connecting to database:', err);
      return sendError(res, 500, 'Database connection error');
    }
    const { amount, org_id, user_id, payment_mode_id, scheme_transactions = [] } = req.body;
    try {
      
      const orgShortCode = 'Sri';
      const order = await instance.orders.create({
        amount: amount * 100,
        currency: 'INR',
        receipt: `${orgShortCode}${short.generate()}`
      });
      for (const transaction of scheme_transactions) {
        const insertQuery = 'CALL usp_insert_create_order_mapping(?, ?, ?, ?, ?, ?)';
        const insertParams = [
          order.id, org_id, user_id, amount, payment_mode_id, JSON.stringify(order)
        ];
        await new Promise((resolve, reject) => {
          conn.query(insertQuery, insertParams, (spErr, spResults) => {
            if (spErr) return reject(spErr);
            resolve(spResults);
          });
        });
      }
      auditLog('Razorpay order created', { user_id, org_id, orderId: order.id });
      res.status(201).json({ success: true, order, amount });
    } catch (error) {
      winston.error('Error processing Razorpay order:', error);
      sendError(res, 500, 'Error creating payment order');
    } finally {
      if (conn) conn.release();
    }
  });
};
