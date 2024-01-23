import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

const GameGrid = () => {
  // Component should only be responsible for returning markup and repsonding to userEvents, seperation of code
  const { games, error } = useGames();

  const handleUpdateGame = async (gameName: string): Promise<string> => {
    const response = await fetch(
      `http://localhost:8000/game-updates/${gameName}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.update_text;
    } else {
      console.error("Error fetching game updates");
      return ""; // return an empty string, thus not updating the frontend
    }
  };

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} padding="10px" spacing={10}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
