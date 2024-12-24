import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import displayNARCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import Context from '../context';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchUserAddToCart } = useContext(Context); // Use context to update cart count

    const cartItems = location.state?.cartItems || [];
    const totalPrice = location.state?.totalPrice || 0;

    // Calculate shipping fee
    const shippingFee = totalPrice < 10000 ? 300 : 500;
    const totalWithShipping = totalPrice + shippingFee;

    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        number: '',
        address: ''
    });

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto mt-10 text-center">
                <p className="text-lg font-medium">No items in the cart. Please go back to add items.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.checkout.url, {
                method: SummaryApi.checkout.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    shippingDetails,
                    totalWithShipping
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Order placed successfully!');
                fetchUserAddToCart();
                navigate('/success');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error processing your order. Please try again.');
        }
    };

    return (
        <div className="container px-4 mx-auto mt-[100px] lg:mt-[120px]">
            <h1 className="text-2xl mb-5">Checkout</h1>
            <div className="mb-5">
                <h2 className="text-lg">Shipping Details</h2>
                <input
                    type="text"
                    name="name"
                    value={shippingDetails.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="number"
                    name="number"
                    value={shippingDetails.number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-3"
                />
                <textarea
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-3"
                />
            </div>
            <div className="mb-5">
                <h2 className="text-lg">Order Summary</h2>
                <p>Total Price: {displayNARCurrency(totalPrice)}</p>
                <p>Shipping Fee: {displayNARCurrency(shippingFee)}</p>
                <p>Total with Shipping: {displayNARCurrency(totalWithShipping)}</p>
            </div>
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Place Order
            </button>
        </div>
    );
};

export default Checkout;