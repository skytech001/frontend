import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";

import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClickedProduct } from "../features/clickedProductSlice";
import { addItemToCart } from "../features/addToCartSlice";

const ProductScreen = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { clickedProd } = useSelector((state) => state.clickedProductDetail);
  const product = clickedProd;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const id = params.id;

  useEffect(() => {
    dispatch(getClickedProduct(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    navigate(`/cart`);
    dispatch(addItemToCart({ id, qty }));
  };

  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>Price : ${product.price}</li>
            <li>
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Status:</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <>
                  <li>
                    <div className="row">
                      <div>Qty</div>
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {/* the next line is an array constructor with a spread operator. it creates a new array with the length of
                            product.countinstock. countinstock is a number.the entire operation returns the keys of each spot in  the array. */}
                          {[...Array(product.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ); //here we get each key and add one because the array starts at 0.
                          })}
                        </select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={addToCartHandler}
                      className="primary block"
                    >
                      Add To Cart
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
