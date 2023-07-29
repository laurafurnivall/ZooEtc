import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import ZooContainer from "./Zoos/ZooContainer";
import ZooAdd from "./Zoos/ZooAdd";
import ZooDetails from "./Zoos/ZooDetails";
import ZooEdit from "./Zoos/ZooEdit";
import GearContainer from "./Gear/GearContainer";
import GearAdd from "./Gear/GearAdd";
import GearDetails from "./Gear/GearDetails";
import GearEdit from "./Gear/GearEdit";
import TypeContainer from "./Types/TypeContainer";
import AddGearReview from "./GearReviews/AddGearReviews";
import EditGearReview from "./GearReviews/EditGearReview";
import AddZooReview from "./ZooReviews/AddZooReview";
import EditZooReview from "./ZooReviews/EditZooReview";
import JobContainer from "./JobListings/JobContainer";
import JobAdd from "./JobListings/JobAdd";
import JobDetails from "./JobListings/JobDetail";
import JobEdit from "./JobListings/JobEdit";

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
                        <Route index element={isLoggedIn ? <ZooContainer userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="Add" element={<ZooAdd />} />
                        <Route path=":id" element={<ZooDetails userProfile={userProfile} />} />
                        <Route path="Update/:id" element={<ZooEdit />} />
                    </Route>
                    <Route path="Gear">
                        <Route index element={isLoggedIn ? <GearContainer userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="Add" element={<GearAdd />} />
                        <Route path=":id" element={isLoggedIn ? <GearDetails userProfile={userProfile}/> : <Navigate to="/login" />} />
                        <Route path="Update/:id" element={<GearEdit />} />
                    </Route>
                    <Route path="JobListings">
                        <Route index element={isLoggedIn ? <JobContainer userProfile={userProfile} /> : <Navigate to="/login" />} />
                        <Route path="Add" element={<JobAdd userProfile={userProfile}/>} />
                        <Route path=":id" element={isLoggedIn ? <JobDetails userProfile={userProfile}/> : <Navigate to="/login" />} />
                        <Route path="Update/:id" element={<JobEdit />} />
                    </Route>
                    <Route path="GearReviews">
                        <Route path="Add/:id" element={isLoggedIn ? <AddGearReview userProfile={userProfile}/> : <Navigate to="/login" />} />
                        <Route path="Update/:id" element={isLoggedIn ? <EditGearReview userProfile={userProfile}/> : <Navigate to="/login" />} />
                    </Route>
                    <Route path="ZooReviews">
                        <Route path="Add/:id" element={isLoggedIn ? <AddZooReview userProfile={userProfile}/> : <Navigate to="/login" />} />
                        <Route path="Update/:id" element={isLoggedIn ? <EditZooReview userProfile={userProfile}/> : <Navigate to="/login" />} />
                    </Route>
                    <Route path="Types">
                        <Route index element={isLoggedIn ?  <TypeContainer userProfile={userProfile} /> : <Navigate to="/" /> }/>
                    </Route>
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};