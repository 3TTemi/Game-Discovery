import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/game-logo.webp";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize="60px" />
      <Text> NavBar </Text>
    </HStack>
  );
};

export default NavBar;
