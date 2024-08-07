import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Order from "../Models/order.js";

// PATH     :   /api/orders
// METHOD   :   Post
// ACCESS   :   Private
// Desc     :   Create new order
export const createOrder = asyncHandler(async (req, res) => {
  const stripe = new Stripe(
    "sk_test_51IutRpCcy8OEmYvUq77adzYjJTDLe8TJl5UW6eg99TzYWTfIofFKeY4G30I70p7ajKhlAuw8lXfCjgpRDxAyxZUX004L1dEEEP"
  );
  const user = req.user;
  const {
    orderItems,
    shippingAddress,
    subTotal,
    saleTax,
    shippingPrice,
    totalPrice,
    paymentMethod,
  } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "PKR",
      confirm: true,
      payment_method: paymentMethod.id,
      description: `${user.name} ordered ${orderItems.length} items.`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error("Unable to process order.");
  }

  const order = new Order({
    orderItems,
    shippingAddress,
    subTotal,
    shippingPrice,
    saleTax,
    totalPrice,
    paymentMethod,
    isPaid: true,
    paidAt: new Date(),
    user: user._id,
  });
  const createdOrder = await order.save();

  // Update countInStock for products

  res.status(201);
  res.json({
    _id: createdOrder._id,
  });
});
