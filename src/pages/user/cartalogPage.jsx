import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/red-logo.png";
import { logout } from "../../utilitis/authServices";
import axios from "axios";

const filterOptions = ["10 Mins Delivery", "Veg", "Ratings 4.0+", "Delivery Time", "Cost For Two"];

export default function CatalogPage() {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 8;

  const fetchProducts = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-all-products?page=${page}&limit=${itemsPerPage}`);
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalProducts(response.data.total);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [currentPage]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };


  const toggleFilter = (f) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  return (
    <div className="bg-[#f6f6f6] font-[Manrope,sans-serif] text-[#2d2f2f] antialiased min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0_24px_24px_-12px_rgba(0,0,0,0.06)]">
        <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center">
            <img src={logo} alt="Culinaria Logo" className="h-14 object-contain cursor-pointer" onClick={() => navigate("/")} />
          </div>
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <input className="w-full h-11 bg-white border-none rounded-full px-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 shadow-sm" placeholder="Search for restaurant, cuisine or a dish" />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5a5c5c]">search</span>
            </div>
          </div>
          <nav className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              <span className="text-orange-600 font-extrabold border-b-2 border-orange-500 cursor-pointer">Browse</span>
              {!user && <span className="text-zinc-500 font-medium hover:text-orange-500 transition-colors cursor-pointer">Offers</span>}
              <span onClick={() => navigate("/cart")} className="text-zinc-500 font-medium hover:text-orange-500 transition-colors cursor-pointer">Cart</span>
              <span className="text-zinc-500 font-medium hover:text-orange-500 transition-colors cursor-pointer">Dineout</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm font-bold text-zinc-700 bg-zinc-100 px-4 py-2 rounded-full hidden sm:block">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                  <button onClick={handleLogout} className="text-sm font-bold text-[#FF5200] bg-orange-50 hover:bg-orange-100 transition-colors px-5 py-2 rounded-full shadow-sm">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="scale-95 active:scale-90 transition-transform" onClick={() => navigate("/cart")}>
                    <span className="material-symbols-outlined text-on-surface text-2xl">shopping_bag</span>
                  </button>
                  <button className="scale-95 active:scale-90 transition-transform" onClick={() => navigate("/login")}>
                    <span className="material-symbols-outlined text-on-surface text-2xl">account_circle</span>
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      
      <main className="pt-24 pb-24 max-w-screen-2xl mx-auto px-8">
        {/* Filters */}
        <section className="sticky top-20 z-40 py-6 bg-[#f6f6f6]">
          <div className="flex items-center gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#acadad]/30 rounded-full text-sm font-semibold hover:bg-[#f0f1f1] whitespace-nowrap">
              Filter <span className="material-symbols-outlined text-sm">tune</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#acadad]/30 rounded-full text-sm font-semibold hover:bg-[#f0f1f1] whitespace-nowrap">
              Sort By <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            {filterOptions.map((f) => (
              <button key={f} onClick={() => toggleFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap border ${activeFilters.includes(f) ? "bg-[#934600] text-white border-[#934600]" : "bg-white border-[#acadad]/30 hover:bg-[#f0f1f1]"}`}>
                {f}
              </button>
            ))}
          </div>
        </section>

        <h1 className="text-3xl font-extrabold font-[Plus_Jakarta_Sans,sans-serif] tracking-tight mb-8">
          {loading ? "Loading..." : `${products.length} Food items to explore`}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((p) => (
            <div key={p._id} className="group cursor-pointer" onClick={() => navigate("/preview", { state: { product: p } })}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex justify-between w-[calc(100%-24px)]">
                  <span className="bg-[#fa7e17] text-white px-3 py-1 rounded-lg text-xs font-black tracking-wider shadow-lg">HOT ITEM</span>
                  <span className="bg-white text-gray-900 px-3 py-1 rounded-lg text-xs font-black tracking-wider shadow-lg">₦{p.price}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold font-[Plus_Jakarta_Sans,sans-serif] mb-1 group-hover:text-[#934600] transition-colors line-clamp-1">{p.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <div className={`flex items-center gap-1 bg-green-700 text-white px-1.5 py-0.5 rounded text-xs font-bold`}>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  4.5
                </div>
                <span className="text-sm font-bold ml-1">• 25-30 mins</span>
              </div>
              <p className="text-[#5a5c5c] text-sm line-clamp-1">{p.category} • {p.foodtype}</p>
              <p className="text-[#5a5c5c] text-sm mt-0.5">{p.restaurant} • {p.location}</p>
            </div>
          ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No food items found right now.</p>
          </div>
        )}

        {/* Pagination */}
        {totalProducts > itemsPerPage && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-2xl bg-white border border-[#acadad]/20 flex items-center justify-center text-slate-400 hover:text-[#fa7e17] disabled:opacity-30 disabled:hover:text-slate-400 transition-all shadow-sm hover:shadow-md"
              >
                <span className="material-symbols-outlined font-bold">chevron_left</span>
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(totalProducts / itemsPerPage) }, (_, i) => i + 1)
                  .filter(page => {
                    return page === 1 || page === Math.ceil(totalProducts / itemsPerPage) || Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => {
                    const elements = [];
                    if (index > 0 && page - array[index - 1] > 1) {
                      elements.push(<span key={`ellipsis-${page}`} className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>);
                    }
                    elements.push(
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-12 h-12 rounded-2xl font-black text-sm transition-all shadow-sm ${
                          currentPage === page
                            ? "bg-[#fa7e17] text-white shadow-[#fa7e17]/30 scale-110"
                            : "bg-white text-zinc-600 hover:bg-orange-50 hover:text-[#fa7e17] border border-[#acadad]/10"
                        }`}
                      >
                        {page}
                      </button>
                    );
                    return elements;
                  })
                }
              </div>

              <button 
                disabled={currentPage >= Math.ceil(totalProducts / itemsPerPage)}
                onClick={() => {
                  setCurrentPage(prev => Math.min(Math.ceil(totalProducts / itemsPerPage), prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-2xl bg-white border border-[#acadad]/20 flex items-center justify-center text-slate-400 hover:text-[#fa7e17] disabled:opacity-30 disabled:hover:text-slate-400 transition-all shadow-sm hover:shadow-md"
              >
                <span className="material-symbols-outlined font-bold">chevron_right</span>
              </button>
            </div>
            
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing page {currentPage} of {Math.ceil(totalProducts / itemsPerPage)} ({totalProducts} items total)
            </p>
          </div>
        )}

      </main>

      <footer className="w-full pt-16 pb-8 bg-zinc-100 border-t border-zinc-200/50">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 px-8 max-w-screen-2xl mx-auto">
          <div className="col-span-2">
            <span className="text-xl font-black text-zinc-900 font-[Plus_Jakarta_Sans,sans-serif] mb-4 block">Culinaria</span>
            <p className="text-zinc-500 text-sm max-w-xs mb-6">Curation and quality in every bite. Discover the best dining experiences in your city.</p>
          </div>
          {[{ title: "Company", links: ["About Us", "Careers", "Partner with Us"] }, { title: "Contact", links: ["Help & Support", "Ride with us"] }, { title: "Legal", links: ["Terms of Service", "Privacy Policy"] }, { title: "Available in", links: ["Bangalore", "Gurgaon", "Hyderabad", "Delhi"] }].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-zinc-900 mb-4 font-[Plus_Jakarta_Sans,sans-serif]">{col.title}</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                {col.links.map((link) => <li key={link}><span className="hover:text-orange-500 transition-colors cursor-pointer">{link}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-screen-2xl mx-auto px-8 mt-16 pt-8 border-t border-zinc-200/30">
          <p className="text-zinc-400 text-xs">© 2024 Culinaria Editorial. All rights reserved.</p>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-900 text-white rounded-full flex justify-around items-center h-16 shadow-2xl z-50 px-4">
        {[{ icon: "explore", label: "Explore", active: true }, { icon: "search", label: "Search" }, { icon: "shopping_bag", label: "Cart" }, { icon: "person", label: "Profile" }].map((item) => (
          <button key={item.label} className={`flex flex-col items-center gap-1 ${item.active ? "text-orange-500" : "text-zinc-400"}`} onClick={() => item.label === "Cart" && navigate("/cart")}>
            <span className="material-symbols-outlined" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

