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
  useToast,
  Box,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Image,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { bookService } from "../../api/ServicesApi"
import { AxiosError } from "axios"

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

export default function BookServiceModal({
  isOpen,
  onClose,
  sp_username,
  service,
}: BookServiceModalProps) {
  const [phone, setPhone] = useState("")
  const [pinInputs, setPinInputs] = useState(Array(16).fill(""))
  const [paymentMethod, setPaymentMethod] = useState<
    "Cash On Delivery" | "Card" | "UPI"
  >("Cash On Delivery")

  const [isLoading, setIsLoading] = useState(false)

  const username = localStorage.getItem("username") ?? ""

  const queryClient = useQueryClient()
  const toast = useToast()

  const handlePinChange = (index: number, value: string) => {
    const newPinInputs = [...pinInputs]
    newPinInputs[index] = value
    setPinInputs(newPinInputs)
  }

  const handlePaymentMethodChange = (
    value: "Cash On Delivery" | "Card" | "UPI"
  ) => {
    setPaymentMethod(value)
  }

  const mutation = useMutation({
    mutationFn: bookService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services", sp_username, "bookings"],
      })
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
        title: res.response?.data
          ? `Error: ${Object.entries(res.response?.data)[0][1]}`
          : `Error: ${res.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
      onClose()
    },
  })

  const isNumeric = (value: string) => {
    return /^\d+$/.test(value)
  }

  const handleBooking = () => {
    setIsLoading(true)

    if (phone === "") {
      toast({
        title: "Phone no cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })

      if (isNumeric(phone) === false) {
        toast({
          title: "Invalid phone no",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        })
      }

      if (phone.length != 10) {
        toast({
          title: "Invalid phone no",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        })
      }

      setIsLoading(false)
      return
    }

    if (paymentMethod === "Card") {
      if (pinInputs.join("") === "") {
        toast({
          title: "Pin cannot be empty",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        })
        setIsLoading(false)
        return
      }
    }

    mutation.mutate({
      sp_username,
      service_name: service.service_name,
      company_name: service.company_name,
      username: username,
      category: service.category,
      price: service.price,
      phone_no: phone,
      payment_method: {
        type: paymentMethod,
        card_no: pinInputs.join(""),
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Booking Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="2" flexDir="column">
            <Text>
              <b>Service Name: </b> {service.service_name}
            </Text>
            <Text>
              <b>Service Provider:</b> {service.company_name}
            </Text>
            <Text>
              <b>Category:</b> {service.category}
            </Text>
            <Text>
              <b>Price:</b> {service.price}
            </Text>
            <Spacer h="2" />
            <FormControl>
              <FormLabel>Phone number</FormLabel>
              <Input
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FormControl>
            <Spacer h="2" />
          </Flex>
          <Box>
            <Heading fontSize="lg" my="4">
              Payment Option
            </Heading>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <Stack spacing="5" direction="column">
                <Radio value="Cash On Delivery">Cash On Delivery</Radio>
                <Radio value="Card">Card</Radio>
                <Flex gap="4">
                  {pinInputs.map((pinInput, index) => (
                    <HStack key={index}>
                      <PinInput otp>
                        <PinInputField
                          value={pinInput}
                          onChange={(e) =>
                            handlePinChange(index, e.target.value)
                          }
                        />
                      </PinInput>
                    </HStack>
                  ))}
                </Flex>
                <Radio value="UPI">UPI Payment</Radio>
                <Image src="/src/assets/qrcode.png" alt="UPI" boxSize="300px" />
              </Stack>
            </RadioGroup>
          </Box>
          <Text fontWeight="bold" textAlign="center">
            Are you are you want to book this service?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" gap="4">
          <Button
            colorScheme="blue"
            onClick={handleBooking}
            isLoading={isLoading}
          >
            Book Service
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
