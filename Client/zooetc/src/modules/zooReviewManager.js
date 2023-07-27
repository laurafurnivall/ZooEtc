import {getToken} from "./authmanager"

const zrUrl = "/api/ZooReviews"

export const getAllZooReviews = () => {
    return getToken().then((token) => {
        return fetch(zrUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error (
                    "I'm sorry. The ZooReviews seemed to have disappeared!"
                );
            }
        });
    });
};

export const getZooReview = (id) => {
    return getToken().then((token) => {
        return fetch(`${zrUrl}/${id}`, {
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

export const addZooReview = (ZooReview) => {
    return getToken().then((token) => {
        return fetch(`${zrUrl}/add`, {
            method: "POST",
            headers: {
                Authorization:  `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ZooReview),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "I'm sorry. Failed to add new Zoo Review to database."
                );
            }
        });
    });
};

export const editZooReview = (id, ZooReview) => {
    return getToken().then((token) => {
        return fetch(`${zrUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ZooReview)
        }).then((res) => {
            if (res.ok) {
                return res.status === 204;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occured while trying to edit the Zoo Review."
                );
            }
        })
    })
}

export const deleteZooReview = (ZooReviewId) => {
    return getToken().then(token => {
        return fetch(`${zrUrl}/Delete/${ZooReviewId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}