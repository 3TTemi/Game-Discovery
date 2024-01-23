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

interface Props {
  game: Game;
  updateClick: () => void;
}

// On click of button reload the Game Grid class with the desired input

const GameCard = ({ game, updateClick }: Props) => {
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
          <Button onClick={updateClick}>Latest Update</Button>
        </HStack>
        {/* <Text>{game.update_text}</Text> */}
      </CardBody>
    </Card>
  );
};

export default GameCard;
