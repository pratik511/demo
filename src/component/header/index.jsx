/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo";
import { isLoggedIn, logout } from "../../helpers/utils/auth.util";

const Header = () => {
  const navigate = useNavigate();
  console.log("isLoggedIn", isLoggedIn());

  const handelLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <header className="bg-slate-100 p-4 fixed top-0 left-0 right-0 z-50  text-white p-4 sticky top-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <img
              src={Logo}
              alt="Apple store"
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            <nav className="sm:flex space-x-4">
              {isLoggedIn() ? (
                <Link
                  onClick={() => handelLogout()}
                  className="text-black  md:text-lg"
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link to={"/login"} className="text-black  md:text-lg">
                    Login
                  </Link>
                  <Link to={"/signup"} className="text-black  md:text-lg">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
