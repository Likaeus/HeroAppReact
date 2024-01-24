import out from "../Services/heroService.tsx";
import { useEffect, useState } from "react";
import Hero from "../Models/HeroModel.tsx";

interface HeroListProps {}
const HeroList: React.FC<HeroListProps> = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await out.GetHeroes();
        setHeroes(response.data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div>
      <h2>Lista de Héroes</h2>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>{hero.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HeroList;
