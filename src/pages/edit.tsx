import { useNavigate, useParams } from "react-router";
import { BackButton } from "../components/BackButton";
import { useGetGameQuery, useUpdateGameMutation } from "../app/service/api";
import { Input } from "../components/Input";
import { useState } from "react";
import { Loader } from "../static/Loader";
import { ErrorBlock } from "../components/ErrorBlock";
import { Button } from "../components/Button";

export const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: game, isLoading, isError } = useGetGameQuery(id!);
  const [updateGame, { isLoading: isUpdating }] = useUpdateGameMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: game?.title || "",
    genre: game?.genre || "",
    platform: game?.platform || "",
    rating: game?.rating || 0,
    cover: game?.cover || "",
    description: game?.description || "",
  });
  console.log(Number(formData.rating));


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
      await updateGame({
        id: id!,
        game: formData,
      }).unwrap();
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
          disabled={isUpdating}
          btnText={isUpdating ? "Обновление..." : "Обновить информацию"}
        />
        {error && <div className="h-8 px-2 flex items-center justify-center bg-red-500 text-white shadow rounded">{error}</div>}
      </form>
    </div>
  );
};