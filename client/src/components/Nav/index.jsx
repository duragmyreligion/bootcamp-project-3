import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory" className="order-history" style={{ textDecoration: 'none'}}>
              Order History
            </Link>
          </li>
          <li className="mx-1 logout">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" className="logout" style={{ textDecoration: 'none'}} onClick={() => Auth.logout()}>
              Log Out
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1 login">
            <Link to="/signup" className="signup" style={{ textDecoration: 'none'}}>
              Sign Up
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login" className="login" style={{ textDecoration: 'none'}}>
              Log In
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <img className="logo" src="./images/New_World_Gear_Logo.png"></img>
      <h1>
        <Link to="/" className="logoName" style={{ textDecoration: 'none' }}>
          New World Gear
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
