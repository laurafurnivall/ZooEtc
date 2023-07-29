import { Rate, Button, Form } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editZooReview, getZooReview } from "../../modules/zooReviewManager";

export default function EditZooReview () {
    const { id } = useParams();
    const [reviewToEdit, setReviewToEdit] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        getZooReview(id).then((fetchedReview) => {
            setReviewToEdit(fetchedReview);
        });
    }, [id]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;

        const reviewToEditCopy = { ...reviewToEdit }

        reviewToEditCopy[key] = value;

        setReviewToEdit(reviewToEditCopy);
    }
    
    const handleSave = (event) => {
        event.preventDefault();

        editZooReview(id, reviewToEdit)
            .then(() => navigate(`/Zoos/${reviewToEdit.zooId}`))
    }

    if (reviewToEdit.animalCare) {
        return <>
            <h4>Review to Edit</h4>
            <Form
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
                initialValues={{
                    animalCare: reviewToEdit.animalCare,
                    benefits: reviewToEdit.benefits,
                    conservationInitiative: reviewToEdit.conservationInitiative,
                    culture: reviewToEdit.culture,
                    inclusivity: reviewToEdit.inclusivity,
                    leadership: reviewToEdit.leadership,
                    salary: reviewToEdit.salary,
                    comments: reviewToEdit.comments
                }}
            >
                <Form.Item
                    label="Animal Care"
                    name="animalCare"
                    id="animalCare">
                    <Rate id="animalCare"
                        onChange={
                            (value) => {
                                const copy = {...reviewToEdit}
                                copy.animalCare = value
                                setReviewToEdit(copy)
                            }
                        }
                        value={reviewToEdit.animalCare}
                        name="animalCare" />
                </Form.Item>
                <Form.Item
                    label="Benefits"
                    name="benefits"
                    id="benefits">
                    <Rate id="benefits"
                        onChange={
                            (value) => {
                                const copy = {...reviewToEdit}
                                copy.benefits = value
                                setReviewToEdit(copy)
                            }
                        }
                        value={reviewToEdit.benefits}
                        name="benefits" />
                </Form.Item>
                <Form.Item
                    label="Conservation Initiative"
                    name="conservationInitiative"
                    id="conservationInitiative">
                    <Rate id="conservationInitiative"
                        onChange={(value) => {
                            const copy = {...reviewToEdit}
                            copy.conservationInitiative = value
                            setReviewToEdit(copy)
                        }}
                        value={reviewToEdit.conservationInitiative}
                        name="conservationInitiative" />
                </Form.Item>
                <Form.Item
                    label="Culture"
                    name="culture"
                    id="culture">
                    <Rate id="culture"
                        onChange={(value) => {
                            const copy = {...reviewToEdit}
                            copy.culture = value
                            setReviewToEdit(copy)
                        }}
                        value={reviewToEdit.culture}
                        name="culture" />
                </Form.Item>
                <Form.Item
                    label="Inclusivity"
                    name="inclusivity"
                    id="inclusivity">
                    <Rate id="inclusivity"
                        onChange={(value) => {
                            const copy = {...reviewToEdit}
                            copy.inclusivity = value
                            setReviewToEdit(copy)
                        }}
                        value={reviewToEdit.inclusivity}
                        name="inclusivity" />
                </Form.Item>
                <Form.Item
                    label="Leadership"
                    name="leadership"
                    id="leadership">
                    <Rate id="leadership"
                        onChange={(value) => {
                            const copy = {...reviewToEdit}
                            copy.leadership = value
                            setReviewToEdit(copy)
                        }}
                        value={reviewToEdit.leadership}
                        name="leadership" />
                </Form.Item>
                <Form.Item
                    label="Salary"
                    name="salary"
                    id="salary">
                    <Rate id="salary"
                        onChange={(value) => {
                            const copy = {...reviewToEdit}
                            copy.salary = value
                            setReviewToEdit(copy)
                        }}
                        value={reviewToEdit.salary}
                        name="salary" />
                </Form.Item>
                <Form.Item label="Comments"
                    name="comments"
                    id="comments">
                    <TextArea
                        rows={4}
                        id="comments"
                        value={reviewToEdit.comments}
                        onChange={handleInputChange}
                        name="comments" />
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={() => navigate(`/Zoos/${reviewToEdit.zooId}`)}>Cancel</Button>
                </Form.Item>
            </Form>
        </>
    }
}