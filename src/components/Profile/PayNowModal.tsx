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
  // FormControl,
  // Input,
  // FormLabel,
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
  useToast,
} from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useCompletePaymentMutation } from "../../api/ServicesApi"

export default function PayNowModal({
  isOpen,
  onClose,
  service_name,
  company_name,
  category,
  price,
  booking_id,
}: {
  isOpen: boolean
  onClose: () => void
  service_name: string
  company_name: string
  category: string
  price: number
  booking_id: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [pinInputs, setPinInputs] = useState(Array(16).fill(""))

  const queryClient = useQueryClient()
  const toast = useToast()

  const handlePinChange = (index: number, value: string) => {
    const newPinInputs = [...pinInputs]
    newPinInputs[index] = value
    setPinInputs(newPinInputs)
  }

  const [paymentMethod, setPaymentMethod] = useState<
    "Cash" | "Card" | "UPI" | "Pay after service"
  >("Cash")

  const handlePaymentMethodChange = (value: "Cash" | "Card" | "UPI") => {
    setPaymentMethod(value)
  }

  const paymentMutation = useCompletePaymentMutation()

  const handlePayment = () => {
    setIsLoading(true)

    paymentMutation.mutate(
      {
        booking_id,
        type: paymentMethod,
        card_no: pinInputs.join(""),
        status: "PAID",
      },
      {
        onSuccess: () => {
          toast({
            position: "top",
            title: "Payment successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          queryClient.invalidateQueries({ queryKey: ["bookings"] })
          onClose()

          setIsLoading(false)
        },
        onError: (error) => {
          toast({
            position: "top",
            title: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="2" flexDir="column">
            <Text>
              <b>Service Name: </b> {service_name}
            </Text>
            <Text>
              <b>Service Provider:</b> {company_name}
            </Text>
            <Text>
              <b>Category:</b> {category}
            </Text>
            <Text>
              <b>Price:</b> {price}
            </Text>
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
                <Radio value="Cash">Cash</Radio>
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
                <Image
                  src="/src/assets/qr-code.png"
                  alt="UPI"
                  boxSize="300px"
                />
              </Stack>
            </RadioGroup>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center" gap="4">
          <Button
            colorScheme="green"
            onClick={handlePayment}
            isLoading={isLoading}
          >
            Pay
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
