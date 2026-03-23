import { Link } from "react-router-dom";
import leftImage from "../assets/images/left.avif";
import rightImage from "../assets/images/right.avif";
import foodImg from "../assets/images/food.png";
import instamartImg from "../assets/images/instamart.png";
import dineoutImg from "../assets/images/Dineout.png";

const HomePage = () => {
  return (
    <div className="bg-[#FF5200] relative overflow-hidden min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative flex flex-col items-center pt-10 md:pt-16 pb-6 px-4">
        {/* Left floating image */}
        <img
          src={leftImage}
          alt=""
          className="hidden md:block absolute top-0 left-0 w-44 lg:w-56 pointer-events-none select-none"
        />
        {/* Right floating image */}
        <img
          src={rightImage}
          alt=""
          className="hidden md:block absolute top-0 right-0 w-44 lg:w-56 pointer-events-none select-none"
        />

        {/* Heading */}
        <h1 className="text-white text-2xl md:text-4xl font-extrabold text-center leading-snug max-w-xl z-10">
          Order food &amp; groceries. Discover best restaurants. Swiggy it!
        </h1>

        {/* Search bar area */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 z-10 w-full max-w-lg">
          {/* Location selector */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 w-full sm:w-auto cursor-pointer shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FF5200"
              className="w-5 h-5 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 text-sm truncate">
              4th B Cross Rd, KHB Blo...
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-500 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          {/* Search input */}
          <div className="flex items-center bg-white rounded-xl px-4 py-2.5 flex-1 w-full shadow">
            <input
              type="text"
              placeholder="Search for restaurant, item or more"
              className="outline-none text-sm text-gray-700 w-full bg-transparent placeholder:text-gray-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 shrink-0 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Category Cards ── */}
      <section className="relative z-10 px-4 md:px-16 lg:px-28 pb-12 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Link
            to="/foodDelivery"
            className="col-span-2 md:col-span-1 bg-white rounded-3xl p-6 shadow-xl relative overflow-hidden min-h-[220px] group hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
              FOOD DELIVERY
            </h2>
            <p className="text-gray-500 font-medium text-sm mt-0.5">
              FROM RESTAURANTS
            </p>
            <span className="inline-block mt-4 bg-[#FF5200] text-white text-xs font-bold px-3 py-1 rounded">
              UPTO 60% OFF
            </span>
            <div className="mt-6 w-10 h-10 rounded-full border-2 border-[#FF5200] flex items-center justify-center group-hover:bg-[#FF5200] group-hover:text-white transition-colors text-[#FF5200]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            <img
              src={foodImg}
              alt="Food Delivery"
              className="absolute bottom-0 right-0 w-32 md:w-40 object-contain pointer-events-none"
            />
          </Link>
          <Link
            to="/instamart"
            className="col-span-1 bg-white rounded-3xl p-6 shadow-xl relative overflow-hidden min-h-[220px] group hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
              INSTAMART
            </h2>
            <p className="text-gray-500 font-medium text-sm mt-0.5">
              INSTANT GROCERY
            </p>
            <span className="inline-block mt-4 bg-[#FF5200] text-white text-xs font-bold px-3 py-1 rounded">
              UPTO 60% OFF
            </span>
            <div className="mt-6 w-10 h-10 rounded-full border-2 border-[#FF5200] flex items-center justify-center group-hover:bg-[#FF5200] group-hover:text-white transition-colors text-[#FF5200]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            <img
              src={instamartImg}
              alt="Instamart"
              className="absolute bottom-0 right-0 w-28 md:w-36 object-contain pointer-events-none"
            />
          </Link>
          <Link
            to="/dineout"
            className="col-span-1 bg-white rounded-3xl p-6 shadow-xl relative overflow-hidden min-h-[220px] group hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
              DINEOUT
            </h2>
            <p className="text-gray-500 font-medium text-sm mt-0.5">
              EAT OUT &amp; SAVE MORE
            </p>
            <span className="inline-block mt-4 bg-[#FF5200] text-white text-xs font-bold px-3 py-1 rounded">
              UPTO 50% OFF
            </span>
            <div className="mt-6 w-10 h-10 rounded-full border-2 border-[#FF5200] flex items-center justify-center group-hover:bg-[#FF5200] group-hover:text-white transition-colors text-[#FF5200]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            <img
              src={dineoutImg}
              alt="Dineout"
              className="absolute bottom-0 right-0 w-28 md:w-36 object-contain pointer-events-none"
            />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;