import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { userSignout } from "./features/signinSlice";
import RegisterScreen from "./screens/RegisterScreen";
import { newuserSignout } from "./features/registerSlice";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";

function App() {
  const { cartItems } = useSelector((state) => state.addToCart);
  const { userInfo, isSignedIn } = useSelector((state) => state.signin);
  const { newuserInfo, isRegistered } = useSelector((state) => state.register);

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(userSignout());
    dispatch(newuserSignout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Centerspade
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {isSignedIn || isRegistered ? (
              <div className="dropdown">
                <Link to="#">
                  {isSignedIn ? `${userInfo.name} ` : `${newuserInfo.name} `}
                  <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>

        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
