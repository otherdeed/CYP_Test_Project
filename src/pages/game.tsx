import { useNavigate, useParams } from "react-router";
import { useGetGameQuery } from "../app/service/api";
import { Loader } from "../static/Loader";
import { BackButton } from "../components/BackButton";
import { EditOutlined } from "@ant-design/icons";
import { ErrorBlock } from "../components/ErrorBlock";
import { useEffect } from "react";
export const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: game, isLoading, isError, refetch } = useGetGameQuery(id!);
  const navigate = useNavigate()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return <ErrorBlock />
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="bg-gray-700 w-[300px] flex flex-col h-[500px] my-5 justify-center items-center rounded">
      <BackButton />
      <h2 className='text-center text-3xl font-bold'>{game.title}</h2>
      <p className='text-center text-xl'>Genre: {game.genre}</p>
      <p className='text-center text-xl'>Platform: {game.platform}</p>
      <p className='text-center text-xl'>Rating: {game.rating}</p>
      <p className='text-center text-xl'>Cover: {game.cover}</p>
      <p className='text-center text-xl'>Description: {game.description}</p>
      <div className="mt-10 bg-gray-300 h-[40px] w-[40px] flex items-center justify-center shadow rounded-full">
        <EditOutlined className="scale-125" onClick={() => navigate(`/edit/${id}`)} />
      </div>
    </div>
  );
};