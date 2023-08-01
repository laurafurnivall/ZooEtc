import { useEffect, useState } from "react"
import { getGearReviewsByUser } from "../../modules/gearReviewManager";
import MyGearReviewCard from "./MyGearReviewCard";
import { CardGroup, Spinner } from "reactstrap";

export default function MyGearReviews ({userProfile}) {
    const [myReviews, setMyReviews] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getGearReviewsByUser(userProfile.id).then((reviews) => {
            setMyReviews(reviews);
            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return <><Spinner color="dark" 
        style={{
            height: '3rem',
            width: '3rem'
          }}>Loading...</Spinner></>
    }

    if (userProfile) {
    return<>
    <article className="zooContainer">
        My Gear Reviews
        <CardGroup>
        {
            myReviews.map((r) => 
                <MyGearReviewCard
                key={r.id}
                id={r.id}
                reviewDate={r.reviewDate}
                longevity={r.longevity}
                versatility={r.versatility}
                comofort={r.comfort}
                comments={r.comments}
                title={r.gear.title}
                imageUrl={r.gear.imageUrl}
                description={r.gear.description}
                 />
            )
        }
        </CardGroup>
    </article>
    </>
    }
}