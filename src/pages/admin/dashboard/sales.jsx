import { Link } from "react-router-dom";

const Sales = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
                <div className="relative bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-emerald-50 rounded-full opacity-50 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -m-8 w-32 h-32 bg-teal-50 rounded-full opacity-50 blur-2xl"></div>
                    
                    <div className="relative z-10 space-y-6">
                        <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sales Reporting</h1>
                        <p className="text-gray-500 leading-relaxed font-medium">
                            Comprehensive sales reports and revenue insights are currently under development.
                        </p>
                        <div className="flex justify-center pt-4">
                            <div className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg shadow-emerald-100 hover:scale-105 transition-transform cursor-default">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
                                </span>
                                <span>Coming Soon</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <Link to="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-emerald-600 transition-colors font-semibold text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sales;