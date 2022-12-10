import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";

const PaymentMethodScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="paypal"
              name="paymentMethod"
              required
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>

        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="stripe"
              name="paymentMethod"
              required
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>

        <div>
          <button type="submit" className="primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
