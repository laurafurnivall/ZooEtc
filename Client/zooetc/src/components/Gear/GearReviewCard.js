import { Rate, Card, Space, Modal } from 'antd';
import { CardBody, CardFooter } from "reactstrap";
import "./Gear.css"
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { deleteGearReview } from '../../modules/gearReviewManager';
import { useNavigate } from 'react-router-dom';
import { getGearItem } from '../../modules/gearManager';

export default function GearReviewCard ({id, setItem, gearId, reviewDate, longevity, versatility, comfort, comments, userId, userProfile}) {
    const { confirm } = Modal;
    const navigate = useNavigate();


    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this review?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteGearReview(id);
                getGearItem(gearId).then(setItem);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return <>
    <Card className='gearReviewCard'>
        <CardBody>
            <Space className='zooSpace'>
            <b>Longevity: </b><Rate className="gearRatingR" disabled defaultValue={longevity} />
            <b>Versatilty:</b> <Rate className="gearRatingR" disabled defaultValue={versatility} />
            <b>Comfort:</b> <Rate className="gearRatingR" disabled defaultValue={comfort} />
            </Space>
            <p><b>Comments: </b>{comments}</p>
            <p style={{fontSize: 12}}><i>Review Date: {reviewDate}</i></p>
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