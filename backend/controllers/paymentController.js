const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    res.json({
      success: true,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
