import StripeForm from "./StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OCRfgSFVRQ2aTm4YnAztFVmAuPgzAhBVFosx4ctHmcXbUQwsjn9cCX578SMM2r5fTSrYUcOgZ0NP36q4w7MrYGI00eNANF4ku"
);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};

export default StripeContainer;
