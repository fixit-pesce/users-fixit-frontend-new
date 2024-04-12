import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box bg = "primary.900" p = "2">
      <Flex justifyContent="space-between" w = "80%" mx = "auto" alignItems = "center">
        <Flex>
          <Heading color = "white">Fixit</Heading>
        </Flex>
        <Flex alignItems = "center" gap = "4" color = "white" fontWeight = "bold">
          <NavLink to = "/" >Home</NavLink>
          <NavLink to = "/services">Services</NavLink>
          <Box>
            <Button bg = "secondary.400" color = "white" _hover = {{bg: "secondary.500"}}>Login</Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
