import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row menu-items">
          <li className="mt-3 ml-1 mr-3">
            <Link to="/orderHistory" className="order-history" style={{ textDecoration: 'none'}}>
              Order History
            </Link>
          </li>
          <li className="mx-1 mt-3 logout">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" className="logout" style={{ textDecoration: 'none'}} onClick={() => Auth.logout()}>
              Log Out
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row menu-items">
          <li className="mx-1 ml-1 mr-4 mt-4 login">
            <Link to="/signup" className="signup" style={{ textDecoration: 'none'}}>
              Sign Up
            </Link>
          </li>
          <li className="mx-1 mt-4">
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
      <div className="left-content">    
        <img className="logo ml-3 mt-2" src="./images/nwg_logo.png"></img>
      </div>

      <div className="mx-auto mt-1">
          <Link to="/" className="logoName" style={{ textDecoration: 'none' }}>
            <img src="./images/nwg.png" alt="new world gear"></img>
          </Link>
        </div>

      <nav className="right-content">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
