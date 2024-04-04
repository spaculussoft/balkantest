require("dotenv").config();
const express = require('express');
const app = express();
var cors = require('cors');
const connectDb = require('./utils/db');
var session = require('express-session')
const bodyParser = require('body-parser');
const path = require("path");

//*____________________Web Hook___________//
const paymentWebHookRoute = require('./router/paymentWebhookRouter');
app.use("/api/payment/", paymentWebHookRoute);
//*____________________Web Hook___________//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//*routers
const productRouter = require('./router/productRouter');
const paymentRoute = require('./router/paymentRouter');

app.use("/api/product", productRouter);
app.use("/api/payment", paymentRoute);

//*Serve static files, including uploaded images
app.use('/', express.static(path.join(__dirname, '/uploads')));

const PORT = 3001;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log('server is running at port: ' + PORT);
    })
})

