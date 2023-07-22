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