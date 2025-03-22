import { useNavigate } from "react-router"
import type { GameData } from "../../types/game.type"

export const Card = ({ title, genre, platform, rating, cover, description, id }: GameData) => {
  const navigate = useNavigate()
  return (
    <div
      className='w-[300px] h-[400px] rounded flex flex-col justify-center bg-gray-700 cursor-pointer hover:scale-102 transtion-all duration-500'
      onClick={() => navigate(`/game/${id}`)}
    >
      <h2 className='text-center text-3xl font-bold'>{title}</h2>
      <p className='text-center text-xl'>Genre: {genre}</p>
      <p className='text-center text-xl'>Platform: {platform}</p>
      <p className='text-center text-xl'>Rating: {rating}</p>
    </div>
  )
}
