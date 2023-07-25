import {getToken} from "./authmanager"

const gearUrl = "/api/Gear"

export const getAllGearItems = () => {
    return getToken().then((token) => {
        return fetch(gearUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error (
                    "I'm sorry. The gear seems to have disappeared!"
                );
            }
        });
    });
};

export const getGearItem = (id) => {
    return getToken().then((token) => {
        return fetch(`${gearUrl}/${id}`, {
            method: "GET", 
            headers: {
                Authorization: `Bear ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "Whoops! Couldn't retrieve that!"
                );
            }
        });
    });
};

export const addGear = (zoo) => {
    return getToken().then((token) => {
        return fetch(`${gearUrl}/add`, {
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

export const editGear = (id, item) => {
    return getToken().then((token) => {
        return fetch(`${gearUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.ok) {
                return res.status === 204;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occured while trying to edit the item."
                );
            }
        })
    })
}

export const deleteGear = (gearId) => {
    return getToken().then(token => {
        return fetch(`${gearUrl}/Delete/${gearId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}