import { Button, Container, Heading, VStack, useToast } from "@chakra-ui/react";
import React from "react";
import { useUserStore } from "../store/User";

const SignoutPage = () => {
  const toast = useToast();
  const { signout } = useUserStore();

  const handleSignout = async () => {
    const { success, message } = await signout();
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading size="2xl" textAlign="center">
          Are you sure you want to sign out?
        </Heading>
        <Button colorScheme="red" onClick={handleSignout} w="full">
          Sign Out
        </Button>
      </VStack>
    </Container>
  );
};

export default SignoutPage;
