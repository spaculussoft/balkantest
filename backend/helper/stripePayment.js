
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);

const makePayment = async (lineItems) => {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: `http://localhost:3000/paymentSuccess`,
        cancel_url: `http://localhost:3001/canceled`,
    });

    return session
}

module.exports = { makePayment };
