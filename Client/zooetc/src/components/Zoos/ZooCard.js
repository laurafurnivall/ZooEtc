import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function ZooCard({ zoo: {id, zooName, location, zooUrl}, userProfile, showConfirm }) {
    const navigate = useNavigate();

    return <>
        <tr>
            <td scope="row">
                {zooName}
            </td>
            <td>
                {location}
            </td>
            <td>
                <Link
                    href={zooUrl}
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(zooUrl, '_blank');
                    }}
                >
                    {zooUrl}
                </Link>
            </td>
            <td>
            <Space>
            <InfoCircleOutlined
              style={{ fontSize: '16px' }}
              onClick={() => {
                navigate(`./${id}`);
              }}
            />
            {userProfile && userProfile.isAdmin === true ? (
              <Space>
                <EditOutlined 
                style={{ fontSize: '16px' }} 
                onClick={() => {
                    navigate(`./Update/${id}`);
                  }}/>
                <DeleteOutlined 
                style={{ fontSize: '16px' }} 
                onClick={() => {showConfirm(id)}} 
                />
              </Space>
            ) : null}
          </Space>
            </td>
        </tr>
    </>
}

