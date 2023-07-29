import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

export default function JobCard({job: {id, title, postingDate, zooName, location}}) {
    const navigate = useNavigate();

    return <>
        <tr>
            <td scope="row">
                <Link to={`./${id}`}
                    >{title}</Link>
            </td>
            <td>
                {zooName}
            </td>
            <td>
                {location}
            </td>
            <td>
                {
                     new Date(postingDate).toLocaleDateString()
                }
            </td>
        </tr>
    </>
}
