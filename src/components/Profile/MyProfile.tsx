import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/userApi";
import { User } from "../../types";
import { useState } from "react";

export default function MyProfile() {
  const username = localStorage.getItem("username") ?? ""
  const {data} = useQuery<User>({
    queryKey: ["user", username],
    queryFn: () => getUser({username})
  })

  const [email, setEmail] = useState(data?.email)
  const [firstName, setFirstName] = useState(data?.first_name)
  const [lastName, setLastName] = useState(data?.last_name)

  
  
  return (
    <Box  w = "100%">
      <Flex
        justifyContent="center"
        alignItems = "center"
        bg = "white"
        p = "4"
        w = "50%"
        mx = "auto"
        mt = "4"
        flexDir = "column"
        gap = "4"
        boxShadow = "md"
        rounded = "md"
        >
        <Heading mt = "6" color = "primary.900">My Profile</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Text>{username}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </FormControl>
        <Button colorScheme='blue'>Save</Button>
      </Flex>
    </Box>
  )
}
