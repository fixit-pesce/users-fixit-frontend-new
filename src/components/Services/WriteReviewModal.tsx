import {
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { writeReview } from "../../api/ServicesApi"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

interface WriteReviewModalProps {
  isOpen: boolean
  onClose: () => void
  service_name: string
  sp_username: string
  username: string
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  service_name,
  sp_username,
  username,
}: WriteReviewModalProps) {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(1)

  const toast = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: writeReview,
    onSuccess: () => {
      toast({
        title: "Review submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      queryClient.invalidateQueries({
        queryKey: ["services", sp_username, service_name, "reviews"],
      })
      onClose()
    },
    onError: (res: AxiosError) => {
      toast({
        title: res.response?.data
          ? `Error: ${Object.entries(res.response?.data)[0][1]}`
          : `Error: ${res.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    },
  })

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating cannot be 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

    if (review === "") {
      toast({
        title: "Review cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

    if (rating < 1 && rating > 5) {
      toast({
        title: "Rating must be between 1 and 5",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

    mutation.mutate({
      username,
      sp_username,
      service_name,
      rating,
      description: review,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Write Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <NumberInput
              value={rating}
              min={1}
              max={5}
              onChange={(v) => setRating(Number(v))}
              keepWithinRange
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Review</FormLabel>
            <Textarea
              placeholder="Enter review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center" gap="4">
          <Button colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
