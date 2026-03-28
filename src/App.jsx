import{
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PartnersPage from './pages/Partners';
import LoginPage from './pages/auth/loginPage';
import Signup from './pages/auth/signup';
import AdminLoginPage from './pages/auth/adminLoginPage';
import AdminLayout from './pages/admin/dashboard/AdminLayout';
import AdminDashboard from './pages/admin/dashboard/adminDashboard';
import AdminFoodManagement from './pages/admin/dashboard/adminFoodManagement';
import AdminOrders from './pages/admin/dashboard/orders';
import AdminSales from './pages/admin/dashboard/sales';
import AdminUsers from './pages/admin/dashboard/users';
import AdminAnalytics from './pages/admin/dashboard/adminAnalytics';
import CartalogPage from './pages/user/cartalogPage';
import CartPage from './pages/cartPage';
import PreviewPage from './pages/user/previewPage';
import OrderPage from './pages/user/orderPage';
import DineoutPage from './pages/dineOut';
import InstamartPage from './pages/instamart';
import ProductPage from './pages/productPage';
import AdminProtectedRoute from './pages/admin/adminProtectedRouted';


const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
    </Route>
    <Route path="/admin" element={<AdminLoginPage />} />
    <Route element={<AdminProtectedRoute />}>
    <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route path="home" element={<AdminDashboard />} />
        <Route path="foodManagement" element={<AdminFoodManagement />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="sales" element={<AdminSales />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
    </Route>
    
    </Route>
    
    <Route path="/cartalog" element={<CartalogPage />}/>
    <Route path="/preview" element={<PreviewPage />} />
    <Route path="/instamart" element={<InstamartPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/order" element={<OrderPage />} />
    <Route path="/dineout" element={<DineoutPage />} />
    <Route path="/products" element={<ProductPage />} />
    </>
));


const App = () => {
    return <RouterProvider router={router} />;
}

export default App;
