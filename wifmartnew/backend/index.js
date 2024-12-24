const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Exit if unable to connect
    });

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());  // Middleware to parse JSON bodies
app.use(cookieParser())

app.use("/api", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});


// const express = require('express')
// const cors = require('cors')
// require('dotenv').config()
// const connectDB = require('./config/db')
// const router = require('./routes')

// const app = express()
// app.use(cors())
// app.use("/api",router)

// const PORT = 8080 || process.env.PORT

// connectDB().then(()=>{
//         app.listen(PORT, ()=>{
//         console.log("connected to DB")
//         console.log("server is running")
//     })
// })

// const express = require('express');
// const bodyParser = require('body-parser');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

// const app = express();

// app.use(bodyParser.raw({ type: 'application/json' }));

// app.post('/api/webhook', (req, res) => {
//     const sig = req.headers['stripe-signature'];
//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//         console.error(`Webhook Error: ${err.message}`);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         console.log('Checkout Session completed:', session);
//         // Handle the event here
//     }

//     res.json({ received: true });
// });

// app.listen(8080, () => console.log('Server is running on port 8080'));


// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const router = require('./routes');
// const webhooks = require('./controller/order/webhook'); // Adjust path as needed

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to DB'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);  // Exit if unable to connect
//     });

// const app = express();

// // CORS configuration
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse cookies
// app.use(cookieParser());

// // Middleware to parse raw body for Stripe webhooks
// app.use('/api/webhook', bodyParser.raw({ type: 'application/json' }));

// // Webhook route
// app.post('/api/webhook', webhooks);

// // Other routes
// app.use("/api", router);

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//     console.log("Server is running on port", PORT);
// });



// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const router = require('./routes');
// const webhooks = require('./controller/order/webhook'); // Adjust path as needed

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to DB'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);  // Exit if unable to connect
//     });

// const app = express();

// // CORS configuration
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse cookies
// app.use(cookieParser());

// // Middleware to parse raw body for Stripe webhooks
// app.use(bodyParser.raw({ type: 'application/json' }));

// // Your webhook route
// app.post('/api/webhook', webhooks);

// // Other routes
// app.use("/api", router);

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//     console.log("Server is running on port", PORT);
// });





/*const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Exit if unable to connect
    });

const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies
app.use("/api", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});*/




