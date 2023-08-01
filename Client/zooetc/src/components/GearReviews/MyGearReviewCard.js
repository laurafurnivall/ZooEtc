import { Card, Rate, Space, Modal } from "antd";
import { CardBody, CardFooter, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { deleteGearReview, getGearReviewsByUser } from "../../modules/gearReviewManager";
import "./GearReview.css"

export default function MyGearReviewCard({ userId, userProfile, setMyReviews, id, reviewDate, longevity, versatility, comfort, comments, title, imageUrl, description }) {
    const { confirm } = Modal;
    const navigate = useNavigate();


    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this review?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteGearReview(id);
                getGearReviewsByUser(userId).then(setMyReviews);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return <>
        <Card className="singleReviewCard">
            <CardBody className="cardBodyReview">
                <Card className="cardwithinacard">
                    <CardTitle>{title}</CardTitle>
                    <img
                        className="gearReviewImg"
                        alt="Gear Image"
                        src={imageUrl}
                        width="90%"
                    />
                    <CardBody>{description}</CardBody>
                </Card >
                <Card className="cardwithinacard">
                    <b>Longevity: </b><Rate className="gearRatingR" disabled defaultValue={longevity} />
                    <b>Versatilty:</b> <Rate className="gearRatingR" disabled defaultValue={versatility} />
                    <b>Comfort:</b> <Rate className="gearRatingR" disabled defaultValue={comfort} />
                    <p><b>Comments: </b>{comments}</p>
                    <p style={{ fontSize: 12 }}><i>Review Date: {reviewDate}</i></p>
                </Card>
            </CardBody>
            <CardFooter className='gearReviewCardFooter'>
                {
                    userProfile && userId === userProfile.id || userProfile.isAdmin === true ? (
                        <Space className='linkOut'>
                            <EditOutlined
                                className="gearCardLink"
                                onClick={() => {
                                    navigate(`/GearReviews/Update/${id}`);
                                }} />
                            <DeleteOutlined
                                className="gearCardLink"
                                onClick={() => { showConfirm(id) }}
                            />
                        </Space>) : ""
                }
            </CardFooter>
        </Card>
    </>
}