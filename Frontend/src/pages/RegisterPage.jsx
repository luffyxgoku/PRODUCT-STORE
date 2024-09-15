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
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/User";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const toast = useToast();
  const { register } = useUserStore();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { success, message } = await register(registerData);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      setRegisterData({ fullName: "", email: "", password: "" });
      navigate("/signin");
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
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading size="2xl" textAlign="center">
          Register
        </Heading>
        <Box w="full" p={6} rounded="lg" shadow="md">
          <VStack spacing={4}>
            <Input
              placeholder="Full Name"
              type="text"
              name="fullName"
              value={registerData.fullName}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
            <Button colorScheme="blue" onClick={handleRegister} w="full">
              Register
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
