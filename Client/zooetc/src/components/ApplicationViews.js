import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import ZooList from "./Zoos/ZooList";
import ZooAdd from "./Zoos/ZooAdd";
import ZooDetails from "./Zoos/ZooDetails";
import ZooEdit from "./Zoos/ZooEdit";
import GearContainer from "./Gear/GearContainer";
import GearAdd from "./Gear/GearAdd";
import GearDetails from "./Gear/GearDetails";
import GearEdit from "./Gear/GearEdit";
import TypeContainer from "./Types/TypeContainer";

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
                        <Route index element={isLoggedIn? <ZooList userProfile={userProfile}/> : <Navigate to="/login" />}/>
                        <Route path="Add"element={<ZooAdd/>}/>
                        <Route path=":id" element={<ZooDetails/>} />
                        <Route path="Update/:id" element={<ZooEdit />} />
                    </Route>
                    <Route path="Gear">
                        <Route index element={isLoggedIn? <GearContainer userProfile={userProfile}/> : <Navigate to="/login"/>}/>
                        <Route path="Add"element={<GearAdd/>}/>
                        <Route path=":id" element={<GearDetails/>} />
                        <Route path="Update/:id" element={<GearEdit />} />
                    </Route>
                    <Route path="Type">
                        <Route index element={isLoggedIn? <TypeContainer userProfile={userProfile}/> : <Navigate to="/login"/>}/>
                    </Route>
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                    </Route>
            </Routes>
        </main>
    );
};