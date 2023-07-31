import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TypeSearch from './TypeSearch';
import TypeList from './TypeList';

export default function TypeContainer ({userProfile}) {
    const [searchTerms, setSearchTerms] = useState("")

    return <> <article className="zooContainer">
        <TypeSearch setterFunction={setSearchTerms}/>
        <TypeList userProfile={userProfile} searchTermState={searchTerms}/>
        </article>
    </>
}