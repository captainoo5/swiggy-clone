import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminFoodManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [formData, setFormData] = useState({
    name: "", restaurant: "", price: "", location: "", category: "", foodtype: "Veg", description: "", status: "Active"
  });
  const [foodItems, setFoodItems] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/get-all-products`, {
        headers: { "Authorization": token }
      });
      if (response.data.success) {
        setFoodItems(response.data.data);
      }
    } catch (error) {
      console.error(error);
      showToast("Failed to load products", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!imageFile || !formData.name || !formData.price || !formData.description) {
        setErrorMsg("Please fill all required fields and upload an image.");
        return;
    }
    setLoading(true); setErrorMsg("");
    try {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
            try {
                const base64Image = reader.result;
                const payload = { ...formData, image: base64Image };
                const token = localStorage.getItem("token") || "";
                
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/add-product`, payload, {
                    headers: { "Authorization": token }
                });
                if (response.data.success) {
                    setShowModal(false);
                    setFormData({name: "", restaurant: "", price: "", location: "", category: "", foodtype: "Veg", description: "", status: "Active"});
                    setImageFile(null); 
                    setImagePreview(null);
                    setLoading(false);
                    showToast("Food added successfully!", "success");
                    fetchProducts();
                }
            } catch (err) {
                const msg = err.response?.data?.message || "Failed to add food";
                setErrorMsg(msg);
                setLoading(false);
                showToast(msg, "error");
            }
        };
    } catch (error) {
        setErrorMsg("Failed to add food");  
        setLoading(false);
        showToast("Failed to add food", "error");
    }
  };
  const handleEditClick = (item) => {
    setEditFormData({ ...item });
    setEditImagePreview(item.image);
    setEditImageFile(null);
    setShowEditModal(true);
    setErrorMsg("");
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF5200',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'w-80 md:w-96 rounded-2xl p-4',
        title: 'text-lg font-bold',
        htmlContainer: 'text-sm text-gray-500',
        confirmButton: 'text-sm px-4 py-2 rounded-xl',
        cancelButton: 'text-sm px-4 py-2 rounded-xl'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token") || "";
          const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/delete-product/${id}`, {
            headers: { "Authorization": token }
          });
          if (response.data.success) {
            Swal.fire('Deleted!', 'The food item has been deleted.', 'success');
            fetchProducts();
          }
        } catch (error) {
          showToast(error.response?.data?.message || "Failed to delete food", "error");
        }
      }
    });
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.price || !editFormData.description) {
        setErrorMsg("Please fill all required fields.");
        return;
    }
    setLoading(true); setErrorMsg("");
    
    const payload = { ...editFormData };
    const submitUpdate = async (finalPayload) => {
         try {
            const token = localStorage.getItem("token") || "";
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/update-product/${editFormData._id}`, finalPayload, {
                headers: { "Authorization": token }
            });
            if (response.data.success) {
                setShowEditModal(false);
                setLoading(false);
                showToast("Food updated successfully!", "success");
                fetchProducts();
            }
         } catch(err) {
            setErrorMsg(err.response?.data?.message || "Failed to update food");
            setLoading(false);
         }
    };

    if (editImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(editImageFile);
        reader.onloadend = () => {
            submitUpdate({ ...payload, image: reader.result });
        };
    } else {
        submitUpdate(payload);
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
          <div key={item._id} className="group bg-white rounded-2xl p-4 flex gap-4 md:gap-5 hover:scale-[1.02] transition-all cursor-pointer shadow-sm">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 relative">
              <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
              <div className={`absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-black uppercase ${item.foodtype === 'Veg' ? 'text-green-600' : 'text-red-600'}`}>
                {item.foodtype}
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-base md:text-lg leading-tight truncate">{item.name}</h3>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-600' : 'bg-slate-400'}`}></span>
                    {item.status || "Active"}
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
                <span className="text-lg font-black text-gray-900">₦{item.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(item)} className="p-1.5 rounded-lg bg-gray-100 text-slate-500 hover:bg-orange-50 hover:text-[#FF5200] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button onClick={() => handleDeleteClick(item._id)} className="p-1.5 rounded-lg bg-gray-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

      {/* Toast Notification */}
      {toast.show && (
          <div style={{ borderColor: toast.type === "success" ? "#22c55e" : "#ef4444", zIndex: 9999 }} className="fixed bottom-10 right-10 px-6 py-5 rounded-xl shadow-2xl bg-white flex items-center gap-4 transform transition-all border-l-4" >
              {toast.type === "success" ? (
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
              ) : (
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
              )}
              <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: toast.type === "success" ? "#22c55e" : "#ef4444" }}>
                      {toast.type === "success" ? "Success" : "Error"}
                  </p>
                  <p className="font-bold text-sm text-gray-800">{toast.message}</p>
              </div>
          </div>
      )}

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
            {errorMsg && <div className="px-6 pt-4 text-red-500 text-sm font-bold">{errorMsg}</div>}
            <form className="p-6 space-y-6" onSubmit={handleAddFood}>
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
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Paneer Butter Masala" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Restaurant</label>
                  <input type="text" value={formData.restaurant} onChange={(e) => setFormData({...formData, restaurant: e.target.value})} placeholder="e.g. Punjabi Dhaba Express" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="249.00" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location / Zone</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g. South Delhi, Zone A" className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
              </div>

              {/* Category & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm">
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
                      <input type="radio" name="foodType" value="Veg" checked={formData.foodtype === "Veg"} onChange={(e) => setFormData({...formData, foodtype: e.target.value})} className="w-4 h-4 accent-green-600" />
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
                          {formData.foodtype === "Veg" && <span className="w-2 h-2 bg-green-600 rounded-full"></span>}
                        </span>
                        <span className="text-sm font-semibold text-gray-700">Veg</span>
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="foodType" value="Non-Veg" checked={formData.foodtype === "Non-Veg"} onChange={(e) => setFormData({...formData, foodtype: e.target.value})} className="w-4 h-4 accent-red-600" />
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center">
                          {formData.foodtype === "Non-Veg" && <span className="w-2 h-2 bg-red-600 rounded-full"></span>}
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
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Brief description of the food item..." className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm resize-none"></textarea>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">Active Status</p>
                  <p className="text-xs text-gray-400">Make this item visible to customers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.status === "Active"} onChange={(e) => setFormData({...formData, status: e.target.checked ? "Active" : "Inactive"})} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5200]"></div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#FF5200] text-white font-bold rounded-xl shadow-lg shadow-[#FF5200]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm disabled:opacity-70">
                  {loading ? "Adding Food..." : "Add Food Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Food Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">Edit Food Item</h2>
                <p className="text-sm text-gray-500 mt-1">Update details for this food item</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {errorMsg && <div className="px-6 pt-4 text-red-500 text-sm font-bold">{errorMsg}</div>}
            <form className="p-6 space-y-6" onSubmit={handleUpdateFood}>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Food Image</label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-[#FF5200]/40 transition-colors cursor-pointer relative"
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/")) {
                      setEditImageFile(file);
                      setEditImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById("editFoodImageInput").click()}
                >
                  <input id="editFoodImageInput" type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setEditImageFile(file);
                      setEditImagePreview(URL.createObjectURL(file));
                    }
                  }} />
                  {editImagePreview ? (
                    <div className="relative">
                      <img src={editImagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                      <button type="button" onClick={(e) => { e.stopPropagation(); setEditImagePreview(null); setEditImageFile(null); }} className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-gray-500 hover:text-red-500 transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#FF5200]"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" /></svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">Drop your image here, or <span className="text-[#FF5200]">browse</span></p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Food Name</label>
                  <input type="text" value={editFormData.name || ""} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Restaurant</label>
                  <input type="text" value={editFormData.restaurant || ""} onChange={(e) => setEditFormData({...editFormData, restaurant: e.target.value})} className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₦)</label>
                  <input type="number" value={editFormData.price || ""} onChange={(e) => setEditFormData({...editFormData, price: e.target.value})} className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Location / Zone</label>
                  <input type="text" value={editFormData.location || ""} onChange={(e) => setEditFormData({...editFormData, location: e.target.value})} className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                  <select value={editFormData.category || ""} onChange={(e) => setEditFormData({...editFormData, category: e.target.value})} className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm">
                    <option value="">Select cuisine</option>
                    <option>North Indian</option><option>South Indian</option><option>Chinese</option><option>Italian</option><option>Continental</option><option>Desserts</option><option>Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Food Type</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="Veg" checked={editFormData.foodtype === "Veg"} onChange={(e) => setEditFormData({...editFormData, foodtype: e.target.value})} className="w-4 h-4 accent-green-600" />
                      <span className="flex items-center gap-1.5"><span className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">{editFormData.foodtype === "Veg" && <span className="w-2 h-2 bg-green-600 rounded-full"></span>}</span><span className="text-sm font-semibold text-gray-700">Veg</span></span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="Non-Veg" checked={editFormData.foodtype === "Non-Veg"} onChange={(e) => setEditFormData({...editFormData, foodtype: e.target.value})} className="w-4 h-4 accent-red-600" />
                      <span className="flex items-center gap-1.5"><span className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center">{editFormData.foodtype === "Non-Veg" && <span className="w-2 h-2 bg-red-600 rounded-full"></span>}</span><span className="text-sm font-semibold text-gray-700">Non-Veg</span></span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                <textarea rows="3" value={editFormData.description || ""} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} className="w-full bg-gray-100 border-none rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#FF5200]/20 focus:outline-none transition-all font-medium text-sm resize-none"></textarea>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">Active Status</p>
                  <p className="text-xs text-gray-400">Make this item visible to customers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={editFormData.status === "Active"} onChange={(e) => setEditFormData({...editFormData, status: e.target.checked ? "Active" : "Inactive"})} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5200]"></div>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#FF5200] text-white font-bold rounded-xl shadow-lg shadow-[#FF5200]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm disabled:opacity-70">{loading ? "Updating Food..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

export default AdminFoodManagement;