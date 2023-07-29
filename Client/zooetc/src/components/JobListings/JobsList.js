import { useEffect, useState } from "react"
import { getAllJobs } from "../../modules/jobListingsManager";
import JobCard from "./JobCard";
import { Table } from "reactstrap";

export default function JobList({ searchTermState }) {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([])

    useEffect(() => {
        getAllJobs().then((jobsList) => {
            setJobs(jobsList)
        })
    }, [])

    useEffect(() => {
        setFilteredJobs(jobs)
    }, [jobs])

    useEffect(() => {
        if (searchTermState === "") {
            getAllJobs().then((j) => {
                setJobs(j);
            })
        } else {
            const searchedJobs = filteredJobs.filter(j => {
                return j.title.toLowerCase().includes(searchTermState.toLowerCase()) || j.zoo.location.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredJobs(searchedJobs)
        }
    }, [searchTermState])


    return <>
        <h5>Current Job Postings</h5>
        <Table hover>
            <thead>
                <tr>
                    <th>
                        Job Title
                    </th>
                    <th>
                        Zoo
                    </th>
                    <th>
                        City, State
                    </th>
                    <th>
                        Date Posted
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredJobs.map((j) =>
                    <JobCard
                    key={j.id}
                    job={{
                        id: j.id,
                        title: j.title,
                        postingDate: j.postingDate,
                        zooName: j.zoo.zooName,
                        location: j.zoo.location
                        
                    }}
                />)
                }
            </tbody>
        </Table>
    </>
}