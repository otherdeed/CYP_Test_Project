import { useNavigate, useParams } from "react-router";
import { BackButton } from "../components/BackButton";
import { useGetGameQuery } from "../app/service/api";
import { Input } from "../components/Input";
import { useState } from "react";
import { Loader } from "../static/Loader";
import { ErrorBlock } from "../components/ErrorBlock";
import { Button } from "../components/Button";
import type { GameData } from "../types/game.type";

export const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: game, isLoading, isError } = useGetGameQuery(id!);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const mergeGame = (game : GameData | undefined) : GameData | undefined =>{
      const localGame = localStorage.getItem(game!.id.toString());
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
    const [formData, setFormData] = useState({
      title: mergeGame(game)?.title || "",
      genre: mergeGame(game)?.genre || "",
      platform: mergeGame(game)?.platform || "",
      rating: mergeGame(game)?.rating || 0,
      cover: mergeGame(game)?.cover || "",
      description: mergeGame(game)?.description || "",
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isNaN(Number(formData.rating)) ) {
      setError("Рейтинг должен быть числом");
      return;
    }
    const requiredFields: (keyof typeof formData)[] = [
      "title",
      "genre",
      "platform",
      "rating",
      "cover",
      "description",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Поле "${field}" не может быть пустым`);
        return;
      }
    }
    try {
      localStorage.setItem(`${id}`, JSON.stringify(formData))
      navigate(-1)
    } catch (error) {
      setError("Ошибка при редактировании данных");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ErrorBlock />;
  }

  return (
    <div className="p-4">
      <BackButton />
      <form className="space-y-4 flex flex-col justify-center items-center">
        <div>
          <p>Title</p>
          <Input
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Genre</p>
          <Input
            name="genre"
            value={formData.genre}
            placeholder="Genre"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Platform</p>
          <Input
            name="platform"
            value={formData.platform}
            placeholder="Platform"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Rating</p>
          <Input
            name="rating"
            value={formData.rating}
            placeholder="Rating"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Cover</p>
          <Input
            name="cover"
            value={formData.cover}
            placeholder="Cover"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Description</p>
          <Input
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleInputChange}
          />
        </div>
        <Button
          onClick={handleSubmit}
          btnText="Обновить информацию"
        />
        {error && <div className="h-8 px-2 flex items-center justify-center bg-red-500 text-white shadow rounded">{error}</div>}
      </form>
    </div>
  );
};