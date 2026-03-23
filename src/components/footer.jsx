import { Link } from "react-router-dom";
import logo from "../assets/images/swiggy_logo_white.avif";

const Footer = () => {
  return (
    <footer className="bg-[#f0f0f5] text-gray-700 py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF5200] rounded-full w-9 h-9 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[#FF5200] font-extrabold text-2xl">Swiggy</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 Swiggy Limited</p>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-[#FF5200] transition">About Us</Link></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Swiggy Corporate</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Careers</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Team</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Swiggy One</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Swiggy Instamart</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Swiggy Dineout</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Minis</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Pyng</a></li>
          </ul>
        </div>

        {/* Contact & Legal Column */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Contact us</h3>
          <ul className="space-y-2.5 text-sm mb-8">
            <li><a href="#" className="hover:text-[#FF5200] transition">Help &amp; Support</a></li>
            <li><Link to="/services" className="hover:text-[#FF5200] transition">Partner With Us</Link></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Ride With Us</a></li>
          </ul>
          <h3 className="font-bold text-gray-800 mb-4">Legal</h3>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-[#FF5200] transition">Terms &amp; Conditions</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Available In Column */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Available in:</h3>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-[#FF5200] transition">Bangalore</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Gurgaon</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Hyderabad</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Delhi</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Mumbai</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Pune</a></li>
          </ul>
          <button className="mt-4 text-sm border border-gray-400 rounded-lg px-4 py-1.5 flex items-center gap-1 hover:border-[#FF5200] transition">
            685 cities
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Life at Swiggy & Social Column */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Life at Swiggy</h3>
          <ul className="space-y-2.5 text-sm mb-8">
            <li><a href="#" className="hover:text-[#FF5200] transition">Explore With Swiggy</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Swiggy News</a></li>
            <li><a href="#" className="hover:text-[#FF5200] transition">Snackables</a></li>
          </ul>
          <h3 className="font-bold text-gray-800 mb-4">Social Links</h3>
          <div className="flex items-center gap-4 text-gray-600">
            {/* LinkedIn */}
            <a href="#" className="hover:text-[#FF5200] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-[#FF5200] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="hover:text-[#FF5200] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="hover:text-[#FF5200] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:text-[#FF5200] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;