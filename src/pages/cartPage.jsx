import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import redLogo from "../assets/images/red-logo.png";
import axios from "axios";
import { logout } from "../utilitis/authServices";

const initialItems = [
  { id: 1, name: "Paneer Butter Masala", note: "Standard Prep", price: 249, qty: 1, veg: true },
  { id: 2, name: "Butter Naan", note: "With extra butter", price: 80, qty: 2, veg: true },
];

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    let localCart = JSON.parse(localStorage.getItem('food_cart')) || [];
    localCart = localCart.filter(i => i && i.id != null && !Number.isNaN(Number(i.price)));
    localStorage.setItem('food_cart', JSON.stringify(localCart));
    setItems(localCart);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const updateQty = (id, delta) => {
    setItems((prev) => {
        const newItems = prev.map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter((i) => i.qty > 0);
        localStorage.setItem('food_cart', JSON.stringify(newItems));
        return newItems;
    });
  };

  const itemTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = 45;
  const platformFee = 5;
  const gst = 28.45;
  const grandTotal = (itemTotal + deliveryFee + platformFee + gst).toFixed(2);

  const handleProceed = async () => {
    if (!user) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      
      const payload = {
        items: items,
        amountDetails: {
          itemTotal,
          deliveryFee,
          platformFee,
          gst,
          grandTotal: parseFloat(grandTotal)
        }
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-order`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const orderDetails = {
          orderId: response.data.orderId,
          date: new Date().toLocaleString(),
          items: items,
          itemTotal,
          deliveryFee,
          platformFee,
          gst,
          grandTotal,
          customer: user
        };
        
        // Clear cart upon successful order
        localStorage.removeItem('food_cart');
        
        // Navigate straight to the receipt page passing state
        navigate("/order", { state: { order: orderDetails } });
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order. Please try again.");
    }
  };

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
            <div className="flex items-center gap-2 text-orange-600 font-bold border-b-2 border-orange-500 cursor-pointer">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-[#2d2f2f]">shopping_cart</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left — Steps */}
          <div className="lg:col-span-8 space-y-6">

            {/* Step 1: Account (Done) */}
            <div className="bg-white p-8 rounded-xl flex items-start gap-6">
              <div className="bg-[#2d2f2f] text-white w-8 h-8 rounded-md flex items-center justify-center font-bold shrink-0">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-xl font-bold">Account</h2>
                  <span onClick={() => !user ? navigate("/login") : null} className="text-[#934600] font-bold text-sm tracking-wide uppercase cursor-pointer hover:underline">
                    {user ? "Change" : "Login"}
                  </span>
                </div>
                <p className="text-[#5a5c5c] font-medium">
                  {user ? (
                    <>Logged in as <span className="text-[#2d2f2f] font-bold">{user.name}</span> • {user.email}</>
                  ) : (
                    <>Please <span className="text-[#934600] font-bold cursor-pointer hover:underline" onClick={() => navigate("/login")}>log in</span> to place an order.</>
                  )}
                </p>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-start gap-6">
                <div className="bg-[#2d2f2f] text-white w-8 h-8 rounded-md flex items-center justify-center font-bold shrink-0">2</div>
                <div className="w-full">
                  <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-xl font-bold mb-6">Delivery Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Home Address Card */}
                    <div
                      onClick={() => setSelectedAddress("home")}
                      className={`border-2 p-6 rounded-xl relative cursor-pointer transition-all ${selectedAddress === "home" ? "border-[#fa7e17] bg-[#f0f1f1]" : "border-[#acadad]/40 hover:border-[#fa7e17]/50"}`}>
                      {selectedAddress === "home" && (
                        <div className="absolute top-4 right-4 text-[#934600]">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-[#5a5c5c]">home</span>
                        <h3 className="font-bold text-[#2d2f2f]">Home</h3>
                      </div>
                      <p className="text-[#5a5c5c] text-sm leading-relaxed mb-4">Flat 402, Elegance Residency, 12th Main, Indiranagar, Bengaluru, Karnataka 560038</p>
                      <button className="bg-[#fa7e17] text-black px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">DELIVER HERE</button>
                    </div>

                    {/* Add New Address */}
                    <div className="border-2 border-dashed border-[#acadad] p-6 rounded-xl flex flex-col items-center justify-center text-[#5a5c5c] hover:border-[#934600] transition-colors cursor-pointer group">
                      <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-[#934600] transition-colors">add_location</span>
                      <span className="font-bold text-sm">Add New Address</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment (disabled) */}
            <div className="bg-white p-8 rounded-xl opacity-50 pointer-events-none">
              <div className="flex items-start gap-6">
                <div className="bg-[#2d2f2f] text-white w-8 h-8 rounded-md flex items-center justify-center font-bold shrink-0">3</div>
                <div className="w-full">
                  <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-xl font-bold">Payment</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Cart Summary */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Restaurant Header */}
              {/* <div className="p-6 border-b border-[#e1e3e3] flex items-center gap-4">
                <img alt="Restaurant" className="w-12 h-12 rounded-lg object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMaVL4Ufr8GRdPMVG89hDTcsKcDtAV7uDr-woPZW290kQaJ5FU0qKLJsJXxoG9K2MX9vtS_gqrsPqcX49KsRRV2H3BHgEmOPLy-QGtRyspFqa5YeAYSoOpC_RJhjTZZxg3oGU0yAWfYudOzYH6vSddcRR_AyEfcfg07UpbubAm1Mm_mzan8QNQKw_Wbu9q29G-Y_FnKaVNBaXFtEanUa6tzjkLWJnpWJkDx18Skl6OhPnKOtt2SN_JbuSuLNa98pnU6ZrPo2gIjco" />
                <div>
                  <h3 className="font-[Plus_Jakarta_Sans,sans-serif] font-bold text-lg leading-tight">Royal Indian Kitchen</h3>
                  <p className="text-[#5a5c5c] text-xs font-medium">Indiranagar • 4.5 km</p>
                </div>
              </div> */}

              {/* Cart Items */}
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-green-600 text-sm mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_manual_record</span>
                      <div>
                        <p className="font-bold text-[#2d2f2f] leading-tight">{item.name}</p>
                        <p className="text-xs text-[#5a5c5c]">{item.note}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-[#acadad] rounded-md px-2 py-1 gap-3">
                        <span className="material-symbols-outlined text-xs cursor-pointer hover:text-[#934600] transition-colors select-none" onClick={() => updateQty(item.id, -1)}>remove</span>
                        <span className="text-xs font-bold text-[#934600] min-w-[12px] text-center">{item.qty}</span>
                        <span className="material-symbols-outlined text-xs cursor-pointer hover:text-[#934600] transition-colors select-none" onClick={() => updateQty(item.id, 1)}>add</span>
                      </div>
                      <span className="font-bold text-sm w-14 text-right">₦{item.price * item.qty}</span>
                    </div>
                  </div>
                ))}

                {/* Coupon */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 bg-[#f0f1f1] p-4 rounded-xl cursor-pointer group hover:bg-[#e7e8e8] transition-colors">
                    <span className="material-symbols-outlined text-[#934600]">sell</span>
                    <span className="text-[#5a5c5c] font-bold text-sm group-hover:text-[#934600] transition-colors flex-1">Apply Coupon</span>
                    <span className="material-symbols-outlined text-[#5a5c5c]">chevron_right</span>
                  </div>
                </div>

                {/* Bill Details */}
                <div className="mt-6 space-y-3">
                  <p className="font-[Plus_Jakarta_Sans,sans-serif] font-bold text-sm text-[#5a5c5c] uppercase tracking-wider">Bill Details</p>
                  {[
                    { label: "Item Total", value: `₦${itemTotal}` },
                    { label: "Delivery Fee | 4.5 kms", value: `₦${deliveryFee}` },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm text-[#5a5c5c]">
                      <span>{row.label}</span><span>{row.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#e1e3e3] pt-3 flex justify-between text-sm text-[#5a5c5c]">
                    <span>Delivery Tip</span>
                    <span className="text-[#934600] font-bold cursor-pointer">Add Tip</span>
                  </div>
                  {[
                    { label: "Platform Fee", value: `₦${platformFee}` },
                    { label: "GST and Restaurant Charges", value: `₦${gst}` },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm text-[#5a5c5c]">
                      <span>{row.label}</span><span>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total + Proceed */}
              <div className="bg-[#e1e3e3] p-6 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-[#5a5c5c] uppercase tracking-widest">To Pay</p>
                  <p className="text-xl font-black text-[#2d2f2f] font-[Plus_Jakarta_Sans,sans-serif]">₦{grandTotal}</p>
                </div>
                <button onClick={handleProceed} className="bg-[#934600] text-[#fff0e8] px-8 py-3 rounded-xl font-bold font-[Plus_Jakarta_Sans,sans-serif] shadow-lg hover:bg-[#813c00] transition-colors active:scale-95">
                  PROCEED
                </button>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 flex items-start gap-4 p-4 border border-[#acadad]/20 rounded-xl bg-white">
              <span className="material-symbols-outlined text-[#5a5c5c] shrink-0">verified_user</span>
              <p className="text-xs text-[#5a5c5c] leading-relaxed">100% Secure Payments. Your personal data is protected and encrypted for a safe transaction experience.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-100 w-full mt-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="text-lg font-bold text-slate-900 font-[Plus_Jakarta_Sans,sans-serif]">Swiggy Premium</div>
            <p className="text-slate-500 text-sm font-medium">© 2024 Swiggy Premium Ltd. All rights reserved.</p>
          </div>
          {[{ title: "Company", links: ["Privacy Policy", "Terms of Service"] }, { title: "Support", links: ["Help Center", "Contact Us"] }, { title: "Partners", links: ["Partner with us"] }].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-4 text-[#2d2f2f]">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => <li key={link}><span className="text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors cursor-pointer">{link}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
