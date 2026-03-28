import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import redLogo from "../../assets/images/red-logo.png";
import { logout } from "../../utilitis/authServices";
import axios from "axios";

const VegDot = ({ veg }) => (
  <div className={`w-4 h-4 border-2 ${veg ? "border-green-600" : "border-red-600"} flex items-center justify-center rounded-sm shrink-0`}>
    <span className={`w-1.5 h-1.5 ${veg ? "bg-green-600" : "bg-red-600"} rounded-full`} />
  </div>
);

export default function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [cart, setCart] = useState({});
  const [activeSection, setActiveSection] = useState("");
  const [user, setUser] = useState(null);
  const [menuSections, setMenuSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check Auth
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Initialize Cart State from Storage
    let localCart = JSON.parse(localStorage.getItem('food_cart')) || [];
    localCart = localCart.filter(i => i && i.id != null && !Number.isNaN(Number(i.price)));
    localStorage.setItem('food_cart', JSON.stringify(localCart));
    
    const initialCartState = {};
    localCart.forEach(item => {
      initialCartState[item.id] = item.qty;
    });
    setCart(initialCartState);

    // Fetch Products & Group
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-all-products`);
        if (response.data.success) {
          const products = response.data.data;
          
          const allCategories = [
            "North Indian",
            "South Indian",
            "Chinese",
            "Italian",
            "Continental",
            "Desserts",
            "Beverages",
          ];
          
          const grouped = {};
          allCategories.forEach(cat => grouped[cat] = []);
          
          products.forEach(p => {
              const cat = p.category || "Others";
              if(!grouped[cat]) grouped[cat] = [];
              grouped[cat].push(p);
          });
      
          const dynamicSections = Object.keys(grouped).map(cat => {
              const items = grouped[cat];
              const isBeverage = cat === "Beverages";
              
              let featured = null;
              let regularItems = items;
              
              if (!isBeverage && items.length > 0) {
                  featured = {
                      id: items[0]._id, name: items[0].name, price: items[0].price, 
                      veg: items[0].foodtype === "Veg", description: items[0].description, 
                      img: items[0].image
                  };
                  regularItems = items.slice(1);
              }
      
              return {
                  id: cat.toLowerCase().replace(/\s+/g, '-'),
                  label: cat,
                  count: items.length,
                  isBeverage,
                  featured,
                  items: regularItems.map(p => ({
                      id: p._id, name: p.name, price: p.price, 
                      veg: p.foodtype === "Veg", description: p.description, 
                      img: p.image
                  }))
              };
          });
          
          // Optionally filter out empty categories if you only want to show occupied ones:
          // const activeSections = dynamicSections.filter(s => s.count > 0);
          
          setMenuSections(dynamicSections);
          if (dynamicSections.length > 0) setActiveSection(dynamicSections[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const addToCart = (item) => {
    const id = item._id || item.id;
    
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    let localCart = JSON.parse(localStorage.getItem('food_cart')) || [];
    let existing = localCart.find(i => i.id === id);
    if(existing) {
      existing.qty += 1;
    } else {
      localCart.push({
         id, 
         name: item.name, 
         price: item.price, 
         veg: item.foodtype === 'Veg' || item.veg || false, 
         qty: 1, 
         note: ''
      });
    }
    localStorage.setItem('food_cart', JSON.stringify(localCart));
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
     const localCart = JSON.parse(localStorage.getItem('food_cart')) || [];
     const item = localCart.find(i => i.id === id || i.id === parseInt(id));
     return total + (item ? item.price * qty : 0);
  }, 0);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading Menu...</div>;

  return (
    <div className="bg-[#f6f6f6] font-[Manrope,sans-serif] text-[#2d2f2f] min-h-screen">
      {/* Navbar */}
       <nav className="bg-white/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-[0_24px_24px_-12px_rgba(0,0,0,0.06)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link to="/">
            <img src={redLogo} className="h-10 md:h-15 object-contain" alt="logo" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Offers", "Help"].map((item) => (
              <span key={item} className="text-slate-600 font-medium hover:text-orange-500 transition-colors cursor-pointer">{item}</span>
            ))}
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
              <span onClick={() => navigate("/login")} className="text-slate-600 font-medium hover:text-orange-500 transition-colors cursor-pointer">Sign In</span>
            )}
            <div className="flex items-center gap-2 text-orange-600 font-bold border-b-2 border-orange-500 cursor-pointer" onClick={() => navigate("/cart")}>
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-[#2d2f2f]" onClick={() => navigate("/cart")}>shopping_cart</span>
          </div>
        </div>
      </nav>
      <main className="pt-16 min-h-screen">
        {/* Hero */}
        <div className="relative w-full h-[480px] md:h-[614px] overflow-hidden">
          <img alt={product ? product.name : "The Green Bistro"} className="w-full h-full object-cover"
            src={product ? product.image : "https://lh3.googleusercontent.com/aida-public/AB6AXuAWzVePQPvM-XhZL0YfBkRHxxJBa_sX60cBB9AH8yH708CuyiRJMp7OUpi8-eSLUq7QZ-zc1Kevnw2gjxs5S2KVwnZP7hp5E1X7ct4-RqTxHrtB6YMrgVI5PcrrvS2NTkIQjmHz9eS1WJ6AJ_oas8GiSQ9pb7fn7nH_GfE8OnE2rgWeLhs7e-41NX19kGQ5k2Z0kWSlp7361J5VMpSIhHWpcfh05_uqZkD-IbRo9Cqiy1B-W-oRoNwJma-wb13hQKi4mkXEgKmtuic"} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f6f6f6] via-[#f6f6f6]/20 to-transparent" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-[Plus_Jakarta_Sans,sans-serif] text-3xl md:text-5xl font-extrabold tracking-tight text-[#2d2f2f] mb-2">{product ? product.name : "The Green Bistro"}</h1>
                <div className="flex flex-wrap items-center gap-3 text-[#5a5c5c] font-medium">
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold">4.5</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dbdddd]" />
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">category</span><span>{product ? product.category : "25-30 mins"}</span></div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dbdddd]" />
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">location_on</span><span>{product ? product.location : "12th Main, Indiranagar"}</span></div>
                </div>
                {product && (
                  <div className="mt-6 flex flex-col items-start">
                     <p className="text-gray-500 max-w-md">{product.description}</p>
                     <p className="text-2xl font-black text-gray-900 mt-3">₦{product.price}</p>
                     <button onClick={() => addToCart(product)} className="mt-4 bg-[#FF5200] text-white px-8 py-3 rounded-xl font-bold tracking-wide shadow-lg shadow-[#FF5200]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                       <span className="material-symbols-outlined">add_shopping_cart</span>
                       Add to Cart
                     </button>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {["favorite", "share"].map((icon) => (
                  <button key={icon} className="w-12 h-12 rounded-full bg-[#f0f1f1] flex items-center justify-center hover:bg-[#e1e3e3] transition-colors">
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Layout */}
        <section className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-28 flex lg:flex-col gap-2 overflow-x-auto pb-2">
              {menuSections.map((s) => (
                <a key={s.id} href={`#${s.id}`} onClick={() => setActiveSection(s.id)}
                  className={`whitespace-nowrap px-6 py-3 rounded-xl font-medium transition-all ${activeSection === s.id ? "bg-[#fa7e17] text-[#3c1900] font-bold shadow-lg" : "hover:bg-[#f0f1f1] text-[#5a5c5c]"}`}>
                  {s.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Menu Sections */}
          <div className="flex-grow space-y-20">
            {menuSections.map((section) => (
              <div key={section.id} id={section.id}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-3xl font-extrabold tracking-tight">{section.label}</h2>
                  <span className="text-[#5a5c5c] text-sm font-medium">{section.count} ITEMS</span>
                </div>

                {section.isBeverage ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {section.items.map((item) => (
                      <div key={item.id} className="text-center group">
                        <div className="aspect-square rounded-full overflow-hidden mb-4 bg-[#f0f1f1] p-2 group-hover:p-1 transition-all duration-300">
                          <img alt={item.name} src={item.img} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <h4 className="font-[Plus_Jakarta_Sans,sans-serif] font-bold">{item.name}</h4>
                        <p className="text-[#5a5c5c] text-sm mb-2">₦{item.price}</p>
                        <button onClick={() => addToCart(item)}
                          className="text-[#934600] font-bold text-sm uppercase tracking-wide px-4 py-1 hover:bg-orange-50 rounded-full transition-colors">Add</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={section.featured ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "space-y-6"}>
                    {/* Featured card */}
                    {section.featured && (
                      <div className="col-span-2 group relative overflow-hidden bg-white rounded-xl p-6 flex flex-col md:flex-row gap-8 hover:bg-[#f0f1f1] transition-colors duration-300">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-3">
                            <VegDot veg={section.featured.veg} />
                            <span className="text-xs font-bold uppercase tracking-wider text-green-600">Bestseller</span>
                          </div>
                          <h3 className="font-[Plus_Jakarta_Sans,sans-serif] text-2xl font-bold mb-2">{section.featured.name}</h3>
                          <p className="text-[#5a5c5c] font-medium leading-relaxed mb-6 max-w-md">{section.featured.description}</p>
                          <div className="flex items-center gap-6">
                            <span className="text-xl font-extrabold">₦{section.featured.price}</span>
                            <button onClick={() => addToCart(section.featured)}
                              className="bg-[#fa7e17] text-[#3c1900] px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                              <span className="material-symbols-outlined text-lg">add</span>ADD
                            </button>
                          </div>
                        </div>
                        <div className="w-full md:w-56 h-56 rounded-xl overflow-hidden shrink-0">
                          <img alt={section.featured.name} src={section.featured.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </div>
                    )}

                    {/* Regular items */}
                    {section.items.map((item) => (
                      section.featured ? (
                        <div key={item.id} className="bg-white p-6 rounded-xl flex gap-6 hover:bg-[#f0f1f1] transition-colors group">
                          <div className="flex-grow">
                            <VegDot veg={item.veg} />
                            <h3 className="font-[Plus_Jakarta_Sans,sans-serif] text-lg font-bold mb-1 mt-2">{item.name}</h3>
                            <span className="text-lg font-bold block mb-2">₦{item.price}</span>
                            <p className="text-sm text-[#5a5c5c] font-medium mb-4 line-clamp-2">{item.description}</p>
                            <button onClick={() => addToCart(item)}
                              className="bg-white text-[#934600] border border-[#934600]/20 px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-50 transition-colors">
                              <span className="material-symbols-outlined text-lg">add</span>ADD
                            </button>
                          </div>
                          <div className="w-32 h-32 rounded-lg overflow-hidden shrink-0 shadow-sm">
                            <img alt={item.name} src={item.img} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ) : (
                        <div key={item.id} className="bg-white p-6 rounded-xl flex items-center justify-between hover:bg-[#f0f1f1] transition-colors">
                          <div className="flex-grow pr-12">
                            <VegDot veg={item.veg} />
                            <h3 className="font-[Plus_Jakarta_Sans,sans-serif] text-xl font-bold mb-1 mt-2">{item.name}</h3>
                            <span className="text-lg font-bold block mb-2">₦{item.price}</span>
                            <p className="text-sm text-[#5a5c5c] font-medium">{item.description}</p>
                          </div>
                          <div className="relative w-40 h-32 flex-shrink-0">
                            <img alt={item.name} src={item.img} className="w-full h-full object-cover rounded-xl" />
                            <button onClick={() => addToCart(item)}
                              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-[#934600] px-6 py-2 rounded-lg font-bold shadow-lg border border-orange-100 hover:bg-orange-50 active:scale-95 transition-all whitespace-nowrap">
                              ADD
                            </button>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
          <Link to="/cart">
            <button
              className="w-full bg-green-600 text-white flex items-center justify-between p-4 rounded-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">shopping_bag</span>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">{cartCount} Items Added</p>
                  <p className="font-extrabold text-lg">View Cart</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">₦{cartTotal}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </button>
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
