import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import CartContext from "../../store/cart-context";
import { tokenPayload } from "../../util/sessionHandler";
import classes from "./Header.module.css";
const Header = ({ className }) => {
  const ctx = useContext(CartContext);
  const payload = tokenPayload();
  const isOwner = payload && payload.privilege === "owner";
  const name = payload && payload.name;
  const logout = () => {
    ctx.logout();
  };
  const kitchenId = payload && payload.kitchenId;
  return (
    <header className={`${classes.header} ${className ? className : ""}`}>
      <NavLink to="/" end>
        <h1> KITCHEN DELIGHTS</h1>
      </NavLink>
      <ul className={classes.list}>
        {ctx.isLoggedIn ? (
          <>
            <li className={classes.dropdown}>
              Hello! {name}
              <div className={classes["dropdown-items"]}>
                <Link to="/edit-account">My Account</Link>
                {isOwner && (
                  <>
                  
                    <NavLink to="/my-kitchen" end>
                      My Kitchen
                    </NavLink>
                    <NavLink to={"/view-orders/" + kitchenId} end>
                      View Orders
                    </NavLink>
                  </>
                )}
              </div>
            </li>
            <li style={{ color: "red" }}>
              <NavLink to="/logout" onClick={logout}>
                Logout
              </NavLink>
            </li>
            <li style={{ color: "red" }}>
              <NavLink to="/chatbot" >
                🤖
              </NavLink>
            </li>
            
          </>
        ) : (
          <>
            <li>
              <NavLink to="/auth?mode=login" end>
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth?mode=signin" end>
                Sign up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
