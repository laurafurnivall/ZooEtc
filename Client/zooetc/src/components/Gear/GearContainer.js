import { useState } from "react";
import { GearSearch } from "./GearSearch";
import GearList from "./GearList";

export default function GearContainer () {
    const [searchTerms, setSearchTerms] = useState("")

    return<>
    <h2>Gear Inventory</h2>
    <GearSearch setterFunction={setSearchTerms}/>
    <GearList searchTermState={searchTerms}/>
    </>
}