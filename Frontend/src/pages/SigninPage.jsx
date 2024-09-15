import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useUserStore } from "../store/User";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const toast = useToast();
  const { signin } = useUserStore();
  const navigate = useNavigate();

  const handleSignin = async () => {
    const { success, message } = await signin(signinData);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      navigate("/");
      setSigninData({ email: "", password: "" });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading size="2xl" textAlign="center">
          Signin
        </Heading>
        <Box w="full" p={6} rounded="lg" shadow="md">
          <VStack spacing={4}>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={signinData.email}
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={signinData.password}
              onChange={handleChange}
            />
            <Button colorScheme="blue" onClick={handleSignin} w="full">
              Signin
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default SigninPage;
