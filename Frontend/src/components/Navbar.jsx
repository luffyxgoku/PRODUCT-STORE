import React from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useUserStore } from "../store/User";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signout } = useUserStore();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignout = async () => {
    const { success, message } = await signout();
    if (success) {
      navigate("/signin");
    }
    toast({
      title: success ? "Signed out" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  // Extract the first name from the fullName
  const getFirstName = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    return nameParts[0];
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>

          {!user ? (
            <>
              <Link to={"/register"}>
                <Button colorScheme="blue">Register</Button>
              </Link>
              <Link to={"/signin"}>
                <Button colorScheme="blue">Signin</Button>
              </Link>
            </>
          ) : (
            <HStack spacing={4}>
              <Text fontSize="lg">Welcome, {getFirstName(user.fullName)}!</Text>
              <Button colorScheme="blue" onClick={handleSignout}>
                Signout
              </Button>
            </HStack>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
