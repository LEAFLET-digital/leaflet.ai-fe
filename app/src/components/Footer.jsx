import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdCall, MdMessage } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

const Footer = () => {
  return (
    <div className="gradient-bg text-white px-5 relative z-50">
      <section className="max-w-[1200px] mx-auto text-white">
        <div className="grid md:grid-cols-3 py-5">
          {/* first col */}
          <div className="py-8 px-4">
            <h1 className="text-xl sm:text-3xl font-bold sm:text-left text-justify mb-3">
              Be Ready To Grow
            </h1>
            <p>
              Get Exclusive <span className="font-bold">Update </span>straight
              to your inbox. {/* Show login button if not signed in */}
              <SignedOut>
                <SignInButton mode="modal">
                  <a
                    href="#"
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    signup
                  </a>
                </SignInButton>
              </SignedOut>
            </p>

            <br />

            <div className="flex items-center h-10">
              <input
                type="text"
                className="py-1 px-3 w-full h-full  border-b-2 border-gray-200 focus:outline-none focus:border-sky-500 focus:ring-0"
                placeholder="Search AI contents"
              />
              <button
                className="ml-4 p-1 focus:outline-none text-gray-300 hover:text-sky-500"
                aria-label="Search"
              >
                <FaRobot size={24} />
              </button>
            </div>
          </div>
          {/* second col */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold mb-3">Our approach</h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#">About AI</a>
                  </li>
                  <li>
                    <a href="#">People</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold mb-3">Research</h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#">Infrastructure</a>
                  </li>
                  <li>
                    <a href="#">Resources</a>
                  </li>
                  <li>
                    <a href="#">Demos</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold mb-2">Contact Us</h1>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HiLocationMarker />
                  <p>Haldia, West Bengal</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <MdMessage />
                  <p>leaflet.digital0308@gmail.com</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <MdCall />
                  <p>+91 9883489879</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom section */}
        <div className="hidden sm:block">
          <div className="flex justify-between items-center py-6 border-t-2 border-gray-400">
            <span className="text-sm text-gray-400">
              copyright &copy; 2025 by Leaftlet.ai
            </span>
            <div className="flex items-center justify-center gap-4 pb-4">
              <a href="#">
                <FaInstagram className="text-4xl" />
              </a>
              <a href="#">
                <FaFacebook className="text-4xl" />
              </a>
              <a href="#">
                <FaLinkedin className="text-4xl" />
              </a>
            </div>
            <span className="text-sm text-gray-400">
              <ul className="flex gap-3">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
