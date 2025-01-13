import { EmailTemplate } from "../../_components/email-template";  // Assuming your email template is inside this file
import { Resend } from 'resend';
import { useUser } from "@clerk/nextjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ cart }) {
  const { user } = useUser();

  // Map through the cart and create a list of selected items to send in the email
  const cartItems = cart.map((item) => ({
    title: item?.product?.title,
    quantity: item?.selectedQuantity || '50ml', // Default to '50ml' if no quantity selected
    price: item?.product?.price // You can adjust to reflect the actual selected price if needed
  }));

  // Prepare the email content using your cart items
  const emailContent = cartItems.map((item) => {
    return `
      <p><strong>Product:</strong> ${item.title}</p>
      <p><strong>Quantity:</strong> ${item.quantity}</p>
      <p><strong>Price:</strong> ${item.price} dt</p>
      <hr />
    `;
  }).join('');

  try {
    // Send the email with the selected items
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',  // Adjust the sender email as necessary
      to: [user.primaryEmailAddress.emailAddress],
      subject: 'Your Cart Items',
      react: EmailTemplate({ 
        firstName: user.firstName || 'John', // Get first name from the user if available
        cartItems: emailContent, // Include the cart items in the email body
      }),
    });

    // Handle errors if any
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
