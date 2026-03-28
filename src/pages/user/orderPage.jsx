import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import redLogo from "../../assets/images/red-logo.png";

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        if (!order) {
            navigate("/cartalog");
        }
    }, [order, navigate]);

    if (!order) return null;

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="bg-[#f6f6f6] min-h-screen font-[Manrope,sans-serif] text-[#2d2f2f] py-12 px-4 selection:bg-[#FF5200]/20">
            <div className="max-w-2xl mx-auto">
                {/* Print action - hidden during actual printing */}
                <div className="flex justify-between items-center mb-8 print:hidden">
                    <Link to="/cartalog" className="text-[#5a5c5c] font-bold hover:text-[#FF5200] transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Menu
                    </Link>
                    <button onClick={handleDownload} className="bg-[#FF5200] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#e64a00] transition-colors shadow-lg shadow-[#FF5200]/30">
                        <span className="material-symbols-outlined">download</span>
                        Download Receipt
                    </button>
                </div>

                {/* Receipt Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:border print:border-gray-200">
                    <div className="bg-[#2d2f2f] p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5200] via-yellow-500 to-[#FF5200]" />
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                            <span className="material-symbols-outlined text-white text-3xl font-bold">check</span>
                        </div>
                        <h1 className="font-[Plus_Jakarta_Sans,sans-serif] text-3xl font-extrabold text-white mb-2">Order Confirmed!</h1>
                        <p className="text-gray-400 font-medium">Your delicious food is being prepared.</p>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between border-b border-gray-100 pb-6 mb-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
                                <p className="font-bold text-lg">{order.orderId}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Date & Time</p>
                                <p className="font-bold text-sm text-gray-700">{order.date}</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Customer Details</p>
                            <p className="font-bold">{order.customer.name}</p>
                            <p className="text-gray-500 text-sm">{order.customer.email}</p>
                            <p className="text-gray-500 text-sm mt-1">Delivery: Flat 402, Elegance Residency, Indiranagar</p>
                        </div>

                        <div className="mb-8 relative">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Order Summary</h3>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            <span className="font-bold text-[#FF5200]">{item.qty}x</span>
                                            <div>
                                                <p className="font-bold text-gray-800">{item.name}</p>
                                                {item.veg !== undefined && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.veg ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                                                        {item.veg ? 'VEG' : 'NON-VEG'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span className="font-bold text-gray-800">₦{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed border-gray-200 pt-6 space-y-3">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span><span>₦{order.itemTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Delivery Fee</span><span>₦{order.deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Platform Fee</span><span>₦{order.platformFee}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Taxes & Charges</span><span>₦{order.gst}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mt-6 flex justify-between items-center border border-gray-100">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Paid</p>
                                <p className="text-[#2d2f2f] text-sm font-medium">Paid via Card</p>
                            </div>
                            <span className="font-[Plus_Jakarta_Sans,sans-serif] text-3xl font-black text-[#FF5200]">₦{order.grandTotal}</span>
                        </div>
                    </div>
                    
                    {/* Print footer branding */}
                    <div className="bg-[#2d2f2f] py-4 flex justify-center hidden print:flex">
                         <img src={redLogo} className="h-8 object-contain opacity-80" alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;