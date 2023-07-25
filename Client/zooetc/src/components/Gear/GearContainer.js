import { useState } from "react";
import { GearSearch } from "./GearSearch";
import GearList from "./GearList";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

export default function GearContainer ({userProfile }) {
    const [searchTerms, setSearchTerms] = useState("")
    const navigate = useNavigate();

    return<>
    <Button onClick={() => {navigate("./add")}}>Add New Item</Button>
    <GearSearch setterFunction={setSearchTerms}/>
    <GearList userProfile={userProfile} searchTermState={searchTerms}/>
    </>
}