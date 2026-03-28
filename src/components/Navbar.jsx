import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/images/swiggy_logo_white.avif";
import Footer from "./footer";
import ProductPage from "../pages/productPage";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
       <>
        <nav className="bg-[#FF5200] text-white flex justify-between items-center px-4 md:px-12 py-4 relative z-50">
            {/* Logo */}
            <div className="flex items-center cursor-pointer">
               <Link to="/">
                 <img src={logo} alt="Swiggy" className="h-10 md:h-12 object-contain" />
               </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-6 md:gap-8 font-bold text-sm md:text-base">
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

            {/* Mobile Menu Button */}
            <button 
                className="lg:hidden p-2 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>

            {/* Mobile Drawer Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#FF5200] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full shadow-2xl'}`}>
                <div className="flex flex-col p-8 gap-8">
                    <button 
                        className="self-end p-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <nav className="flex flex-col gap-6 font-bold text-lg">
                        <Link className="hover:opacity-80 transition" to="/home" onClick={() => setIsMenuOpen(false)}>Swiggy Corporate</Link>
                        <Link className="hover:opacity-80 transition" to="/services" onClick={() => setIsMenuOpen(false)}>Partner with us</Link>
                        <hr className="border-white/20" />
                        <button className="border border-white rounded-xl px-5 py-3 hover:bg-white/10 transition flex items-center justify-between">
                            Get the App
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </button>
                        <Link to="/login" className="bg-black text-white rounded-xl px-8 py-3 text-center hover:bg-gray-900 transition" onClick={() => setIsMenuOpen(false)}>Sign in</Link>
                    </nav>
                </div>
            </div>
        </nav>
        <Outlet />
        <ProductPage />
        <Footer />
       </>
    )
}

export default Navbar;