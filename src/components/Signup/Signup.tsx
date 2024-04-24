import React, { useState } from 'react';
import { Box, Stack, FormControl, FormLabel, Input, Button, Text, useToast, Flex, Heading, Icon, Link, Grid, GridItem } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from '../../api/LoginApi';
import { MdPerson } from 'react-icons/md'; // Icon for users

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast({
        position: 'top',
        title: "Successfully created user account",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate('/'); // Redirect to home after successful signup
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get('username') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phoneNo = formData.get('phoneNo') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

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

    mutation.mutate({ username, first_name: firstName, last_name: lastName, email, phone_no: phoneNo, password });
  };

  return (
    <Flex bg="white" p="6" flexDirection="column">
      <Box textAlign="center" mb="4">
        <Icon as={MdPerson} h="32px" w="32px" />
        <Heading pl="12px" fontSize="28px" onClick={() => navigate('/')} cursor="pointer">User Signup</Heading>
        <Text fontSize="2xl">Create an account</Text>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing="5">
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 4, md: 8 }}>
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
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                  />
                </FormControl>
              </GridItem>
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
                  <FormLabel htmlFor="phoneNo">Phone Number</FormLabel>
                  <Input
                    id="phoneNo"
                    type="tel"
                    name="phoneNo"
                    placeholder="Enter your phone number"
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
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
              <GridItem colSpan={2}>
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
            <Text textAlign="center">
              Already have an account?{' '}
              <Link as={NavLink} to="/login" color="primary.400" textDecoration="underline">
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
