import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalSales: 0,
    recentTransactions: [],
    salesBreakdown: [
      { name: "Cloud Kitchens", pct: "42%", w: "w-[42%]", color: "bg-[#FF5200]", textColor: "text-[#FF5200]" },
      { name: "Premium Dining", pct: "35%", w: "w-[35%]", color: "bg-purple-500", textColor: "text-purple-500" },
      { name: "Instamart Hubs", pct: "23%", w: "w-[23%]", color: "bg-blue-500", textColor: "text-blue-500" },
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-stats`, {
          headers: { "Authorization": token }
        });
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5200]"></div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 space-y-8 md:space-y-12">
      {/* Page Title */}
      <h2 className="text-xl md:text-2xl font-bold text-[#FF5200]">User Directory</h2>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Big card */}
        <div className="sm:col-span-2 bg-[#FF5200] rounded-xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-[#FF5200]/10 min-h-[140px]">
          <div className="relative z-10">
            <p className="text-sm font-bold opacity-80 uppercase tracking-tight">Total Active Users</p>
            <h3 className="text-4xl font-extrabold mt-2 tracking-tight">{stats.totalUsers.toLocaleString()}</h3>
            <p className="text-xs mt-4 flex items-center gap-1 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              Updated from database
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-32 h-32">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
        </div>
        {/* Stat card 2 */}
        <div className="bg-white rounded-xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-sm min-h-[140px]">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</h3>
          </div>
        </div>
        {/* Stat card 3 */}
        <div className="bg-white rounded-xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-sm min-h-[140px]">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Total Lifetime Sales</p>
            <h3 className="text-2xl font-bold text-gray-900">₦{stats.totalSales.toLocaleString()}</h3>
          </div>
        </div>
      </section>

      {/* Main Data */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* User Table */}
        <section className="xl:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              <span className="w-2 h-8 bg-[#FF5200] rounded-full"></span>
              Recent Activity
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-300 transition-colors">Export CSV</button>
              <button className="px-4 py-2 bg-[#FF5200] text-white text-xs font-bold rounded-lg shadow-md shadow-[#FF5200]/20">Filter</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Mobile card view */}
            <div className="md:hidden divide-y divide-gray-100">
              {stats.recentTransactions.map((order) => (
                <div key={order._id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5200] font-bold text-xs">{order.user?.name?.split(" ").map(n => n[0]).join("") || "U"}</div>
                      <div>
                        <p className="text-sm font-bold">{order.user?.name || "Unknown User"}</p>
                        <p className="text-xs text-gray-400">ID: #{order._id.slice(-5).toUpperCase()}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" : 
                      order.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
                    }`}>{order.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">₦{order.amountDetails.grandTotal}</span>
                    <span className="text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#FF5200] ${order.status === "Delivered" ? "w-full" : "w-1/2"}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <table className="w-full text-left border-collapse hidden md:table">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase text-gray-500 tracking-widest">User Profile</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase text-gray-500 tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase text-gray-500 tracking-widest">Order Amount</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase text-gray-500 tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase text-gray-500 tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentTransactions.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5200] font-bold text-xs`}>{order.user?.name?.split(" ").map(n => n[0]).join("") || "U"}</div>
                        <div>
                          <p className="text-sm font-bold">{order.user?.name || "Unknown User"}</p>
                          <p className="text-xs text-gray-400">ID: #{order._id.slice(-5).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-extrabold uppercase ${
                        order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" : 
                        order.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
                      }`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-900 text-nowrap">
                       ₦{order.amountDetails.grandTotal.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Showing {stats.recentTransactions.length} of {stats.totalOrders} items</p>
              <div className="flex gap-2">
                <button className="p-1.5 rounded bg-white text-gray-400 hover:text-gray-900 transition-colors border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button className="p-1.5 rounded bg-white text-gray-400 hover:text-gray-900 transition-colors border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Sidebar */}
        <aside className="space-y-6 md:space-y-8">
          <div>
            <h3 className="text-xl font-extrabold flex items-center gap-2 mb-6">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              Sales Breakdown
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-gray-400 mb-4 tracking-widest">By Restaurant Entity</h4>
                <div className="space-y-4">
                  {stats.salesBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-sm font-bold">{item.name}</span>
                          <span className={`text-xs font-bold ${item.textColor}`}>{item.pct}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`${item.w} h-full ${item.color}`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <h4 className="text-xs font-extrabold uppercase text-gray-400 mb-4 tracking-widest">Top Performing Regions</h4>
                <div className="space-y-3">
                  {["Indiranagar", "Koramangala", "Whitefield"].map((region, i) => (
                    <div key={region} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400">0{i + 1}</span>
                        <span className="text-sm font-bold">{region}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#FF5200] opacity-0 group-hover:opacity-100 transition-opacity">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl text-[10px] font-extrabold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">
                Full Analytics Dashboard
              </button>
            </div>
          </div>

          {/* Promo Card */}
          <div className="rounded-2xl p-6 bg-gray-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2">New Insights Available</h4>
              <p className="text-xs opacity-70 mb-4 leading-relaxed">Predictive customer churn analysis is now live for all Tier-1 cities.</p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-[#FF5200] flex items-center gap-2">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </button>
            </div>
            <div className="absolute -right-2 -top-2 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-24 h-24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminDashboard;