import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CartButton from "../UI/CartButton";
import { useContext, useEffect } from "react";
import CartContext from "../../store/cart-context";
import { getToken, getTokenDuration } from "../../util/sessionHandler";

const CartLayout = () => {
  const ctx = useContext(CartContext);
  const cartItems = ctx.items.length > 0;
  const path = useLocation().pathname;
  const isCart = path === "/cart" || path === "/cart/";

  const token = getToken();
  const navigate = useNavigate();

  const login = ctx.login;
  const logout = ctx.logout;
  const setNumber = ctx.setNumber;

  useEffect(() => {
    if (!token) {
      return;
    }
    const time = getTokenDuration();
    if (time === "EXPIRED") {
      logout();
      navigate("/logout");
      return;
    }
    if (!ctx.isLoggedIn) {
      login();
      setNumber(JSON.parse(atob(token.split(".")[1])).number);
    }
    const timeout = setTimeout(() => {
      logout();
      navigate("/logout");
      console.log("logout");
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [token, navigate, login, logout, ctx.isLoggedIn, setNumber]);

  return (
    <>
      {cartItems && !isCart && <CartButton counter={ctx.items.length} />}
      <Outlet />
    </>
  );
};

export default CartLayout;
