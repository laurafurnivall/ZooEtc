import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGearItem } from "../../modules/gearManager";
import { Rate, Button, Form } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { addGearReview } from "../../modules/gearReviewManager";

export default function AddGearReview({ userProfile }) {
    const { id } = useParams();
    const [gearToReview, setGearToReview] = useState({})
    const [newReview, addNewReview] = useState({
        userId: userProfile.id,
        gearId: parseInt(id),
        reviewDate: (new Date).toDateString(),
        longevity: 0,
        versatility: 0,
        comfort: 0,
        comments: "",
        isApproved: false
    })
    const navigate = useNavigate();

    useEffect(() => {
        getGearItem(id).then((fetchedReview) => {
            setGearToReview(fetchedReview);
        });
    }, [id]);


    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;

        const newReviewCopy = { ...newReview }

        newReviewCopy[key] = value;

        addNewReview(newReviewCopy);
    }

    const handleLongevityChange = (value) => {
        const newReviewCopy = { ...newReview };
        newReviewCopy.longevity = value;
        addNewReview(newReviewCopy);
    }
    
    const handleVersatilityChange = (value) => {
        const newReviewCopy = { ...newReview };
        newReviewCopy.versatility = value;
        addNewReview(newReviewCopy);
    }
    
    const handleComfortChange = (value) => {
        const newReviewCopy = { ...newReview };
        newReviewCopy.comfort = value;
        addNewReview(newReviewCopy);
    }

    const handleSave = (event) => {
        event.preventDefault();

        addGearReview(newReview)
            .then(() => navigate(`/Gear/${id}`))
    }


    if (userProfile) {
        return <>
        <article className="zooContainer">
            <h4>Add a Review to <i>{gearToReview.title}</i></h4>
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
                    <Rate id="longevity" className="zooRating"
                        onChange={handleLongevityChange}
                        value={newReview.longevity}
                        name="longevity" />
                </Form.Item>
                <Form.Item
                    label="Versatility"
                    name="versatility"
                    id="versatility">
                    <Rate id="versatility" className="zooRating"
                        onChange={handleVersatilityChange}
                        value={newReview.versatility}
                        name="versatility" />
                </Form.Item>
                <Form.Item
                    label="Comfort"
                    name="comfort"
                    id="comfort">
                    <Rate id="comfort" className="zooRating"
                        onChange={handleComfortChange}
                        value={newReview.comfort}
                        name="comfort" />
                </Form.Item>
                <Form.Item label="Comments"
                    name="comments"
                    id="comments">
                    <TextArea
                        rows={4}
                        id="comments"
                        value={newReview.comments}
                        onChange={handleInputChange}
                        name="comments" />
                </Form.Item>
                <Form.Item className='buttonGroup'>
                    <Button className="zooFormButton" onClick={handleSave}>Save</Button>
                    <Button className="zooFormButton" onClick={() => navigate("/Gear")}>Cancel</Button>
                </Form.Item>
            </Form>
            </article>
        </>
    }
}