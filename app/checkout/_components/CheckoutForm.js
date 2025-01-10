import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CartContext } from '../../_context/CartContext';
import { useUser } from '@clerk/nextjs';
import CartApi from '../../_components/_utils/CartApi';
import OrderApi from '../../_components/_utils/OrderApi'

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {cart, setCart} = useContext(CartContext)
  const {user} = useUser()

  const handleSubmit = async (event) => {  
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    setLoading(true); // Start loading state
    setErrorMessage(''); // Reset error message
  
    // Submit the elements data
    const { error: submitError } = await elements.submit();
  
    if (submitError) {
      setLoading(false);
      setErrorMessage(submitError.message);
      return;
    }
  
    // Call the API to create a payment intent
    const res = await fetch('/api/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
  
    if (!res.ok) {
      setLoading(false);
      setErrorMessage("Failed to create payment intent");
      return;
    }
  
    const { client_secret } = await res.json();
  
    // Confirm the payment with the client secret
    const result = await stripe.confirmPayment({
      elements,
      clientSecret: client_secret,
      confirmParams: {
        return_url: "http://localhost:3000", // Replace with your actual return URL
      },
    });
  
    setLoading(false);
  
    if (result.error) {
      setErrorMessage(result.error.message);
    } else {
      // Handle successful payment
      createOrder();
    }
  };
  

const createOrder = ()=> {
  let productIds = []
  cart.forEach(ele => productIds.push(ele.product.documentId))
  const data = {
    data:{
      username: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      amount,
      products: productIds 
    }
  }
  OrderApi.createOrder(data).then((res)=>{
if(res) {
  cart.forEach(ele => {
    CartApi.deleteCartItem(ele?.documentId).then(result => {})
  })
}
  })
}
  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[320px] mt-40">
        <PaymentElement />
        <button className="bg-blue-200 p-2 text-gray-900 rounded-md w-full mt-4" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default CheckoutForm;
