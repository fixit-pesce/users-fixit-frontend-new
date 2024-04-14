import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Avatar,
  Portal
} from "@chakra-ui/react";

import { NavLink, useNavigate } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { useRef } from "react";
import { logout } from "../../utils/user";

export default function Navbar() {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const firstFieldRef = useRef(null)

  const username = localStorage.getItem("username")

  return (
    <Box bg = "primary.900" py = "2">
      <Flex w = {{base: "100%", md: "80%"}} mx = "auto" alignItems = "center" position = "relative">
        <Flex justifyContent = {{base: "center", md: "flex-start"}} alignItems = "center"  gap = "2" onClick = {() => navigate("/")} _hover = {{cursor: "pointer"}} w = "100%">
          <Image src = "/logo.png" alt = "logo" h = "32px" w = "32px"/>
          <Heading color = "white">Fixit</Heading>
        </Flex>
        <Flex alignItems = "center" gap = "4" color = "white" fontWeight = "bold" display = {{base: "none", md: "flex"}}>
          <Link as = {NavLink} to = "/" _activeLink={{color: "secondary.400"}} _hover = {{color: "secondary.500"}}>Home</Link>
          <Link as = {NavLink} to = "/services" _activeLink={{color: "secondary.400"}} _hover = {{color: "secondary.500"}}>Services</Link>
          <Box>
            {username ?
              <Popover placement = "bottom-start">
                <PopoverTrigger>
                  <Avatar size = "sm"/>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody mx = "auto">
                      <Link
                        as = {NavLink}
                        to = "/profile"
                        display = "block"
                        py = "2"
                        _activeLink={{color: "primary.400"}}
                        _hover = {{color: "primary.500"}}
                        >My Profile
                      </Link>
                      <Button
                        bg = "primary.400"
                        _hover = {{bg: "primary.500"}}
                        color = "white"
                        onClick = {logout}
                        >Logout</Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
              :
              <Button
                bg = "secondary.400"
                color = "white"
                _hover = {{bg: "secondary.500"}}
                onClick = {() => navigate("/login")}
                >Login
              </Button>
            }
          </Box>
        </Flex>
        <IconButton
          ref = {btnRef}
          icon = {<TfiMenuAlt  />}
          onClick = {onOpen}
          color = "white"
          bg = "none"
          fontSize = "2xl"
          aria-label="nav menu"
          display = {{base: "inherit", md: "none"}}
          position = "absolute"
          right = "3"/>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg = "primary.100">
            <DrawerCloseButton />
            <DrawerHeader>Fixit</DrawerHeader>
            <DrawerBody flexDirection="column" textAlign = "center">
            <Box>
            {username ?
              <Popover placement = "bottom-start">
                <PopoverTrigger>
                  <Avatar size = "sm"/>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody mx = "auto">
                    <Link
                      as = {NavLink}
                      to = "/profile"
                      display = "block"
                      py = "2"
                      _activeLink={{color: "primary.400"}}
                      _hover = {{color: "primary.500"}}
                      >My Profile
                    </Link>
                    <Button
                      bg = "primary.400"
                      _hover = {{bg: "primary.500"}}
                      color = "white"
                      onClick = {logout}
                      >Logout</Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
              :
              <Button
                bg = "primary.400"
                my = "4"
                color = "white"
                _hover = {{bg: "primary.500"}}
                onClick = {() => navigate("/login")}
                >Login
                </Button>
              }
              </Box>
              <Link
                as = {NavLink}
                to = "/"
                display = "block"
                mb = "2"
                fontSize = "2xl"
                _activeLink={{color: "primary.400"}}
                _hover = {{color: "primary.500"}}
                >Home
              </Link>
              <Link
                as = {NavLink}
                to = "/services"
                display = "block"
                fontSize = "2xl"
                _activeLink={{color: "primary.400"}}
                _hover = {{color: "primary.500"}}
                >Services
              </Link>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}
