"use client"
import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './_components/CheckoutForm'
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const Checkout = () => {
    const searchParams =useSearchParams();
    const options = {
        mode: 'payment',
        currency: "usd",
        amount: Number(searchParams.get("amount"))*100
    };

    return (
        <div>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm amount={Number(searchParams.get("amount"))}/>
            </Elements>
        </div>
    );
}

export default Checkout;
