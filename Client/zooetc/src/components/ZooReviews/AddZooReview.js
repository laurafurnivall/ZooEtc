import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getZoo } from "../../modules/zooManager";
import { addZooReview } from "../../modules/zooReviewManager";
import { Rate, Button, Form } from "antd";
import TextArea from 'antd/es/input/TextArea';
import "./zooReview.css"

export default function AddZooReview ({userProfile}) {
    const {id} = useParams();
    const [zooToReview, setZooToReview] = useState({})
    const [newZooReview, addNewZooReview] = useState({
        userId: userProfile.id,
        zooId: parseInt(id),
        reviewDate: (new Date).toDateString(),
        animalCare: 0,
        benefits: 0,
        conservationInitiative: 0,
        culture: 0,
        inclusivity: 0,
        leadership: 0,
        salary: 0,
        comments: "",
        isApproved: false
    })
    const navigate = useNavigate();

    useEffect(() => {
        getZoo(id).then((fetchedZoo) => {
            setZooToReview(fetchedZoo);
        })
    }, [id]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;

        const newReviewCopy = { ...newZooReview }

        newReviewCopy[key] = value;

        addNewZooReview(newReviewCopy);
    }

    const handleSave = (event) => {
        event.preventDefault();

        addZooReview(newZooReview)
        .then(() => navigate(`/Zoos/${id}`))
    }

    if (userProfile) {
        return <>
        <article  className="zooContainer">
            <h4>Add a Review to <i>{zooToReview.zooName}</i></h4>
            <Form
            className='zooform'
                name='ZooReviewForm'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Animal Care"
                    name="animalCare"
                    id="animalCare">
                    <Rate id="animalCare" className="zooRating"
                        onChange={
                            (value) => {
                                const copy = {...newZooReview}
                                copy.animalCare = value
                                addNewZooReview(copy)
                            }
                        }
                        value={newZooReview.animalCare}
                        name="animalCare" />
                </Form.Item>
                <Form.Item
                    label="Benefits"
                    name="benefits"
                    id="benefits">
                    <Rate id="benefits" className="zooRating"
                        onChange={ (value) => {
                            const copy = {...newZooReview}
                            copy.benefits = value
                            addNewZooReview(copy)
                        }}
                        value={newZooReview.benefits}
                        name="benefits" />
                </Form.Item>
                <Form.Item
                    label="Conservation Initiative"
                    name="conservationInitiative"
                    id="conservationInitiative">
                    <Rate id="conservationInitiative" className="zooRating"
                        onChange={(value) => {
                            const copy = {...newZooReview}
                            copy.conservationInitiative = value
                            addNewZooReview(copy)
                        }}
                        value={newZooReview.conservationInitiative}
                        name="conservationInitiative" />
                </Form.Item>
                <Form.Item
                    label="Culture"
                    name="culture"
                    id="culture">
                    <Rate id="culture" className="zooRating"
                        onChange={(value) => {
                            const copy = {...newZooReview}
                            copy.culture = value
                            addNewZooReview(copy)
                        }}
                        value={newZooReview.culture}
                        name="culture" />
                </Form.Item>
                <Form.Item
                    label="Inclusivity"
                    name="inclusivity"
                    id="inclusivity">
                    <Rate id="inclusivity" className="zooRating"
                        onChange={(value) => {
                            const copy = {...newZooReview}
                            copy.inclusivity = value
                            addNewZooReview(copy)
                        }}
                        value={newZooReview.inclusivity}
                        name="inclusivity" />
                </Form.Item>
                <Form.Item
                    label="Leadership"
                    name="leadership"
                    id="leadership">
                    <Rate id="leadership" className="zooRating"
                        onChange={(value) => {
                            const copy = {...newZooReview}
                            copy.leadership = value
                            addNewZooReview(copy)
                        }}
                        value={newZooReview.leadership}
                        name="leadership" />
                </Form.Item>
                <Form.Item
                    label="Salary"
                    name="salary"
                    id="salary">
                    <Rate id="salary" className="zooRating"
                        onChange={(value) => {
                            const copy = {...newZooReview}
                            copy.salary = value
                            addNewZooReview(copy)
                        }}
                        value={newZooReview.salary}
                        name="salary" />
                </Form.Item>
                <Form.Item label="Comments"
                    name="comments"
                    id="comments">
                    <TextArea
                        rows={4}
                        id="comments"
                        value={newZooReview.comments}
                        onChange={handleInputChange}
                        name="comments" />
                </Form.Item>
                <Form.Item className='buttonGroup'>
                    <Button className="zooFormButton" onClick={handleSave}>Save</Button>
                    <Button className="zooFormButton" onClick={() => navigate(`/Zoos/${id}`)}>Cancel</Button>
                </Form.Item>
            </Form>
            </article>
        </>
    }
}