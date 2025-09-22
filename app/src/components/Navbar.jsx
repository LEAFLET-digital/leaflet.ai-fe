import Logo from "../../../public/Images/logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user ? user.id : null;
  console.log(location.pathname);
  return (
    <div className="gradient-bg  sticky top-0 right-0 w-full z-50 py-4  sm:py-4 bg-inherit">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center  justify-center px-4 sm:px-3 py-1">
            <Link
              to="/"
              className="flex items-center gap-4 sm:gap-4 text-white font-bold text-3xl sm:text-l no-underline "
            >
              <img
                src={Logo}
                alt="Leaflet Logo"
                className="w-6 sm:w-10 md:w-12"
              />
              <span>LEAFLET.ai</span>
            </Link>
          </div>
          {!location.pathname.startsWith("/dashboard") && (
            <div className="text-white hidden md:block  px-6 py-2">
              <ul className="flex items-center gap-6 text-l py-4 sm:py-0">
                <li>
                  <Link to="/our-approach">Our approach</Link>
                </li>
                <li>
                  <Link to="/research">Research</Link>
                </li>
                <li>
                  <Link to="#">Docs</Link>
                </li>
                <li>
                  <Link to="/models">Models</Link>
                </li>
                <li>
                  <Link to="#">Blog</Link>
                </li>
              </ul>
            </div>
          )}
          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <div>
              {/* Show login button if not signed in */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-white border border-white px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base rounded-md hover:bg-white/10 transition">
                    Log in
                  </button>
                </SignInButton>
              </SignedOut>

              {/* Show user profile pic if signed in */}
              <SignedIn>
                {/* <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-10 h-10 rounded-full border-2 border-white",
                    },
                  }}
                /> */}
                {location.pathname !== "/dashboard" ? (
                  <button
                    onClick={() => {
                      navigate(`/dashboard`);
                    }}
                    className="text-white border border-white px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-base rounded-md hover:bg-white/10 transition"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="text-white border border-white px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base rounded-md hover:bg-white/10 transition"
                  >
                    Back to Home
                  </button>
                )}
              </SignedIn>
            </div>

            <div>
              <button className="text-white bg-blue-500 px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base rounded-md hover:bg-blue-600 transition hidden md:block">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
