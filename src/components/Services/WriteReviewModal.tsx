import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react'
import { useState } from 'react'


interface WriteReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WriteReviewModal({isOpen, onClose}: WriteReviewModalProps) {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)

  return (
    <Modal isOpen = {isOpen} onClose = {onClose} size = "2xl">
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          Write Review
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Input placeholder="Enter rating" value = {rating} onChange = {(e) => setRating(parseInt(e.target.value))}/>
          </FormControl>
          <FormControl>
            <FormLabel>Review</FormLabel>
            <Textarea placeholder="Enter review" value = {review} onChange = {(e) => setReview(e.target.value)}/>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center" gap = "4">
          <Button colorScheme='blue'>Submit</Button>
          <Button colorScheme = "red" onClick = {onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
