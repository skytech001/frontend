import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { saveShippingAddress } from "../features/shippingSlice";

const ShippingAddressScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fulladdress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

  const [fullName, setFullName] = useState(fulladdress.fullName);
  const [address, setAddress] = useState(fulladdress.address);
  const [city, setCity] = useState(fulladdress.city);
  const [state, setState] = useState(fulladdress.state);
  const [postalCode, setPostalCode] = useState(fulladdress.postalCode);
  const [country, setCountry] = useState(fulladdress.country);

  const submitHandler = (event) => {
    event.preventDefault();
    const fullAddress = {
      fullName,
      address,
      city,
      state,
      postalCode,
      country,
    };
    dispatch(saveShippingAddress(fullAddress));
    navigate("/payment");
  };

  return (
    <div>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            placeholder="Enter State"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="postalCode ">Postal Code</label>
          <input
            type="text"
            id="postalCode "
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="countrty">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
