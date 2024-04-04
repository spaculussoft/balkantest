const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEB_HOOK

const getWebHookDetails = async (req, res) => {

    try {
        let signature = req.headers['stripe-signature'];
        let event = req.body;
        if (endpointSecret) {
            try {
                event = await stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
                switch (event.type) {
                    case 'customer.created':
                        break;
                    case 'customer.subscription.created':
                        break;
                    case 'payment_intent.requires_action':
                        break;
                    case 'customer.updated':
                        break;
                    case 'invoice.payment_failed':
                        break;
                    case 'invoice.payment_action_required':
                        break;
                    case 'payment_intent.created':
                        break;
                    case 'invoice.updated':
                        break;
                    case 'invoice.created':
                        break;
                    case 'invoice.finalized':
                        break;
                    case 'checkout.session.completed':
                        let data = event.data;
                        break;
                    case 'invoice.payment_succeeded':
                        break;
                    case 'invoice.updated':
                        break;
                    case 'payment_method.attached':
                        break;
                    case 'invoice.paid':
                        break;
                    case 'customer.updated':
                        break;
                    case 'customer.subscription.updated':
                        break;
                    case 'payment_intent.succeeded':
                        break;
                    case 'charge.succeeded':
                        break;
                    default:
                        console.log(`Unhandled event type ${event.type}.`);
                }
            } catch (err) {
                return res.status(400).send('Webhook error');
            }
        }

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

module.exports = { getWebHookDetails }
