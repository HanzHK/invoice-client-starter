import React from "react";
import {
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
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

// Desktop link komponenta
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button
      as={Link}
      to={to}
      variant="ghost"
      color="white"
      fontWeight={isActive ? "bold" : "medium"}
      borderBottom={isActive ? "3px solid white" : "3px solid transparent"}
      borderRadius="md"
      px={6}
      _hover={{ 
        bg: "whiteAlpha.300",
        transform: "translateY(-2px)",
        transition: "all 0.2s"
      }}
      _active={{ transform: "translateY(0)" }}
    >
      {children}
    </Button>
  );
};

// Mobile link komponenta
const MobileNavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button
      as={Link}
      to={to}
      onClick={onClick}
      variant="ghost"
      w="full"
      justifyContent="flex-start"
      fontWeight={isActive ? "bold" : "medium"}
      bg={isActive ? "teal.50" : "transparent"}
      color={isActive ? "teal.700" : "gray.700"}
      _hover={{ bg: "teal.50" }}
    >
      {children}
    </Button>
  );
};

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Definice menu položek na jednom místě
  const menuItems = [
    { to: "/persons", label: "Osoby" },
    { to: "/invoices", label: "Faktury" },
    { to: "/statistics", label: "Statistiky" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <HStack spacing={2} display={{ base: "none", md: "flex" }}>
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </HStack>

      {/* Mobile Menu Button */}
      <IconButton
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="ghost"
        colorScheme="whiteAlpha"
        aria-label="Open menu"
        size="lg"
      />

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody p={4}>
            <VStack spacing={2} align="stretch">
              {menuItems.map((item) => (
                <MobileNavLink key={item.to} to={item.to} onClick={onClose}>
                  {item.label}
                </MobileNavLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;