import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51IzejRSGtkXpGVpoTZhmKVH0sLipBO6WS1cJ7huRe6eKJpcST558D8U34eDsb1HHTS4xXYPccenJmFNNJUhTiKoq00BiDhkgQx"
);

const Pay = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );

        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makePayment();
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
