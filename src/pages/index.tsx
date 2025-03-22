import { useEffect } from "react"
import { Card } from "../components/Card"
import { useGetAllGamesQuery } from "../app/service/api"
import { Loader } from "../static/Loader";
import { ErrorBlock } from "../components/ErrorBlock";

export const IndexPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllGamesQuery();
  useEffect(() => {
    refetch()
  }, [refetch])
  if (isLoading){
    return (
          <div className="flex flex-col justify-center items-center">
            <Loader/>
          </div>
        )
  }
  if (isError) {
      return <ErrorBlock/>
  }
  return (
    <div className="flex gap-2 flex-wrap justify-center p-5">
      {data?.map(game => (
        <Card
          title={game.title}
          genre={game.genre}
          platform={game.platform}
          rating={game.rating}
          cover={game.cover}
          description={game.description}
          id={game.id}
          key={game.id}
        />
      ))}
    </div>
  )
}
