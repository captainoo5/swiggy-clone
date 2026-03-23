import { useState } from "react";
import { useNavigate } from "react-router-dom";

const restaurants = [
  { id: 1, name: "The Green Bistro", rating: 4.5, ratingColor: "bg-green-700", time: "25-30 mins", cuisine: "Salads, Healthy Food, Juices", location: "Indiranagar • 2.4 km", offer: "50% OFF UPTO ₹100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBi_eoZi-C0GagyArO1WDZNmO4IJfhAcvazu5Dh7yUEInRngX2ly-SDmu669F9NLT3vShBlVol7ELa-4RYzlMnbE9BaW30IjUKwcLJKEj5eX59Ku91x1HWXW8CgGbMMj7IJf3rjry3n9Lgi3HRPKaiFHkwxiz5fnrLLaH7q2lWY17MAcAyq6-0O41AXA5QJ-MzWDw48LhmTz5Ugg_dbP6RJa14DwGI9Pk3PRaIjguO-GxqQ8aMRxp49RdIqKjfEwmuwdBEUxQB-Uc" },
  { id: 2, name: "Pizza Authentica", rating: 4.2, ratingColor: "bg-green-700", time: "35-40 mins", cuisine: "Pizzas, Italian, Desserts", location: "Koramangala • 4.1 km", offer: "ITEMS AT ₹149", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2XwICoPUT-g2iRx-bOfk8NplWrpidGTa9azuPMCuEVhEPfr2EMVhtSbqKpIEuz88giVoA2nqFQb3YocP8GcQ0lkrPJPqTI8VweVQUx6r4oT3rKCAYLC3O0iKvq7VAotSI77uzTR7jUDFVZlu9q-hsktxGwNE5DFZyUY2u83u0yhREPoaq-jFno8qElojE-nmIIgavnXewtRDgXQHmxfFRwA7RI7HlUeL5fUrA5epLYcthPcioEMDQrFMlz-yDPJI9H9aXmNud6Qc" },
  { id: 3, name: "Spice Route Biryani", rating: 4.6, ratingColor: "bg-green-700", time: "20-25 mins", cuisine: "Biryani, Hyderabadi, North Indian", location: "Old Airport Road • 1.8 km", offer: "FREE DELIVERY", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6rIJQtRFzPw5uDpWV6CDVtMqvSGW3gRgQfCCWRXdt8x6V-sxIpKCH-aVy3wCfrH8ch9OAvoz30LBKS4KO_fE_sghT9apPyD0FfKolNsoKiQmynhAR_MtFoGku3ol5Je1lgwZXJzeYl1-pPlsuOekbCufoY8ZjJf8G-vCBXfDE5CjawKps2jxbmvBjQxOv16GtavRZb0FHsVAbbkl02AX4sHNRedvIMM40uqQLgKTXRgSjapXJF2kPA420QiYdJbKAaz1pGNJ_zog" },
  { id: 4, name: "Zen Sushi Bar", rating: 4.8, ratingColor: "bg-green-700", time: "45-50 mins", cuisine: "Japanese, Asian, Seafood", location: "Lavelle Road • 5.2 km", offer: "₹125 OFF ABOVE ₹499", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9TNbUtmrLZqxYqEXW8nkaMnyQF0WZHWMcnLsYIH_c9GfudWQlvvs-Pf8Fb07tRJMY6sCbO85xkK7IfBE7_pBksUwwxu8cVkniYhwig62M0KTZ5ualsVyec2z34ZxXTEzW4RQsJBxhrTm9gK2VvLdrJ_6Fg7f3Qjuu2LKah9S2JLgatFbJ9NkzVObrqgEdKkK0hLbYtfTBlIewRGulnNFvvwtdBKcVChtPkyGdDhupyZlxwJeOhlGfaAU0LT6bMf8UDvVAQYFf0DY" },
  { id: 5, name: "Burger Empire", rating: 4.1, ratingColor: "bg-green-700", time: "25-30 mins", cuisine: "Burgers, American, Fast Food", location: "Domlur • 1.2 km", offer: "BUY 1 GET 1 FREE", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtV6X4j9Wn6tDaDv8LAnhRxReVmQU29BuQjNLYQb_rYUZHtEuUB8OOQBZiQsKRXSxij1yoC4vugKyX3Q3Y5lXY7qTnwT9WvMhfikS5Vr5xAbKHuNXGhJ1llWPwPEI9Vjc2jOtOcA5UTvbyHX_KaBnoJFM2Wpn7ahuByj1PUgqGVN0NZk8LdbIvhvyjTyv6gCVPuiPLIwrkDCdgzLbFYD7CEY0FOGF7sIV05m4_EMnl9Rl47EtUUXz-IfA0CfXUhbS7lu0FLd0DPFs" },
  { id: 6, name: "Sweet Haven", rating: 4.7, ratingColor: "bg-green-700", time: "15-20 mins", cuisine: "Desserts, Bakery, Ice Cream", location: "Indiranagar • 0.9 km", offer: "30% OFF ON DESSERTS", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAskew8YHp6gotterTWFKYZSrxqpaMgymztf4Ee414qcK2DCOaJqYO6SEJPpAXdAC62Tub0GNyDmiBOYOPGfse23zzJCofG1hP1bgo0YbPcvJMCYvo5Yx2vyXav6orralb9mzkXWVGQtue8HSWmXYBmLuHXRS07quS5DV7rvG-PMlr9unGTdnEnG6Dq93gt3n5OfJRb8ra9GYhUbfOC9QtoiB3rc6_fm7wahNKv9Q-sWdKAhceEhShyHyp12ToZfLNUmxIjLmuzPIw" },
  { id: 7, name: "Crispy Fried Kitchen", rating: 3.9, ratingColor: "bg-orange-500", time: "30-35 mins", cuisine: "Fast Food, Fried Chicken", location: "HAL 2nd Stage • 3.5 km", offer: "₹60 OFF ON ORDERS", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChMr-gpKxV-8hvkZj50PM8Bvx7H4W3TaisdW9_aPX1gccNAcXgCNKjiLALklpHW3KFZOecqqQO8od7usEn4UEUsjb6qQtdA68mBVSA5X6wggdSsNb4s6dACZvqTMAJ-9Ht1rzwYyIzVp7vb4XE1blHj4P1mjeyCOJIKDJOzQsbGxkSNjb_sEZrEzTVWzY-8QVULBRGpzfZ21kvZ1MlQAzDvdoFyJPJPCycAYCSfrwiBZfpFv1FMEuCneGh1tac6ZSVUpt08zrEYCA" },
  { id: 8, name: "The Grill Master", rating: 4.4, ratingColor: "bg-green-700", time: "40-45 mins", cuisine: "Barbecue, Mughlai, Kebab", location: "Jeevan Bhima Nagar • 2.1 km", offer: "MEALS START AT ₹199", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBle-S31yAxwqN70ZPdnefjRXS8p8IJAWnlvgkhPUv8kHlSW9WB_fveu9lfILE0Gu8olYqKj0sBLDN3oGYVT7qrUe7oYt3EIOOd_3O_3Tshyl1O7VjraDQnV7ga8eflDPRLMjIkgLPrtmpLgka8NQov3ff9QCXvZSiVmOU6cMHoLmbQjyern8Kd0FXL6pog6839XeWyh4HWffQ5MYsULNEyCiDg5uCBxeSUEzbFoV6_zLi9q7t3ci2wVV9mt_Z50te6ajQtKDwBxUg" },
];

const filterOptions = ["10 Mins Delivery", "Veg", "Ratings 4.0+", "Delivery Time", "Cost For Two"];

export default function CatalogPage() {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (f) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  return (
    <div className="bg-[#f6f6f6] font-[Manrope,sans-serif] text-[#2d2f2f] antialiased min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0_24px_24px_-12px_rgba(0,0,0,0.06)]">
        <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-black text-orange-600 tracking-tighter font-[Plus_Jakarta_Sans,sans-serif]">Culinaria</span>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#f0f1f1] rounded-full cursor-pointer hover:bg-[#e7e8e8] transition-colors">
              <span className="material-symbols-outlined text-[#934600] text-[20px]">location_on</span>
              <span className="text-sm font-bold">Indiranagar, Bangalore</span>
              <span className="material-symbols-outlined text-[#5a5c5c]">expand_more</span>
            </div>
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
              <span className="text-zinc-500 font-medium hover:text-orange-500 transition-colors cursor-pointer">Offers</span>
              <span className="text-zinc-500 font-medium hover:text-orange-500 transition-colors cursor-pointer">Dineout</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/cart")} className="active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-[#2d2f2f] text-2xl">shopping_bag</span>
              </button>
              <button className="active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-[#2d2f2f] text-2xl">account_circle</span>
              </button>
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

        <h1 className="text-3xl font-extrabold font-[Plus_Jakarta_Sans,sans-serif] tracking-tight mb-8">265 Restaurants to explore</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {restaurants.map((r) => (
            <div key={r.id} className="group cursor-pointer" onClick={() => navigate("/preview")}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm">
                <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[#fa7e17] text-white px-3 py-1 rounded-lg text-xs font-black tracking-wider shadow-lg">{r.offer}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold font-[Plus_Jakarta_Sans,sans-serif] mb-1 group-hover:text-[#934600] transition-colors">{r.name}</h3>
              <div className="flex items-center gap-1 mb-1">
                <div className={`flex items-center gap-1 ${r.ratingColor} text-white px-1.5 py-0.5 rounded text-xs font-bold`}>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {r.rating}
                </div>
                <span className="text-sm font-bold ml-1">• {r.time}</span>
              </div>
              <p className="text-[#5a5c5c] text-sm line-clamp-1">{r.cuisine}</p>
              <p className="text-[#5a5c5c] text-sm mt-0.5">{r.location}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-[#e1e3e3] rounded-full font-bold hover:bg-[#d3d5d5] transition-all text-[#5a5c5c] hover:text-[#2d2f2f]">Show more restaurants</button>
        </div>
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

