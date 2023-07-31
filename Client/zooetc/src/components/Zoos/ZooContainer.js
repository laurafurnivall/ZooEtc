import { useState } from "react";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import ZooSearch from "./ZooSearch";
import ZooList from "./ZooList";
import "./Zoos.css"


export default function ZooContainer ({userProfile}) {
    const [searchTerms, setSearchTerms] = useState("")
    const navigate = useNavigate();

    return <><article className="zooContainer"> <div className="buttonAndSearch"> 
     {userProfile && userProfile.isAdmin === true ? <Button className="addButton"
        onClick={() =>
            navigate("./Add")}>Add a Zoo</Button> : ""}
    <ZooSearch setterFunction={setSearchTerms}/></div>
    <ZooList userProfile={userProfile} searchTermState={searchTerms}/>
    </article>
    </>
}