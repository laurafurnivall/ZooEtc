import { useNavigate, useParams } from "react-router-dom"
import { editJob, getJob } from "../../modules/jobListingsManager";
import { getAllZoos } from "../../modules/zooManager";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Jobs.css"
import { useState, useEffect } from "react"

export default function JobEdit () {
    const {id} = useParams();
    const [jobToEdit, setJobToEdit] = useState({})
    const [allZoos, setAllZoos] = useState();
    const navigate = useNavigate();

    const formatDate = (date) => {
        const d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    }

    useEffect(() => {
        getAllZoos().then((zoos) => {
            setAllZoos(zoos);
        });
    }, []);

    useEffect(() => {
        getJob(id).then((fetchedJob) => {
            setJobToEdit(fetchedJob)
        })
    }, [id]);

    const handleSave = (event) => {
        event.preventDefault();

        editJob(id, jobToEdit)
            .then(() => navigate(`/JobListings/${jobToEdit.id}`))
    }

    if (allZoos) {
        return <>
            <Form className="addJobForm">
                <FormGroup>
                    <Label for="zooId">Zoo</Label>
                    <Input
                        id="zooId"
                        type="select"
                        value={jobToEdit.zooId}
                        onChange={
                            (event) => {
                               const copy = {...jobToEdit}
                               copy.zooId = parseInt(event.target.value)
                               setJobToEdit(copy) 
                            }
                        }>
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
                            const copy = {...jobToEdit}
                            copy.title = event.target.value
                            setJobToEdit(copy) 
                         }
                    }
                    value={jobToEdit.title}
                    />
                </FormGroup>
                <FormGroup>
                <Label for="salary">Salary</Label>
                    <Input
                    id="salary"
                    placeholder="Please enter the salary range..."
                    onChange={
                        (event) => {
                            const copy = {...jobToEdit}
                            copy.salary = event.target.value
                            setJobToEdit(copy) 
                         }
                    }
                    value={jobToEdit.salary}
                    />
                </FormGroup>
                <FormGroup>
                <Label for="jobUrl">Job Link</Label>
                    <Input
                    id="jobUrl"
                    placeholder="Please leave a link to the full job description..."
                    onChange={
                        (event) => {
                            const copy = {...jobToEdit}
                            copy.jobUrl = event.target.value
                            setJobToEdit(copy) 
                         }
                    }
                    value={jobToEdit.jobUrl}
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
                            const copy = {...jobToEdit}
                            copy.description = event.target.value
                            setJobToEdit(copy) 
                         }
                    }
                    value={jobToEdit.description}
                    />
                </FormGroup>
                <FormGroup>
                <Label for="removalDate">Leave job posting up until: </Label>
                    <Input
                    id="removalDate"
                    type="date"
                    onChange={
                        (event) => {
                            const copy = {...jobToEdit}
                            copy.removalDate = event.target.value
                            setJobToEdit(copy) 
                         }
                    }
                    value={formatDate(jobToEdit.removalDate)}
                    />
                </FormGroup>
    
    
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={() => navigate("/JobLisitngs")}>Cancel</Button>
            </Form>
        </>
    }
}