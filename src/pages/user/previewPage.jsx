import { useState } from "react";
import { Link} from "react-router-dom";
import Footer from "../../components/footer";
import redLogo from "../../assets/images/red-logo.png";



const menuSections = [
  {
    id: "must-try", label: "Must Try", count: 4,
    featured: {
      id: 1, name: "Avocado & Quinoa Power Bowl", price: 449, veg: true, bestseller: true,
      description: "Creamy avocado slices, organic tri-color quinoa, roasted sweet potatoes, and honey-lemon vinaigrette.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPAaNMwS0AjwEnE01FrmnC3OlGEZgnYnubqF-wD6oE8ug7ImFLv5pvOM8T62BR7GNI9OQk4iYgYuDTq7eM6aTKwukrqVOoaYvw89AZpE_sp0qWnHdLsNJTZfD0IAtSPg6rs_KvHRWsBbxBqyJ6pZ-kiMMZn7dBYawBwgt298hYqbCOL_Qy1DzGzW8dWCuyuHOlETiim7xXJN_df7mpSMH7b_ltx84AE27W08xoCy5Gt6lx8EaWwwYk-v2WG5BAZjcBlW71nTBK6cM",
    },
    items: [
      { id: 2, name: "Grilled Chicken Caesar", price: 349, veg: false, description: "Crisp romaine lettuce, sourdough croutons, shaved parmesan and classic dressing.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv-6HlstA7WTc0v0Benqy5XDmByXKoI0bxAAj5mQOZ7DSrO6WVrHpIeDIwJyIgi4syMjoqoqLjfuQfi4SyFR3_BHeciyMryIkKPahkEX7g4i7_jvO1ev0qkhkpl4Z3juj3wdxWkTCav0xrAi7IX4DxcvqjLjlzxoDfRE86hvyUHmGX6xxYKRw7fv84HGs-2m7P-3NpobWKnerypusvkoYeZiiliwS2YBqy4ZEJnAcB0QpqvG-B3_M7ObfEo-BDCiRzvPOcjELU-d8" },
      { id: 3, name: "Mushroom Risotto", price: 399, veg: true, description: "Slow-cooked arborio rice with wild mushrooms and truffle oil.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvgeG97AVd1jWDWJGN1ItbsgK0JpFMS351_0trH4pgVeclSBdXkxGSyp1zuwkzdSNrpbr8n2eqp_WPnB3Ec9IecoRLamwcR68SjpYGNR5gXsRoHF77Zwr9bW9qP3C3Hxezb_Y11Go3NStUPpseA4SdVNPuMI0QIOOasNc8Z65FYPMEzHa22ueyT7f63rdU-xpmH0RmqmODdCW4x9gU22cuMRQqZlqNDiKyedL6Qz6L5sbFb-Jwz6ZAWGEnNqQV4eXoKea4dWqG3eQ" },
    ],
  },
  {
    id: "main-course", label: "Main Course", count: 8, featured: null,
    items: [
      { id: 4, name: "Paneer Tikka Steak Bowl", price: 329, veg: true, description: "Marinated cottage cheese steaks served over brown rice with mint chutney.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6vdL8haF_lq0tUz2NQo4CmQtRdLGr-in8JM5A1OoMNJIh6jW9YsQ9a4McZZ4LLAN0SKvjgC1iilBDaGZ6CeTp0KH8YDXVdUIqQMpjZ_VqT1aQ_UbNT6FXvibz05f4Fu8Iigu0mf9rHbEp1BGzalfRAEP6zUQSVPRrKyCC8HrvKqYanrhUC-nHNXMe4Tq_anE3Fqh_locjEUqA2WDJZDXkbxL3vFlFjQaeRvmEgJIROrb6POCsnNMevWMXq4f7zAGqEmQQWOR1fEE" },
      { id: 5, name: "Herb Crusted Fish Fillet", price: 489, veg: false, description: "Basa fillet with herb crust, seasonal veggies and mashed potatoes.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOkKeuBM5hLrrq4FzD6UFbgtqj7MyOKCI3HmOWdQRLOI1RK0b3ZKWruy60vQBwcOiqjIkc9oRpQAxMRCgtHhhcj20p5pxRKZ2NqMscdgur9iylDNvt9QlA8N3wTH4ucBkW0CQuAr3ypEGch5B2x7vqLSu9plIdDxT9y0SfDQEqyBQug0TB-xpl7hzCjlRI7F3ZrWq2rN0KQe9U6_axyiF0WNnpLuAgKnehI3EcmmM22zsnOO-phNo7D5GYarBUTxHoZFuJRrPhU6E" },
    ],
  },
  {
    id: "beverages", label: "Beverages", count: 3, featured: null,
    isBeverage: true,
    items: [
      { id: 6, name: "Cold Brew", price: 189, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnO3vOWlbV0wZrDr7mkWRAOHWvfW5kgj-CEcu1vUOukbVQizWXGIYUwMwUOBGy0Vhe48AKHa8EciFJJBQWjkmbmpaR1plXu0y4BcgRX_oKhb3kny_BRAKLEwO2JG2uEOCaYCrLWcU0M1iadoitbcpSS6wtADacIe9w9zR60MnoSDARsQHx2bEmkEIlVM0AcQOcFsF_pMk9DlTCrLItUN9LyvhaGJXvlUWBbBCLI6RkTYZCPzTjzcsemsuCM5bgwdQQEYBFX3sYOPw" },
      { id: 7, name: "Berry Blast", price: 229, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTetadgkj2NLI5Z_15oAAovumzHYRgGGQ1r6i3qKkG4aFWi-GFHM_NeU98ONRMkSq5ze4j9krwnAhxbpZqtt700ifE-a_LKJy-9BoXTKX6v2Np17dT72zAdORKwb3v04SPCCvKBZFJc83ievyD_FlD70dsgPpAsCh0zwXt7bXIaXktavziNlO6s35Aw-iyI_UHU5xsP3MXb3T001NqDNwGLToD3ytL0uWuIcyYqVBnju0wXeMNcBL8CEN6JgeoiDd9qO-wliElYG8" },
      { id: 8, name: "Mint Cooler", price: 149, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZaUhH56y_RLloh-XP5Mc-GDRLW3CwN3C1H2TSBUoT1cLR2X2hbbLcECHcuml-CFcPMMHBX53rCKKUSrYbjMOYuN5_sRB-goSmTTWMeynr2bDCVm9b_mNPqeeEWDFeSeUZRlfFwRGROERM3rPBC4uGGsGV2vFRAhZXGXUofhkAoHyf98ylSHd135gCeOFGGHuFmQmOr8YRqwL8JG7_eeTJ9Tw8BkGMH8LNpFOApvDcuepf7qLyGHVNV4fawqzWVDttpTYTbq4xccM" },
    ],
  },
];

const VegDot = ({ veg }) => (
  <div className={`w-4 h-4 border-2 ${veg ? "border-green-600" : "border-red-600"} flex items-center justify-center rounded-sm shrink-0`}>
    <span className={`w-1.5 h-1.5 ${veg ? "bg-green-600" : "bg-red-600"} rounded-full`} />
  </div>
);

export default function PreviewPage() {
  const [cart, setCart] = useState({});
  const [activeSection, setActiveSection] = useState("must-try");

  const addToCart = (id, price) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const allItems = menuSections.flatMap((s) => s.featured ? [s.featured, ...s.items] : s.items);
    const item = allItems.find((i) => i.id === parseInt(id));
    return total + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="bg-[#f6f6f6] font-[Manrope,sans-serif] text-[#2d2f2f] min-h-screen">
      {/* Navbar */}
       <nav className="bg-white/80 backdrop-blur-xl fixed top-0 w-full z-50 shadow-[0_24px_24px_-12px_rgba(0,0,0,0.06)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link index to="/">
            <img src={redLogo} className="h-10 md:h-15 object-contain" alt="logo" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Offers", "Help", "Sign In"].map((item) => (
              <span key={item} className="text-slate-600 font-medium hover:text-orange-500 transition-colors cursor-pointer">{item}</span>
            ))}
            <div className="flex items-center gap-2 text-orange-600 font-bold border-b-2 border-orange-500 cursor-pointer">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-[#2d2f2f]">shopping_cart</span>
          </div>
        </div>
      </nav>
      <main className="pt-16 min-h-screen">
        {/* Hero */}
        <div className="relative w-full h-[480px] md:h-[614px] overflow-hidden">
          <img alt="The Green Bistro" className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWzVePQPvM-XhZL0YfBkRHxxJBa_sX60cBB9AH8yH708CuyiRJMp7OUpi8-eSLUq7QZ-zc1Kevnw2gjxs5S2KVwnZP7hp5E1X7ct4-RqTxHrtB6YMrgVI5PcrrvS2NTkIQjmHz9eS1WJ6AJ_oas8GiSQ9pb7fn7nH_GfE8OnE2rgWeLhs7e-41NX19kGQ5k2Z0kWSlp7361J5VMpSIhHWpcfh05_uqZkD-IbRo9Cqiy1B-W-oRoNwJma-wb13hQKi4mkXEgKmtuic" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f6f6f6] via-[#f6f6f6]/20 to-transparent" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-[Plus_Jakarta_Sans,sans-serif] text-3xl md:text-5xl font-extrabold tracking-tight text-[#2d2f2f] mb-2">The Green Bistro</h1>
                <div className="flex flex-wrap items-center gap-3 text-[#5a5c5c] font-medium">
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold">4.5</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dbdddd]" />
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">timer</span><span>25-30 mins</span></div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dbdddd]" />
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-lg">location_on</span><span>12th Main, Indiranagar</span></div>
                </div>
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
              <a href="#desserts" className="whitespace-nowrap px-6 py-3 rounded-xl hover:bg-[#f0f1f1] text-[#5a5c5c] font-medium transition-all">Desserts</a>
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
                        <p className="text-[#5a5c5c] text-sm mb-2">₹{item.price}</p>
                        <button onClick={() => addToCart(item.id, item.price)}
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
                            <span className="text-xl font-extrabold">₹{section.featured.price}</span>
                            <button onClick={() => addToCart(section.featured.id, section.featured.price)}
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
                            <span className="text-lg font-bold block mb-2">₹{item.price}</span>
                            <p className="text-sm text-[#5a5c5c] font-medium mb-4 line-clamp-2">{item.description}</p>
                            <button onClick={() => addToCart(item.id, item.price)}
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
                            <span className="text-lg font-bold block mb-2">₹{item.price}</span>
                            <p className="text-sm text-[#5a5c5c] font-medium">{item.description}</p>
                          </div>
                          <div className="relative w-40 h-32 flex-shrink-0">
                            <img alt={item.name} src={item.img} className="w-full h-full object-cover rounded-xl" />
                            <button onClick={() => addToCart(item.id, item.price)}
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
                <span className="text-lg font-bold">₹{cartTotal}</span>
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
