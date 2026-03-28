import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import northIndianIcon from '../assets/images/categories/north_indian.png';
import biryaniIcon from '../assets/images/categories/biryani.png';
import chineseIcon from '../assets/images/categories/chinese.png';
import burgerIcon from '../assets/images/categories/burger.png';
import pizzaIcon from '../assets/images/categories/pizza.png';
import dessertIcon from '../assets/images/categories/dessert.png';
import veggiesIcon from '../assets/images/categories/vegetables.png';
import fruitsIcon from '../assets/images/categories/fruits.png';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRefFood = useRef(null);
  const scrollRefInstamart = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/get-all-products?limit=100`);
        if (response.data.success) {
          setProducts(response.data.data);
          // Derived categories from products
          const uniqueCategories = [...new Set(response.data.data.map(p => p.category))];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  // Static images for standard food categories (placeholders for now)
  const categoryImages = {
    'North Indian': northIndianIcon,
    'Chinese': chineseIcon,
    'South Indian': northIndianIcon, // Fallback
    'Desserts': dessertIcon,
    'default': northIndianIcon
  };
  // Standard Categories for the top carousel
  const topFoodCategories = [
    { name: 'North Indian', img: northIndianIcon },
    { name: 'Biryani', img: biryaniIcon },
    { name: 'Chinese', img: chineseIcon },
    { name: 'Burgers', img: burgerIcon },
    { name: 'Pizza', img: pizzaIcon },
    { name: 'Desserts', img: dessertIcon },
    { name: 'Noodles', img: chineseIcon },
    { name: 'Pasta', img: chineseIcon },
    { name: 'Salad', img: veggiesIcon },
    { name: 'Shawarma', img: northIndianIcon },
  ];
  const instamartCategories = [
    { name: 'Fresh Vegetables', img: veggiesIcon },
    { name: 'Fresh Fruits', img: fruitsIcon },
    { name: 'Dairy & Eggs', img: veggiesIcon },
    { name: 'Snacks', img: fruitsIcon },
    { name: 'Beverages', img: fruitsIcon },
    { name: 'Atta & Dals', img: veggiesIcon },
    { name: 'Cleaning', img: veggiesIcon },
  ];
  if (loading) {
    return (
      <div className="flex items-center justify-center min-vh-100 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5200]"></div>
      </div>
    );
  }
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 overflow-x-hidden">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      {/* Food Categories Carousel */}
      <section className="mb-12 relative group">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-[#02060C]">What's on your mind?</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollLeft(scrollRefFood)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={() => scrollRight(scrollRefFood)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRefFood}
          className="flex overflow-x-auto gap-8 no-scrollbar scroll-smooth pb-4"
        >
          {topFoodCategories.map((cat, index) => (
            <div key={index} className="flex-shrink-0 cursor-pointer text-center group">
              <div className="w-32 h-32 md:w-36 md:h-36 overflow-hidden rounded-full mb-2">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
      <hr className="border-gray-100 mb-12" />
      {/* Instamart Categories Carousel */}
      <section className="mb-12 relative group">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold text-[#02060C]">Shop groceries on Instamart</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollLeft(scrollRefInstamart)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={() => scrollRight(scrollRefInstamart)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRefInstamart}
          className="flex overflow-x-auto gap-6 no-scrollbar scroll-smooth pb-4"
        >
          {instamartCategories.map((cat, index) => (
            <div key={index} className="flex-shrink-0 cursor-pointer w-40 md:w-44 bg-gray-50 rounded-2xl p-4 transition-all hover:bg-white hover:shadow-lg">
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-xl">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm font-bold text-gray-800 line-clamp-2">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>
      <hr className="border-gray-100 mb-12" />
      {/* Main Product Grid */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#02060C] mb-8">Restaurants with online food delivery</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-black text-lg drop-shadow-lg">
                  <span className="bg-black/20 px-2 py-1 rounded backdrop-blur-sm uppercase">6.6k+ Users</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#02060C] truncate mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-green-700 text-white rounded-full p-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-gray-700">4.2 • 30-35 mins</span>
                </div>
                <p className="text-sm text-gray-500 truncate mb-1">{product.category} • {product.restaurant}</p>
                <p className="text-sm text-gray-500 truncate">{product.location}</p>
                <p className="mt-2 text-[#FF5200] font-bold">₦{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* CSS for hiding scrollbars */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
export default ProductPage;