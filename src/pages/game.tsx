import { useNavigate, useParams } from "react-router";
import { useGetGameQuery } from "../app/service/api";
import { Loader } from "../static/Loader";
import { BackButton } from "../components/BackButton";
import { EditOutlined } from "@ant-design/icons";
import { ErrorBlock } from "../components/ErrorBlock";
import { useEffect } from "react";
import type { GameData } from "../types/game.type";
export const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: game, isLoading, isError, refetch } = useGetGameQuery(id!);
  const navigate = useNavigate()
  useEffect(() => {
    refetch()
  }, [refetch])
  const mergeGame = (game : GameData) : GameData =>{
    const localGame = localStorage.getItem(game.id.toString());
    if(localGame){
      const mergedGame = {
        ...game,
        ...JSON.parse(localGame),
        id: id,
      };
      return mergedGame;
    } else{
      return game
    }
  }
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
      <h2 className='text-center text-3xl font-bold'>{mergeGame(game).title}</h2>
      <p className='text-center text-xl'>Genre: {mergeGame(game).genre}</p>
      <p className='text-center text-xl'>Platform: {mergeGame(game).platform}</p>
      <p className='text-center text-xl'>Rating: {mergeGame(game).rating}</p>
      <p className='text-center text-xl'>Cover: {mergeGame(game).cover}</p>
      <p className='text-center text-xl'>Description: {mergeGame(game).description}</p>
      <div className="mt-10 bg-gray-300 h-[40px] w-[40px] flex items-center justify-center shadow rounded-full">
        <EditOutlined className="scale-125" onClick={() => navigate(`/edit/${id}`)} />
      </div>
    </div>
  );
};