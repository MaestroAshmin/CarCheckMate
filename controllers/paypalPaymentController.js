const paypal = require('paypal-rest-sdk');
const paypalConfig = require('../config/paypal-config');

paypal.configure({
  'mode': 'sandbox',
  'client_id': paypalConfig.clientId,
  'client_secret': paypalConfig.clientSecret
});

exports.createPayment = async (req, res) => {
  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://example.com/success',
      cancel_url: 'http://example.com/cancel'
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'Item Name',
          sku: 'ITEM001',
          price: '10.00',
          currency: 'AUD',
          quantity: 1
        }]
      },
      amount: {
        currency: 'AUD',
        total: '10.00'
      },
      description: 'Description of the payment'
    }]
  };

  try {
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Error creating payment' });
      } else {
        console.log('Payment created:', payment);
        res.json({ approval_url: payment.links.find(link => link.rel === 'approval_url').href });
      }
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Error creating payment' });
  }
};

exports.executePayment = async (req, res) => {
  const executePaymentData = {
    payer_id: req.body.payer_id
  };

  try {
    paypal.payment.execute(req.body.payment_id, executePaymentData, (error, payment) => {
      if (error) {
        console.error('Error executing payment:', error);
        res.status(500).json({ error: 'Error executing payment' });
      } else {
        console.log('Payment executed:', payment);
        res.json(payment);
      }
    });
  } catch (error) {
    console.error('Error executing payment:', error);
    res.status(500).json({ error: 'Error executing payment' });
  }
};