import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  merchantId: process.env.BRAINTREE_ID
});

const promiseGateway = () => {
  return new Promise((res, rej) => {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) rej(err);
      else res(response);
    });
  });
};

const promiseTransaction = (amount, paymentMethodNonce) => {
  console.log(paymentMethodNonce)
  return new Promise((res, rej) => {
    gateway.transaction.sale(
      {
        amount,
        paymentMethodNonce,
        options: {
          submitForSettlement: true
        }
      },
      (error, result) => {
        if (error) rej(error);
        else res(result);
      }
    );
  });
};

export const generateToken = async (req, res) => {
  try {
    const response = await promiseGateway();
    res.send(response);
  } catch (error) {
    res.status(500).json(err);
  }
};

export const processPayment = async (req, res) => {
  const {
    body: { paymentMethodNonce, amount }
  } = req;
  try {
    const result = await promiseTransaction(amount, paymentMethodNonce);
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};
