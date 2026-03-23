import { useState } from "react";

const foodItems = [
  {
    name: "Paneer Butter Masala",
    restaurant: "Punjabi Dhaba Express",
    location: "South Delhi, Zone A",
    price: "₹249.00",
    type: "Veg",
    typeColor: "text-orange-600",
    status: "ACTIVE",
    statusStyle: "bg-green-100 text-green-700",
    dotColor: "bg-green-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxNTJVsalgE-OHqgIXEJhOIYaV18ESSNGpBe6AQt_Rv32vib8u8TXJy99lcqf2DdSMRh2OGbY_u1bFf5nZCrbosM4QiJUR_hk0xzlsFEsqDuuW_yXSGBZzhFBjivtnfXYL3sFLRvmK6HMyc3BZND6usFHjdAOPWb-pPfJlpCOTz9FppSBGA2fYCa1p6PXXVjBd3D48CNQY354sVQdXzp1bYqX0AmxlMIWJFTAIRqAYANP5DHXyWFkg_lcSvKJQgmjfaUlBiDyQv1A",
  },
  {
    name: "Chicken Hakka Noodles",
    restaurant: "The Wok Republic",
    location: "Indiranagar, Zone B2",
    price: "₹320.00",
    type: "Non-Veg",
    typeColor: "text-red-600",
    status: "ACTIVE",
    statusStyle: "bg-green-100 text-green-700",
    dotColor: "bg-green-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdPXi1b5Tetq9aK_J1pg86VYmSaA-KpQ12_6yoxIsWTdAgiZ6hww2AkcACHivx65RsLxzVDvoXy7Uao_BwtBFJKb0QIuarDIAzFYe6sniwOHBz6bOGVlD4FRcpAhuiT3Jhb3JY1S4IZW6sw0wj31IkkCBlTIYTyfQkccHvgjqSBEz8UWfV2qZgfPE8Ed7kcUmY5oC-RGpjKkTxJCTKaLUnbYJCooWD83rTBtF_EDvZKMcSircduLjT5rwcGUzi1ts87N9ywSSWSJs",
  },
  {
    name: 'Classic Margherita 12"',
    restaurant: "Little Italy Authentic",
    location: "Bandra West, Zone 5",
    price: "₹549.00",
    type: "Veg",
    typeColor: "text-orange-600",
    status: "INACTIVE",
    statusStyle: "bg-slate-100 text-slate-500",
    dotColor: "bg-slate-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDl-KyeDaTIsyHA46JmNMqulQL8jTqLf5BnNoFDctx2padhK5vOQuynzLgy7MLpsJZqyBpwl_aqHITSFmsGr3x1nXO3Awts7BoMxSy0TMNmfl0B4Z42tlJdK-v232y0CLi2qFDjmoe9BsCTbXwlrMvJbbxZ96zZkDa6in_yNNHFBfDqvRuO2qAESNCpxDgtMWd9QfbtWbKq41FKKpEOgWL-9wPNaOkDn5eDPHVpl3yNwj3vAzYOh_5MuLuFHbC-ZOM8JdM9oHgz-I",
  },
  {
    name: "Murgh Makhani (Full)",
    restaurant: "Moti Mahal Delux",
    location: "Cyber Hub, Zone G",
    price: "₹680.00",
    type: "Non-Veg",
    typeColor: "text-red-600",
    status: "ACTIVE",
    statusStyle: "bg-green-100 text-green-700",
    dotColor: "bg-green-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB47P10VqbBgcMZ1gTkGJnE2RnA-1dVVHoirUQ291eNnyMdljFPLYgmTa9EIZhJIF5mMAwoLjOne80pb8Lr4tK0v3YLmJUmwJgp2E5pWq4bU5lBkFu-xMaSeTXMnGvQvTn5uIT_QbUvu9FZ4v1ZbpUOsu0_b8qJTJMrxf37cpDVHALYGA78wprYbl27Ps8Fnno_Poov2RdVbhN_3ibCN6z0WYERPa4EqlFJ6vFGCNC47bWFGKWnNvFxl3YR_VrbXu4Zj5nwTpz0a_Y",
  },
  {
    name: "Vegetable Dimsums (8pcs)",
    restaurant: "Mainland China",
    location: "Powai, Zone P1",
    price: "₹385.00",
    type: "Veg",
    typeColor: "text-orange-600",
    status: "ACTIVE",
    statusStyle: "bg-green-100 text-green-700",
    dotColor: "bg-green-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzoQNwR1zsb0FK7XHgjJCr_tTDe3ZJepN-jbWMJNC1M2alSBsuJYpIn31a9QP656wnNwEB4UXoSbbyXOptSZX0XfQS6ixt57mFUzIUcOnNhs1C2cXT5hnNClkGpOHrom_AVh1H6rf_zC-0njfZPMMaFkFg9mm_7SlEPBWtFWz1-MZksOiOJ8LgwUOeXf25tSPfhuKUbZEQlCOlU_m4-03Q4YEfLEQhdARYBuHH6ucd_nSvLUjf5DPiJlKgQj58oY_7-6Qphuocuws",
  },
  {
    name: "Fettuccine Alfredo",
    restaurant: "Pasta Fresca",
    location: "Hitech City, Zone H4",
    price: "₹410.00",
    type: "Veg",
    typeColor: "text-orange-600",
    status: "ACTIVE",
    statusStyle: "bg-green-100 text-green-700",
    dotColor: "bg-green-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpLkqm5yxK4s0_f_HIOCAkq1TbvIz6dIRg5CB3SdMXGvaxPHiT8eFXN3GN9MCe26BYlAAuF30IvQK1dfqf-3Uyt6JkdCYMymj80BMblmtVI3uR3mSxZG5eNvEX7sI0JKgYMDgTQTUXSmxKkGOerBoVMHp87fA1cV9xbjPV90BPVsaTYuVjpeDqwwtki0wgg6_kuewcbG-9M5GDfJ9uG-So0n0KorsbmEetZU8p6brfKMdVtbb2NttNNrSF6De-O6lkiNITpacaq9Q",
  },
];

const AdminFoodManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 min-h-screen">
      {/* Hero / Header Section */}
      <section className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Food Management</h1>
          <p className="text-gray-500 max-w-lg text-sm">Manage your global inventory, pricing models, and merchant visibility across all delivery zones.</p>
        </div>
        <button id="addNewFood" onClick={() => setShowModal(true)} className="bg-[#FF5200] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#FF5200]/20 hover:scale-105 active:scale-95 transition-all shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Add New Food
        </button>
      </section>

      {/* Filters Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Filters</p>
            <div className="flex gap-2 flex-wrap">
              {["All Items", "Trending", "Low Stock"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    activeFilter === filter
                      ? "bg-orange-100 text-[#FF5200]"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF5200] shrink-0 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status</p>
          <select className="w-full bg-gray-100 border-none rounded-lg py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all text-gray-700">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Category</p>
          <select className="w-full bg-gray-100 border-none rounded-lg py-2.5 px-3 text-sm font-medium focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all text-gray-700">
            <option>All Cuisines</option>
            <option>North Indian</option>
            <option>Chinese</option>
            <option>Italian</option>
            <option>Continental</option>
          </select>
        </div>
      </section>

      {/* Food Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <div key={item.name} className="group bg-white rounded-2xl p-4 flex gap-4 md:gap-5 hover:scale-[1.02] transition-all cursor-pointer shadow-sm">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 relative">
              <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
              <div className={`absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-black uppercase ${item.typeColor}`}>
                {item.type}
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-base md:text-lg leading-tight truncate">{item.name}</h3>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.statusStyle}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">{item.restaurant}</p>
                <div className="flex items-center gap-2 mt-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-[11px] font-medium">{item.location}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-black text-gray-900">{item.price}</span>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg bg-gray-100 text-slate-500 hover:bg-orange-50 hover:text-[#FF5200] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-lg bg-gray-100 text-slate-500 hover:bg-orange-50 hover:text-[#FF5200] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination / Footer Stats */}
      <footer className="mt-12 flex flex-col md:flex-row justify-between items-center bg-gray-100 rounded-2xl p-6 gap-4">
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Items</p>
            <p className="text-xl font-black text-gray-900">1,248</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Now</p>
            <p className="text-xl font-black text-green-600">1,102</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Out of Stock</p>
            <p className="text-xl font-black text-red-500">46</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-[#FF5200] transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="flex gap-1">
            <button className="w-10 h-10 rounded-xl bg-[#FF5200] text-white font-bold text-sm shadow-md shadow-[#FF5200]/30">1</button>
            <button className="w-10 h-10 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-orange-50 transition-colors">2</button>
            <button className="w-10 h-10 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-orange-50 transition-colors">3</button>
            <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
            <button className="w-10 h-10 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-orange-50 transition-colors">12</button>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-[#FF5200] transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </footer>

      {/* Add New Food Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Add New Food</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new food item</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Food Image</label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-[#FF5200]/40 transition-colors cursor-pointer relative"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById("foodImageInput").click()}
                >
                  <input id="foodImageInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-gray-500 hover:text-red-500 transition-colors shadow-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#FF5200]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">Drop your image here, or <span className="text-[#FF5200]">browse</span></p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Restaurant */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Food Name</label>
                  <input type="text" placeholder="e.g. Paneer Butter Masala" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Restaurant</label>
                  <input type="text" placeholder="e.g. Punjabi Dhaba Express" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                  <input type="number" placeholder="249.00" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location / Zone</label>
                  <input type="text" placeholder="e.g. South Delhi, Zone A" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
              </div>

              {/* Category & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                  <select className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm">
                    <option value="">Select cuisine</option>
                    <option>North Indian</option>
                    <option>South Indian</option>
                    <option>Chinese</option>
                    <option>Italian</option>
                    <option>Continental</option>
                    <option>Desserts</option>
                    <option>Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Food Type</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="foodType" value="Veg" defaultChecked className="w-4 h-4 accent-green-600" />
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        </span>
                        <span className="text-sm font-semibold text-gray-700">Veg</span>
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="foodType" value="Non-Veg" className="w-4 h-4 accent-red-600" />
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center">
                          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        </span>
                        <span className="text-sm font-semibold text-gray-700">Non-Veg</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                <textarea rows="3" placeholder="Brief description of the food item..." className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm resize-none"></textarea>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">Active Status</p>
                  <p className="text-xs text-gray-400">Make this item visible to customers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5200]"></div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#FF5200] text-white font-bold rounded-xl shadow-lg shadow-[#FF5200]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
                  Add Food Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFoodManagement;