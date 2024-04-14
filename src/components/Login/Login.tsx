import {
  Card,
  Center,
  Icon,
  Heading,
  Divider,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";

import { AxiosError } from "axios";

import {jwtDecode} from "jwt-decode"

import { MdHandyman } from "react-icons/md";
import { PasswordField } from "./PasswordField";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/LoginApi";

import { BaseSyntheticEvent } from "react";

import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
const [isLoading , setIsLoading] = useState(false)

const toast = useToast()
const navigate = useNavigate()

const mutation = useMutation({
  mutationFn: loginUser,
  onSuccess: (data: {access_token: string, token_type: string}) => {
    localStorage.setItem('token', data.access_token)
    const decoded: any = jwtDecode(data.access_token)
    localStorage.setItem('username', decoded["username"])
    navigate('/profile')
    setIsLoading(false)
  },
  onError: (res: AxiosError) => {
    toast({
      position: "top",
      title: res.response?.data ? `Error: ${Object.entries(res.response?.data)[0][1]}` : `Error: ${res.message}`,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false)
  }
})

const handleSubmit = (e: BaseSyntheticEvent) => {
  e.preventDefault()
  setIsLoading(true)
  const username = e.target.form[0].value
  const password = e.target.form[2].value
  mutation.mutate({username, password})
}

return (
  <Card maxW="md" p = {8} bg = "foreground" boxShadow="lg" m = {4}>
    <Stack spacing = {4}>
      <Center>
        <Icon as={MdHandyman} h = "32px" w = "32px"/>
        <Heading pl = "12px" fontSize = "28px" onClick = {() => navigate('/')} cursor = "pointer">Fixit - Users</Heading>
      </Center>
      <Heading textAlign="center">Login to your account</Heading>
      <Divider orientation='horizontal' borderColor = "black"/>
      <form>
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              placeholder="Enter your username"
              required
            />
          </FormControl>
          <PasswordField
            placeholder="Enter your password"
          />
          <Box textAlign = "center">
            <Text>Don't have an account? <Link as = {NavLink} to = "/signup" color = "primary.400" textDecoration = "underline">Sign Up.</Link></Text>
          </Box>
          <Button
            bg = "primary.400"
            color= "white"
            _hover={{bg: "primary.500"}}
            type = "submit"
            onClick={(e) => handleSubmit(e)}
            isLoading = {isLoading}
            >Login
          </Button>
        </Stack>
      </form>
    </Stack>
  </Card>
)
}