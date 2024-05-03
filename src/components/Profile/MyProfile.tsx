import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getUser, updateUser } from "../../api/userApi"
import { User } from "../../types"
import { useEffect, useState } from "react"
import EditableTextInput from "../EditableTextInput"
import { AxiosError } from "axios"
import ChangePasswordModal from "./ChangePasswordModal"

export default function MyProfile() {
  const username = localStorage.getItem("username") ?? ""
  const { data } = useQuery<User>({
    queryKey: ["user", username],
    queryFn: () => getUser({ username }),
  })

  const [email, setEmail] = useState(data?.email ?? "")
  const [firstName, setFirstName] = useState(data?.first_name ?? "")
  const [lastName, setLastName] = useState(data?.last_name ?? "")
  // const [phoneNo, setPhoneNo] = useState(data?.phone_no ?? "")

  useEffect(() => {
    setEmail(data?.email ?? "")
    setFirstName(data?.first_name ?? "")
    setLastName(data?.last_name ?? "")
    // setPhoneNo(data?.phone_no ?? "")
  }, [data])

  const toast = useToast()

  const [isSaveLoading, setIsSaveLoading] = useState(false)

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast({
        position: "top",
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setIsSaveLoading(false)
    },
    onError: (res: AxiosError) => {
      toast({
        position: "top",
        title: res.response?.data
          ? `Error: ${Object.entries(res.response?.data)[0][1]}`
          : `Error: ${res.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsSaveLoading(false)
    },
  })

  const handleSubmit = () => {
    setIsSaveLoading(true)
    updateMutation.mutate({
      username,
      email,
      first_name: firstName,
      last_name: lastName,
    })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box w="100%">
      <Flex
        justifyContent="center"
        alignItems="center"
        bg="white"
        p="4"
        w="50%"
        mx="auto"
        mt="4"
        flexDir="column"
        gap="4"
        boxShadow="md"
        rounded="md"
      >
        <Heading mt="6" color="primary.900">
          Profile Details - {data?.username}
        </Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <EditableTextInput
            defaultValue={data?.email ?? ""}
            type="input"
            setText={setEmail}
          />
        </FormControl>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <EditableTextInput
            defaultValue={data?.first_name ?? ""}
            type="input"
            setText={setFirstName}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <EditableTextInput
            defaultValue={data?.last_name ?? ""}
            type="input"
            setText={setLastName}
          />
        </FormControl>
        {/* <FormControl>
          <FormLabel>Phone number</FormLabel>
          <EditableTextInput defaultValue = {data?.phone_no ?? ""} type = "input" setText = {setPhoneNo}/>
        </FormControl> */}
        <Flex gap="4">
          <Button colorScheme="green" onClick={onOpen}>
            Change Password
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSaveLoading}
          >
            Save
          </Button>
        </Flex>
        <ChangePasswordModal
          isOpen={isOpen}
          onClose={onClose}
          username={username}
        />
      </Flex>
    </Box>
  )
}
