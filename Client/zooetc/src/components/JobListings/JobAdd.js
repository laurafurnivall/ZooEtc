import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { addJob } from "../../modules/jobListingsManager";
import { getAllZoos } from "../../modules/zooManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Jobs.css"

export default function JobAdd({ userProfile }) {
    const formatDate = (date) => {
        const d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    }

    const emptyJob = {
        userId: userProfile.id,
        zooId: 0,
        title: "",
        postingDate: formatDate(new Date()),
        removalDate: formatDate(new Date()),
        description: "",
        salary: "",
        jobUrl: "",
        isApproved: false
    }

    const [newJob, setNewJob] = useState(emptyJob);
    const [allZoos, setAllZoos] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getAllZoos().then((zoos) => {
            setAllZoos(zoos);
        });
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;

        const newJobCopy = { ...newJob }

        newJobCopy[key] = value;

        setNewJob(newJobCopy);
    }

    const handleSave = (event) => {
        event.preventDefault();

        addJob(newJob)
            .then(() => navigate("/JobListings"))
    }

    if (allZoos) {
    return <>
        <Form className="addJobForm">
            <FormGroup>
                <Label for="zooId">Zoo</Label>
                <Input
                    id="zooId"
                    type="select"
                    onChange={
                        (event) => {
                           const copy = {...newJob}
                           copy.zooId = parseInt(event.target.value)
                           setNewJob(copy) 
                        }
                    }><option key={0}>What zoo is this job posing affiliated with?</option>
                        {
                            allZoos.map((z) => {
                                return <option key={z.id} id={z.id} value={z.id}>{z.zooName}</option>
                            })
                        }
                    </Input>
            </FormGroup>
            <FormGroup>
            <Label for="title">Job Title</Label>
                <Input
                id="title"
                placeholder="Enter job title here..."
                onChange={
                    (event) => {
                        const copy = {...newJob}
                        copy.title = event.target.value
                        setNewJob(copy) 
                     }
                }
                value={newJob.title}
                />
            </FormGroup>
            <FormGroup>
            <Label for="salary">Salary</Label>
                <Input
                id="salary"
                placeholder="Please enter the salary range..."
                onChange={
                    (event) => {
                        const copy = {...newJob}
                        copy.salary = event.target.value
                        setNewJob(copy) 
                     }
                }
                value={newJob.salary}
                />
            </FormGroup>
            <FormGroup>
            <Label for="jobUrl">Job Link</Label>
                <Input
                id="jobUrl"
                placeholder="Please leave a link to the full job description..."
                onChange={
                    (event) => {
                        const copy = {...newJob}
                        copy.jobUrl = event.target.value
                        setNewJob(copy) 
                     }
                }
                value={newJob.jobUrl}
                />
            </FormGroup>
            <FormGroup>
            <Label for="description">Brief Description</Label>
                <Input
                id="description"
                type="textarea"
                placeholder="Please enter a brief description..."
                onChange={
                    (event) => {
                        const copy = {...newJob}
                        copy.description = event.target.value
                        setNewJob(copy) 
                     }
                }
                value={newJob.description}
                />
            </FormGroup>
            <FormGroup>
            <Label for="removalDate">Leaving job posting up until: </Label>
                <Input
                id="removalDate"
                type="date"
                onChange={
                    (event) => {
                        const copy = {...newJob}
                        copy.removalDate = event.target.value
                        setNewJob(copy) 
                     }
                }
                value={newJob.removalDate}
                />
            </FormGroup>


            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => navigate("/JobLisitngs")}>Cancel</Button>
        </Form>
    </>
}
}