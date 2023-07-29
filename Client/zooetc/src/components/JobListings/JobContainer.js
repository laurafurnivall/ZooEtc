import { useState } from "react";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import JobSearch from "./JobSearch";
import JobList from "./JobsList";

export default function JobContainer ({userProfile}) {
    const [searchTerms, setSearchTerms] = useState("")
    const navigate = useNavigate();

    return <>
    <Button onClick={() => {navigate("./add")}}>Add New Job Listing</Button>
    <JobSearch setterFunction={setSearchTerms}/>
    <JobList userProfile={userProfile} searchTermState={searchTerms}/>
    </>
}