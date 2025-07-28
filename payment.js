const express = require('express');
const Razorpay = require('razorpay');
const short = require('shortid')
const app = express();

//Razorpay key id and secret key
const key_id = process.env.RAZORPAY_KEY_ID
const key_secret = process.env.RAZORPAY_SECRET_KEY;

app.use(express.json());
       
var instance = new Razorpay({ key_id, key_secret });

module.exports.paymentGateway = async function(req, res) {
  let amount = [
    req.body.amount
  ];
  
  //console.log('CWJ'.concat('_',short.generate()))
  try {

    let order = await instance.orders.create({
      amount: amount * 100, 
      currency: 'INR',
      receipt: 'CWJ'.concat('_',short.generate()),
      });

    res.status(201).json({
        success: true,
        order,
        amount,
      });

    //res.json({ orderId: order.id });
    } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
