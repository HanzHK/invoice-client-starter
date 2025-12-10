import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./MainContent";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </Flex>
  );
};

export default Layout;