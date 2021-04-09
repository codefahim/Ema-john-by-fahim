import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCartForm from './SimpleCartForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51IeA1PJfWzgyoKMBGDz2bxTScIuj3xgV44bwbVfuiN8FWHSg8J4SbGYzyPNyY99RhdxNBL3zCeRIolga7vr5MAyn00E0pMXJNQ'
);
const ProcessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCartForm handlePayment={handlePayment} />
    </Elements>
  );
};

export default ProcessPayment;
