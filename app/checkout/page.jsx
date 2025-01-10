"use client";

import React, { Suspense } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function CheckoutComponent() {
    const searchParams = useSearchParams();
    const amount = Number(searchParams.get("amount"));

    const options = {
        mode: 'payment',
        currency: "usd",
        amount: amount * 100,
    };

    return (
        <div>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm amount={amount} />
            </Elements>
        </div>
    );
}

const Checkout = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutComponent />
        </Suspense>
    );
};

export default Checkout;
