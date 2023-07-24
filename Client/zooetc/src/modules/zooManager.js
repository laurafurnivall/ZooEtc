import {getToken} from "./authmanager"

const zooUrl = "/api/Zoos"

export const getAllZoos = () => {
    return getToken().then((token) => {
        return fetch(zooUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error (
                    "I'm sorry. There are no zoo's currently available at this time. Please try again later!"
                );
            }
        });
    });
};

export const getZoo = (id) => {
    return getToken().then((token) => {
        return fetch(`${zooUrl}/${id}`, {
            method: "GET", 
            headers: {
                Authorization: `Bear ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "Whoops! Couldn't retrieve the zoo!"
                );
            }
        });
    });
};

export const addZoo = (zoo) => {
    return getToken().then((token) => {
        return fetch(`${zooUrl}/add`, {
            method: "POST",
            headers: {
                Authorization:  `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(zoo),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "I'm sorry. Failed to add new zoo to database."
                );
            }
        });
    });
};