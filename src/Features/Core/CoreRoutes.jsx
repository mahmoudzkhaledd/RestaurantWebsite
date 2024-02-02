import { Route, Routes, } from 'react-router-dom';
import LandingPage from './LandingPage/View/LandingPage';

import OrdersPage from './OrdersPage/OrdersPage';
import OrderPage from './OrderPage/OrderPage';
import ProfileSettingsPage from './ProfileSettings/ProfileSettingsPage';
import ContactUsPage from './ContactUsPage/View/ContactUsPage';
import MealsPage from './MealsPage/View/MealsPage';
import MealDetailsPage from './MealDetailsPage/MealDetailsPage';
import CheckoutPage from './Checkout/CheckoutPage';
import AllCategoriesPage from './CategoriesPage/AllCategoriesPage/AllCategoriesPage';
import CategoryPage from './CategoriesPage/CategoryPage/CategoryPage';


export default [
    <Route key={'/'} path='/' element={<LandingPage />} />,
    <Route key={'/contact'} path='/contact' element={<ContactUsPage />} />,
    <Route key={'/settings'} path='/settings' element={<ProfileSettingsPage />} />,
    <Route key={'/menu'} path='/menu' element={<MealsPage />} />,
    <Route key={'/categories'} path='/categories' element={<AllCategoriesPage />} />,
    <Route key={'/categories/id'} path='/categories/:id' element={<CategoryPage />} />,
    <Route key={'/meals/:id'} path='/meals/:id' element={<MealDetailsPage />} />,
    <Route key={'/orders'} path='/orders' element={<OrdersPage />} />,
    <Route key={'/orders/:id'} path='/orders/:id' element={<OrderPage />} />,
    <Route key={'/check-out'} path='/check-out' element={<CheckoutPage />} />,
]


