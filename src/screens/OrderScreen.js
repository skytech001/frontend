import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const OrderScreen = () => {
  const { thisOrder, orderLoading, orderError } = useSelector(
    (state) => state.order
  );
  const { isSignedIn } = useSelector((state) => state.signin);
  const { currentOrder } = useSelector((state) => state.orderList);
  const displayOrder = thisOrder ? thisOrder : currentOrder[0];
  const navigate = useNavigate();

  return orderLoading ? (
    <LoadingBox></LoadingBox>
  ) : orderError ? (
    <MessageBox variant="danger">{orderError}</MessageBox>
  ) : (
    <div>
      {thisOrder && (
        <MessageBox>
          <h1>Thanks For Shopping With Us</h1>
        </MessageBox>
      )}
      <h1>Order {displayOrder._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>{" "}
                  {displayOrder.shippingAddress.fullName} <br />
                  <strong>Address: </strong>
                  {displayOrder.shippingAddress.address},{" "}
                  {displayOrder.shippingAddress.city}
                  {displayOrder.shippingAddress.state},{" "}
                  {displayOrder.shippingAddress.postalCode},{" "}
                  {displayOrder.shippingAddress.country}
                </p>
                {displayOrder.isDelivered ? (
                  <MessageBox variant="success">
                    {displayOrder.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Deliverd</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {displayOrder.paymentMethod}
                </p>
                {displayOrder.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {displayOrder.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {displayOrder.orderItems.map((item) => {
                    return (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                          <div className="min-30rem">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div>
                            {item.qty} x ${item.price} = $
                            {item.price * item.qty}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${displayOrder.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${displayOrder.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${displayOrder.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${displayOrder.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
