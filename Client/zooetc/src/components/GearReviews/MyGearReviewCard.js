import { Card, CardBody } from "reactstrap";

export default function MyGearReviewCard ({id, reviewDate, longevity,versatility,comofort,comments, title,imageUrl,description}) {


    return <>
    <Card>
        <CardBody>
            {title}
        </CardBody>
    </Card>
    </>
}