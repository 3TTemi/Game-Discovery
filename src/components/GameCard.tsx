import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import { useState } from "react";

interface Props {
  game: Game;
  updateClick: () => Promise<string>;
}

const GameCard = ({ game, updateClick }: Props) => {
  const [updateText, setUpdateText] = useState<string>("");

  const handleUpdateClick = async () => {
    const update = await updateClick();
    setUpdateText(update);
  };

  return (
    <Card borderRadius={15} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        <HStack justifyContent="space-between">
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <HStack paddingTop={3} justifyContent="center">
          <Button>Game Summary</Button>
          <Button onClick={handleUpdateClick}>Latest Update</Button>
        </HStack>
        {updateText && <Text paddingTop={3}>{updateText}</Text>}
      </CardBody>
    </Card>
  );
};

export default GameCard;
