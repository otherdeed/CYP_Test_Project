import { CloseOutlined } from '@ant-design/icons'
export const ErrorBlock = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='bg-red-500 shadow w-[50px] h-[50px] rounded-full flex justify-center'>
            <CloseOutlined className='scale-200' />
        </div>
        <h2 className='font-3xl'>Произошла неизвестная ошибка</h2>
    </div>
  )
}
