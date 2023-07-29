import { useState } from "react";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import ZooSearch from "./ZooSearch";
import ZooList from "./ZooList";


export default function ZooContainer ({userProfile}) {
    const [searchTerms, setSearchTerms] = useState("")
    const navigate = useNavigate();

    return <>
     {userProfile && userProfile.isAdmin === true ? <Button
        onClick={() =>
            navigate("./Add")}>Add a Zoo</Button> : ""}
    <ZooSearch setterFunction={setSearchTerms}/>
    <ZooList userProfile={userProfile} searchTermState={searchTerms}/>
    </>
}