import {getToken} from "./authmanager"

const jobsUrl = "/api/JobListings"

export const getAllJobs = () => {
    return getToken().then((token) => {
        return fetch(jobsUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error (
                    "I'm sorry. The jobs seemed to have disappeared!"
                );
            }
        });
    });
};

export const getJob = (id) => {
    return getToken().then((token) => {
        return fetch(`${jobsUrl}/${id}`, {
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

export const addJob = (job) => {
    return getToken().then((token) => {
        return fetch(`${jobsUrl}/add`, {
            method: "POST",
            headers: {
                Authorization:  `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "I'm sorry. Failed to add new job to database."
                );
            }
        });
    });
};

export const editJob = (id, job) => {
    return getToken().then((token) => {
        return fetch(`${jobsUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job)
        }).then((res) => {
            if (res.ok) {
                return res.status === 204;
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occured while trying to edit the job."
                );
            }
        })
    })
}

export const deleteJob = (jobId) => {
    return getToken().then(token => {
        return fetch(`${jobsUrl}/Delete/${jobId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}