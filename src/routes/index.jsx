import React from 'react'
import Home from '../component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../component/login';
import SignUp from '../component/signUp';
import PublicRoute from './publicRoute';
import NotFoundPage from '../component/notFoundPage';

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRoute element={<Home />} />} />
                <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoute