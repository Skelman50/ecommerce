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

export const generateToken = async (req, res) => {
  try {
    const response = await promiseGateway();
    res.send(response);
  } catch (error) {
    res.status(500).json(err);
  }
};
