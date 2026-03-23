import { Link, Outlet } from "react-router-dom";
import logo from "../assets/images/swiggy_logo_white.avif";
import Footer from "./footer";

const Navbar = () => {
    return (
       <>
        <nav className="bg-[#FF5200] text-white flex justify-between items-center px-4 md:px-12 py-4">
            <div className="flex items-center">
               <img src={logo} alt="Swiggy" className="h-10 md:h-12 object-contain" />
            </div>
            <ul className="flex items-center gap-6 md:gap-8 font-bold text-sm md:text-base">
                <li><Link className="hover:opacity-80 transition" to="/home">Swiggy Corporate</Link></li>
                <li><Link className="hover:opacity-80 transition" to="/services">Partner with us</Link></li>
                <button className="border border-white rounded-xl px-4 md:px-5 py-2 hover:bg-white/10 transition flex items-center gap-2">
                    Get the App
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </button>
                <Link to="/login" className="bg-black text-white rounded-xl px-6 md:px-8 py-2 md:py-2.5 hover:bg-gray-900 transition">Sign in</Link>
            </ul>
        </nav>
        <Outlet />
        <Footer />
       </>
    )
}

export default Navbar;