import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx"; // Import RegisterPage
import SigninPage from "./pages/SigninPage.jsx"; // Import SigninPage
import SignoutPage from "./pages/SignoutPage.jsx"; // Import SignoutPage
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Add route for RegisterPage */}
        <Route path="/signin" element={<SigninPage />} />{" "}
        {/* Add route for SigninPage */}
        <Route path="/signout" element={<SignoutPage />} />{" "}
        {/* Add route for SignoutPage */}
      </Routes>
    </Box>
  );
}

export default App;
