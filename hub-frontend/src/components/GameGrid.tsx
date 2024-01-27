import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import apiClient from "../services/api-client";

const GameGrid = () => {
  // Component should only be responsible for returning markup and repsonding to userEvents, seperation of code
  const { games, error } = useGames();

  const handleUpdateGame = async (gameName: string): Promise<string> => {
    try {
      const response = await apiClient.get(
        `/game-updates/${encodeURIComponent(gameName)}`
      );
      return response.data.update_text;
    } catch (error) {
      console.error("Error fetching game updates: ", error);
      return ""; // return an empty string, thus not updating the frontend
    }
  };

  const handleSummaryGame = async (gameName: string): Promise<string> => {
    try {
      const response = await apiClient.get(
        `/game-summary/${encodeURIComponent(gameName)}`
      );
      return response.data.summary_text;
    } catch (error) {
      console.error("Error fetching game summaries: ", error);
      return ""; // return an empty string, thus not updating the frontend
    }
  };

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} padding="10px" spacing={10}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            updateClick={() => handleUpdateGame(game.name)}
            summaryClick={() => handleSummaryGame(game.name)}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
