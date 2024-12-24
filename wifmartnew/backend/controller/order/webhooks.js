const stripe = require('../../config/stripe')
const addToCartModel = require('../../models/cartProduct')
const orderModel = require('../../models/orderProductModel')

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY


async function getLineItems(lineItems){
    let productItems = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId : productId,
                name : product.name,
                price : item.price.unit_amount/100,
                quantity : item.quantity,
                image : product.images
            }

            // console.log("image",product.image)

            productItems.push(productData)
        }
    }
    return productItems
}

const webhooks = async(request,response) =>{

    const sig = request.headers['stripe-signature'];

    const payloadString = JSON.stringify(request.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    })

    let event;

    try{
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    }catch(err){
        response.status(400).send(`webhook Error: ${err.message}`);
        return;
    }

    switch (event.type){
        case 'checkout.session.completed':
            const session = event.data.object;

           // console.log("sessions", session) do this to confirm if data was sent 
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
            // console.log("lineItems",lineItems)
            // console.log("totalAmount",session.amount_total/100 )

            const productDetails = await getLineItems(lineItems) //it will return product details

            const orderDetails = {
                productDetails : productDetails,
                email : session.customer_email,
                userId : session.metadata.userId,
                paymentDetails : {
                      paymentId : session.payment_intent,
                      payment_method_type : session.payment_method_types,
                      payment_status : session.payment_status,
                },
                shipping_options : session.shipping_options.map(s=>{
                    return{ ...s,
                        shipping_amount : s.shipping_amount/100

                    }
                    }),


                totalAmount : session.amount_total / 100
              
            }

            const order = await new orderModel(orderDetails)
            const saveOrder = await order.save() //this will save in mongodb

            if(saveOrder?._id){
                const deleteCartItem = await addToCartModel.deleteMany({userId : session.metadata.userId})
            }


            break;
            default:
                console.log(`Unhandle event type ${event.type}`);
        
        }



    response.status(200).send();
}

module.exports = webhooks