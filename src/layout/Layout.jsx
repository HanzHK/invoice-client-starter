import React from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const NavLink = ({ to, children }) => (
    <Button
      as={Link}
      to={to}
      variant="ghost"
      colorScheme="whiteAlpha"
      fontWeight={isActive(to) ? "bold" : "medium"}
      borderBottom={isActive(to) ? "2px solid" : "none"}
      borderRadius="0"
      _hover={{ bg: "whiteAlpha.200" }}
    >
      {children}
    </Button>
  );

  const MobileNavLink = ({ to, children, onClick }) => (
    <Button
      as={Link}
      to={to}
      onClick={onClick}
      variant="ghost"
      w="full"
      justifyContent="flex-start"
      fontWeight={isActive(to) ? "bold" : "medium"}
      bg={isActive(to) ? "teal.50" : "transparent"}
      color={isActive(to) ? "teal.700" : "gray.700"}
      _hover={{ bg: "teal.50" }}
    >
      {children}
    </Button>
  );

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      {/* Header */}
      <Box
        bg="linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)"
        color="white"
        py={4}
        boxShadow="md"
      >
        <Container maxW="7xl">
          <Flex justify="space-between" align="center">
            <Heading size="lg" fontWeight="bold" letterSpacing="tight">
              📄 Invoice Manager
            </Heading>

            {/* Desktop Navigation */}
            <HStack spacing={1} display={{ base: "none", md: "flex" }}>
              <NavLink to="/persons">Osoby</NavLink>
              <NavLink to="/invoices">Faktury</NavLink>
            </HStack>

            {/* Mobile Menu Button */}
            <IconButton
              icon={<HamburgerIcon />}
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              variant="ghost"
              colorScheme="whiteAlpha"
              aria-label="Open menu"
            />
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody p={4}>
            <VStack spacing={2} align="stretch">
              <MobileNavLink to="/persons" onClick={onClose}>
                Osoby
              </MobileNavLink>
              <MobileNavLink to="/invoices" onClick={onClose}>
                Faktury
              </MobileNavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Container maxW="7xl" flex="1" py={8}>
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="sm"
          p={{ base: 4, md: 8 }}
          minH="500px"
        >
          {children}
        </Box>
      </Container>

      {/* Footer */}
      <Box
        bg="gray.800"
        color="gray.400"
        py={6}
        mt="auto"
        borderTop="1px"
        borderColor="gray.700"
      >
        <Container maxW="7xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text fontSize="sm">© 2025 Jan Kubíček. All rights reserved.</Text>
            <HStack spacing={4} fontSize="sm">
              <Text cursor="pointer" _hover={{ color: "white" }}>
                Podmínky
              </Text>
              <Divider orientation="vertical" h="4" />
              <Text cursor="pointer" _hover={{ color: "white" }}>
                Kontakt
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;