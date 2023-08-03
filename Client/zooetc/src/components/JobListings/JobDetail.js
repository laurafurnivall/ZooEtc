import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteJob, getJob } from "../../modules/jobListingsManager";
import { Descriptions, Layout, Space, Modal, Button } from "antd";
import { Spinner } from "reactstrap";
import { Content, Footer } from "antd/es/layout/layout";
import {  EditOutlined, DeleteOutlined, ExclamationCircleFilled, InfoCircleOutlined   } from '@ant-design/icons';

export default function JobDetails({ userProfile }) {
    const { id } = useParams();
    const [job, setJob] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { confirm } = Modal;
    const navigate = useNavigate();
    
    useEffect(() => {
        getJob(id).then(job => {
            setJob(job);
            setIsLoading(false);
        });
    }, []);

    const showConfirm = (id) => {
        confirm({
          title: 'Do you Want to delete this job?',
          icon: <ExclamationCircleFilled />,
          onOk() {
            deleteJob(id)
            navigate("/JobListings")
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    if (isLoading) {
        return <><Spinner color="dark" 
        style={{
            height: '3rem',
            width: '3rem'
          }}>Loading...</Spinner></>
    }

    if (userProfile) {
        return <>

            <Layout className="zooContainer jobDetailContainer">
                <Content>
                    <Descriptions title={job.title} layout="horizontal" column={1} >

                        <Descriptions.Item label="Zoo"><Link to={`/Zoos/${job.zoo.id}`}>{job.zoo.zooName}</Link></Descriptions.Item>

                        <Descriptions.Item label="Location">{job.zoo.location}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{job.zoo.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="Posted">
                            {
                                new Date(job.postingDate).toLocaleDateString()
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Salary">{job.salary}</Descriptions.Item>

                    </Descriptions>
                    {job.description}
                </Content>
                <Footer  className='jobCardFooter'>
                        <InfoCircleOutlined 
                         className="linkOut jobRatingR"
                         style={{fontSize: 25}}
                        onClick={() => window.open(job.jobUrl, '_blank')}/>
                    
                    {userProfile && userProfile === job.UserId || userProfile.isAdmin === true ? (
                       <Space>
                       <EditOutlined 
                       className="linkOut jobRatingR"
                       style={{fontSize: 25, textAlign: "left"}}
                       onClick={() => {
                           navigate(`/JobListings/Update/${job.id}`);
                         }}/>
                       <DeleteOutlined 
                       className="linkOut jobRatingR"
                       style={{fontSize: 25, textAlign: "left"}}
                       onClick={() => {showConfirm(job.id)}} 
                       /> </Space>)
                    : ""}
                </Footer>
            </Layout>
        </>
    }
}