import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import ZooList from "./Zoos/ZooList";

export default function ApplicationViews({ isLoggedIn, userProfile }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <LandingPage /> : <Navigate to="/login" />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="Zoos">
                        <Route index element={isLoggedIn? <ZooList/> : <Navigate to="/login" />}/>
                    </Route>
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                    </Route>
            </Routes>
        </main>
    );
};