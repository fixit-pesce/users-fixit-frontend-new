import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { updatePassword } from '../../api/userApi'
import { AxiosError } from 'axios'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  username: string
}

export default function ChangePasswordModal({isOpen, onClose, username}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const toast = useToast()
  
  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast({
        position: "top",
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (res: AxiosError) => {
      toast({
        position: "top",
        title: res.response?.data ? `Error: ${Object.entries(res.response?.data)[0][1]}` : `Error: ${res.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })

  const handleSubmit = () => {
    mutation.mutate({username, current_password: currentPassword, new_password: newPassword})
    setCurrentPassword("")
    setNewPassword("")
    onClose()
  }

  return (
    <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="current-password">Current Password</FormLabel>
            <Input id="current-password" value = {currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="new-password">New Password</FormLabel>
            <Input id="new-password" value = {newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center" gap = "4">
          <Button onClick={handleSubmit} colorScheme="blue">Submit</Button>
          <Button onClick={onClose} colorScheme='red'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
