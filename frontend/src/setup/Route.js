import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard'
import Cart from '../pages/cart'
import Chess from '../pages/chessProducts'
import Soccer from '../pages/soccerProducts'
import WaterSports from '../pages/watersportsProducts'
import PaymentSuccess from '../pages/paymentSuccess'

export default function RouteComponent() {

    return (
        <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/paymentSuccess" element={<PaymentSuccess />} />

            <Route exact path="/chess" element={<Chess />} />
            <Route exact path="/soccer" element={<Soccer />} />
            <Route exact path="/watersports" element={<WaterSports />} />
        </Routes>
    )
}