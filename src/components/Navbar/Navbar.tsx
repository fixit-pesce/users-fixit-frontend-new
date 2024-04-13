import { Box, Button, Flex, Heading, Link, Image } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <Box bg = "primary.900" p = "2">
      <Flex justifyContent="space-between" w = "80%" mx = "auto" alignItems = "center">
        <Flex alignItems = "center" gap = "2" onClick = {() => navigate("/")} _hover = {{cursor: "pointer"}}>
          <Image src = "/logo.png" alt = "logo" h = "32px" w = "32px"/>
          <Heading color = "white">Fixit</Heading>
        </Flex>
        <Flex alignItems = "center" gap = "4" color = "white" fontWeight = "bold">
          <Link as = {NavLink} to = "/" _activeLink={{color: "secondary.400"}} _hover = {{color: "secondary.500"}}>Home</Link>
          <Link as = {NavLink} to = "/services" _activeLink={{color: "secondary.400"}} _hover = {{color: "secondary.500"}}>Services</Link>
          <Box>
            <Button bg = "secondary.400" color = "white" _hover = {{bg: "secondary.500"}} onClick = {() => navigate("/login")}>Login</Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
