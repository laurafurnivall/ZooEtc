import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteJob, getJob } from "../../modules/jobListingsManager";
import { Descriptions, Layout, Space, Modal } from "antd";
import { Button } from "reactstrap";
import { Content, Footer } from "antd/es/layout/layout";
import {  EditOutlined, DeleteOutlined, ExclamationCircleFilled  } from '@ant-design/icons';

export default function JobDetails({ userProfile }) {
    const { id } = useParams();
    const [job, setJob] = useState();
    const { confirm } = Modal;
    const navigate = useNavigate();
    
    useEffect(() => {
        getJob(id).then(setJob);
    }, []);

    const showConfirm = (id) => {
        confirm({
          title: 'Do you Want to delete this job?',
          icon: <ExclamationCircleFilled />,
          onOk() {
            deleteJob(id)
            navigate("./")
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }


    if (userProfile) {
        return <>
            <Layout>
                <Content>
                    <Descriptions title={job.title} layout="horizontal" column={1} >

                        <Descriptions.Item label="Zoo">{job.zoo.zooName}</Descriptions.Item>

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
                <Footer>
                    {
                        <Button onClick={() => window.open(job.jobUrl, '_blank')}>
                            More Info
                        </Button>
                    }
                    {userProfile && userProfile === job.UserId || userProfile.isAdmin === true ? (
                       <Space>
                       <EditOutlined 
                       style={{ fontSize: '16px' }} 
                       onClick={() => {
                           navigate(`/JobListings/Update/${job.id}`);
                         }}/>
                       <DeleteOutlined 
                       style={{ fontSize: '16px' }} 
                       onClick={() => {showConfirm(job.id)}} 
                       /> </Space>)
                    : ""}
                </Footer>
            </Layout>
        </>
    }
}