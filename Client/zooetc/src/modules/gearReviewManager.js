import {getToken} from "./authmanager"

const grUrl = "/api/GearReviews"

export const getAllGearReviews = () => {
    return getToken().then((token) => {
        return fetch(grUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error (
                    "I'm sorry. The Gear Reviews seemed to have disappeared!"
                );
            }
        });
    });
};

export const getGearReviewsByUser = (id) => {
    return getToken().then((token) => {
        return fetch(`${grUrl}/MyReviews/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error (
                    "I'm sorry. The Gear Reviews seemed to have disappeared!"
                );
            }
        });
    });
};

export const getGearReview = (id) => {
    return getToken().then((token) => {
        return fetch(`${grUrl}/${id}`, {
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

export const addGearReview = (GearReview) => {
    return getToken().then((token) => {
        return fetch(`${grUrl}/add`, {
            method: "POST",
            headers: {
                Authorization:  `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(GearReview),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "I'm sorry. Failed to add new Gear Review to database."
                );
            }
        });
    });
};

export const editGearReview = (id, GearReview) => {
    return getToken().then((token) => {
        return fetch(`${grUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(GearReview)
        }).then((res) => {
            if (res.ok) {
                return res.status === 204;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occured while trying to edit the Gear Review."
                );
            }
        })
    })
}

export const deleteGearReview = (GearReviewId) => {
    return getToken().then(token => {
        return fetch(`${grUrl}/Delete/${GearReviewId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}