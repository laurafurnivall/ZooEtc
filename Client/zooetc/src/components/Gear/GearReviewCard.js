import { Layout, Rate, Card, Space } from 'antd';
import { CardBody, CardFooter, CardTitle } from "reactstrap";
import Meta from "antd/es/card/Meta";
import "./Gear.css"

export default function GearReviewCard ({id, reviewDate, longevity, versatility, comfort, comments, averageR}) {
    return <>
    <Card className='gearReviewCard'>
        <CardTitle>
            <h6><b>Review Date:</b> {reviewDate}</h6>
        </CardTitle>
        <CardBody>
            <Space>
            <b>Longevity: </b><Rate className="gearRatingR" disabled defaultValue={longevity} />
            <b>Versatilty:</b> <Rate className="gearRatingR" disabled defaultValue={versatility} />
            <b>Comfort:</b> <Rate className="gearRatingR" disabled defaultValue={comfort} />
            </Space>
            <p><b>Comments: </b>{comments}</p>
            
        </CardBody>
    </Card>
    
    </>
}