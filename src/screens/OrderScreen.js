import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { orderDetails } from "../features/orderSlice";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;

  useEffect(() => {
    dispatch(orderDetails(orderId));
  }, [dispatch, orderId]);

  const { detailedOrder, detailLoading, detailError } = useSelector(
    (state) => state.detailOrder
  );

  return detailLoading ? (
    <LoadingBox></LoadingBox>
  ) : detailError ? (
    <MessageBox variant="danger"></MessageBox>
  ) : (
    <div>
      {/* <h1>Order {detailedOrder._id}</h1> */}
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>{" "}
                  {detailedOrder.shippingAddress.fullName} <br />
                  <strong>Address: </strong>
                  {detailedOrder.shippingAddress.address},{" "}
                  {detailedOrder.shippingAddress.city},{" "}
                  {detailedOrder.shippingAddress.state},{" "}
                  {detailedOrder.shippingAddress.postalCode},{" "}
                  {detailedOrder.shippingAddress.country}
                </p>
                {detailedOrder.isDelivered ? (
                  <MessageBox variant="success">
                    {detailedOrder.deliveredAt}
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
                  <strong>Method:</strong> {detailedOrder.paymentMethod}
                </p>
                {detailedOrder.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {detailedOrder.paidAt}
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
                  {detailedOrder.orderItems.map((item) => {
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
                  <div>${detailedOrder.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${detailedOrder.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${detailedOrder.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${detailedOrder.totalPrice.toFixed(2)}</strong>
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
