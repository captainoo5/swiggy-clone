import { Link } from "react-router-dom";

const AdminAnalytics = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-10 rounded-full scale-150"></div>
                    <div className="relative bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
                        <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Analytics Dashboard</h1>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            We're currently building a powerful analytics engine to help you track growth and user Behavior. Stay tuned!
                        </p>
                        <div className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-indigo-100 hover:scale-105 transition-transform">
                            Coming Soon
                        </div>
                    </div>
                </div>
                <Link to="/admin/dashboard" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors font-medium text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default AdminAnalytics;