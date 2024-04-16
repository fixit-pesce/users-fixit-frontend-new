import React, { useState } from 'react';
import { Box, Stack, FormControl, FormLabel, Input, Button, Text, useToast, Grid, GridItem, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from '../../api/LoginApi';
import { MdHandyman } from 'react-icons/md';

export default function Signup() {
  const [isLoading , setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      toast({
        position: 'top',
        title: "Sucessfully created service provider",
        status: 'success',
        duration: 3000,
        isClosable: true
      })      
      navigate('/');
      setIsLoading(false);
    },
    onError: (error) => {
      toast({
        position: "top",
        title: error.response?.data ? `Error: ${Object.entries(error.response.data)[0][1]}` : `Error: ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const companyName = formData.get('companyName') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!username.startsWith("sp-")) {
      toast({
        position: "top",
        title: "Error",
        description: "Username must start with 'sp-'",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    // Add validation logic here if needed
    if (password !== confirmPassword) {
      toast({
        position: "top",
        title: "Error",
        description: "Passwords do not match",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    mutation.mutate({ username, email, company_name: companyName, password });
  };

  return (
    <Flex bg="white" p="6" flexDirection="column">
      <Box textAlign = "center" mb = "4">
        <Icon as={MdHandyman} h = "32px" w = "32px"/>
        <Heading pl = "12px" fontSize = "28px" onClick = {() => navigate('/')} cursor = "pointer">Fixit - Service Providers</Heading>
        <Text fontSize = "2xl">Create an account</Text>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing="5">
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 4, md: 8 }}>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <FormControl>
                  <FormLabel htmlFor="companyName">Company Name</FormLabel>
                  <Input
                    id="companyName"
                    type="text"
                    name="companyName"
                    placeholder="Enter your company name"
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <Text
              textAlign = "center">
                {`Already have an account? `}
                <Link
                  as = {NavLink}
                  to = "/"
                  color = "primary.400"
                  textDecoration = "underline">
                    Log in
                </Link>
            </Text>
            <Button
              bg="primary.400"
              color="white"
              _hover={{ bg: "primary.500" }}
              type="submit"
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}