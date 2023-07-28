import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editGearReview, getGearReview } from "../../modules/gearReviewManager";
import { Rate, Button, Form } from "antd";
import TextArea from 'antd/es/input/TextArea';

export default function EditGearReview() {
    const { id } = useParams();
    const [reviewToEdit, setReviewToEdit] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        getGearReview(id).then((fetchedReview) => {
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

    const handleLongevityChange = (value) => {
        const reviewToEditCopy = { ...reviewToEdit };
        reviewToEditCopy.longevity = value;
        setReviewToEdit(reviewToEditCopy);
    }

    const handleVersatilityChange = (value) => {
        const reviewToEditCopy = { ...reviewToEdit };
        reviewToEditCopy.versatility = value;
        setReviewToEdit(reviewToEditCopy);
    }

    const handleComfortChange = (value) => {
        const reviewToEditCopy = { ...reviewToEdit };
        reviewToEditCopy.comfort = value;
        setReviewToEdit(reviewToEditCopy);
    }

    const handleSave = (event) => {
        event.preventDefault();

        editGearReview(id, reviewToEdit)
            .then(() => navigate(`/Gear/${reviewToEdit.gearId}`))
    }

    if (reviewToEdit.longevity) {
        return <>
            <h4>Review to Edit</h4>
            <Form
                name='GearReviewForm'
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
                    label="Longevity"
                    name="longevity"
                    id="longevity">
                    <Rate id="longevity"
                        onChange={handleLongevityChange}
                        defaultValue={reviewToEdit.longevity}
                        value={reviewToEdit.longevity}
                        name="longevity" />
                </Form.Item>
                <Form.Item
                    label="Versatility"
                    name="versatility"
                    id="versatility">
                    <Rate id="versatility"
                        onChange={handleVersatilityChange}
                        defaultValue={reviewToEdit.versatility}
                        value={reviewToEdit.versatility}
                        name="versatility" />
                </Form.Item>
                <Form.Item
                    label="Comfort"
                    name="comfort"
                    id="comfort">
                    <Rate id="comfort"
                        onChange={handleComfortChange}
                        defaultValue={reviewToEdit.comfort}
                        value={reviewToEdit.comfort}
                        name="comfort" />
                </Form.Item>
                <Form.Item label="Comments"
                    name="comments"
                    id="comments">
                    <TextArea
                        rows={4}
                        id="comments"
                        defaultValue={reviewToEdit.comments}
                        value={reviewToEdit.comments}
                        onChange={handleInputChange}
                        name="comments" />
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={() => navigate(`/Gear/${id}`)}>Cancel</Button>
                </Form.Item>
            </Form>
        </>
    }
}