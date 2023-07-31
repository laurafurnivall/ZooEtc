import { useState } from "react"
import { addZoo } from "../../modules/zooManager"
import { useNavigate } from "react-router-dom";
import ZooAddForm from "./ZooAddForm";
import "./Zoos.css"

export default function ZooAdd () {
    const emptyZoo = {
        ZooName: "",
        Address: "",
        City: "",
        State: "",
        PhoneNumber: "",
        ZooImgUrl: "",
        ZooUrl: "",
        Description: ""
    }

    const [newZoo, setNewZoo] = useState(emptyZoo)
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;

        const newZooCopy = {...newZoo}

        newZooCopy[key] = value;

        setNewZoo(newZooCopy);
    }

    const handleSave = (event) => {
        event.preventDefault();

        addZoo(newZoo)
        .then(() => navigate("/Zoos"))
    }

    return<>
    <article className="zooContainer">
    <h4>Add a Zoological Institution:</h4>
    <ZooAddForm 
        zooName={newZoo.ZooName}
        address={newZoo.Address}
        city={newZoo.City}
        state={newZoo.State}
        phoneNumber={newZoo.PhoneNumber}
        zooImgUrl={newZoo.ZooImgUrl}
        zooUrl={newZoo.ZooUrl}
        description={newZoo.Description}
        handleInputChange={handleInputChange}
        handleSave={handleSave}/>
    </article>
    </>
}