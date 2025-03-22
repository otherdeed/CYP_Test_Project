import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
export const BackButton = () => {
    const navigate = useNavigate()
    return (
        <button className=' rounded-xl w-[50px] h-[50px] bg-gray-500 absolute top-5 left-2' onClick={() => navigate(-1)}>
            <LeftOutlined />
        </button>
    )
}
