import { useState } from "react";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import JobSearch from "./JobSearch";
import JobList from "./JobsList";

export default function JobContainer ({userProfile}) {
    const [searchTerms, setSearchTerms] = useState("")
    const navigate = useNavigate();

    return <> <article className="zooContainer"> <div className="buttonAndSearch"> 
    <Button className="addButton" onClick={() => {navigate("./add")}}>Add New Job Listing</Button>
    <JobSearch setterFunction={setSearchTerms}/> </div>
    <JobList userProfile={userProfile} searchTermState={searchTerms}/>
    </article>
    </>
}