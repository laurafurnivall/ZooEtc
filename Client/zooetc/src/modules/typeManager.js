import {getToken} from "./authmanager"

const typeUrl = "/api/Types"

export const getAllTypes = () => {
    return getToken().then((token) => {
        return fetch(typeUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error (
                    "I'm sorry. There are no type's currently available at this time. Please try again later!"
                );
            }
        });
    });
};

export const getType = (id) => {
    return getToken().then((token) => {
        return fetch(`${typeUrl}/${id}`, {
            method: "GET", 
            headers: {
                Authorization: `Bear ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "Whoops! Couldn't retrieve that type!"
                );
            }
        });
    });
};

export const addType = (type) => {
    return getToken().then((token) => {
        return fetch(`${typeUrl}/add`, {
            method: "POST",
            headers: {
                Authorization:  `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(type),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "I'm sorry. Failed to add new type to database."
                );
            }
        });
    });
};

export const editType = (id, type) => {
    return getToken().then((token) => {
        return fetch(`${typeUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(type)
        }).then((res) => {
            if (res.ok) {
                return res.status === 204;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occured while trying to edit the type."
                );
            }
        })
    })
}

export const deleteType = (typeId) => {
    return getToken().then(token => {
        return fetch(`${typeUrl}/Delete/${typeId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}