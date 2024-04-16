import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Button,
  ModalCloseButton,
  Spacer,
  FormControl,
  Input,
  FormLabel,
  useToast
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { bookService } from '../../api/ServicesApi'
import { AxiosError } from 'axios'


interface BookServiceModalProps {
  isOpen: boolean
  onClose: () => void
  sp_username: string
  service: {
    service_name: string
    company_name: string
    category: string
    price: number
  }
}


export default function BookServiceModal({isOpen, onClose, sp_username, service}: BookServiceModalProps) {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()
  const toast = useToast()

  const mutation = useMutation({
    mutationFn: bookService,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["services", sp_username, "bookings"]})
      toast({
        title: "Booked service successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      onClose()
    },
    onError: (res: AxiosError) => {
      toast({
        title: res.response?.data ? `Error: ${Object.entries(res.response?.data)[0][1]}` : `Error: ${res.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      onClose()
    }
  })

  const handleBooking = () => {
    setIsLoading(true)

    if (phone === ""){
      toast({
        title: "Phone no cannot be empty",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      })
      return
    }

    mutation.mutate({
      sp_username,
      service_name: service.service_name,
      company_name: service.company_name,
      category: service.category,
      price: service.price,
      phone_no: phone
    })
  }
  
  return (
    <Modal isOpen = {isOpen} onClose={onClose} size = "2xl">
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          Booking Information
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text><b>Service Name: </b> {service.service_name}</Text>
          <Text><b>Service Provider:</b> {service.company_name}</Text>
          <Text><b>Category:</b> {service.category}</Text>
          <Text><b>Price:</b> {service.price}</Text>
          <Spacer h = "2"/>
          <FormControl>
            <FormLabel>Phone number</FormLabel>
            <Input placeholder = "Enter phone number" value = {phone} onChange = {(e) => setPhone(e.target.value)} required/>
          </FormControl>
          <Spacer h = "2"/>
          <Text fontWeight="bold" textAlign="center">Are you are you want to book this service?</Text>
        </ModalBody>
        <ModalFooter justifyContent="center" gap = "4">
          <Button colorScheme='blue' onClick = {handleBooking} isLoading = {isLoading}>Book Service</Button>
          <Button colorScheme = "red" onClick = {onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
