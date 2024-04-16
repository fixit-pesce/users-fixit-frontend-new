import { Box, Heading, Stat, StatGroup, StatLabel, StatNumber, useDisclosure, Text, Spacer, Button } from "@chakra-ui/react";
import {  Service } from "../../types";
import {  getService } from "../../api/ServicesApi";
import { useQuery } from "@tanstack/react-query";
import BookServiceModal from "./BookServiceModal";


interface ServiceInformationProps{
  sp_username: string
  service_name: string
}


export default function ServiceInformation({sp_username, service_name}: ServiceInformationProps){
  const {data} = useQuery<Service>({
    queryKey: ["services", sp_username, service_name],
    queryFn: () => getService({sp_username, service_name})
  })

  const {isOpen, onOpen, onClose} = useDisclosure()

  const token = localStorage.getItem("token")

  return (
    <Box>
      <StatGroup textAlign = "center" my = "6">
        <Stat>
          <StatLabel>Price</StatLabel>
          <StatNumber>₹ {data?.price}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Average Rating</StatLabel>
          <StatNumber>{data?.avg_rating}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Bookings</StatLabel>
          <StatNumber>{data?.total_bookings}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Reviews</StatLabel>
          <StatNumber>{data?.total_reviews}</StatNumber>
        </Stat>
      </StatGroup>
      <Box>
        <Heading fontSize = "lg" mb = "2">Category</Heading>
        <Text>{data?.category}</Text>
        <Spacer h = "4"/>
        <Heading fontSize = "lg" mb = "2">Product Description</Heading>
        <Text>
          {data?.description}
        </Text>
      </Box>
      <Box textAlign = "center" mt = "4">
        <Button
          bg = "primary.400"
          color = "white"
          _hover = {{bg: "primary.500"}}
          isDisabled = {token ? false : true}
          title = {token ? 'Book service' : 'Log in to book service'}
          onClick = {onOpen}
          >
          Book Service
        </Button>
      </Box>
      {data &&
      <BookServiceModal
        isOpen = {isOpen}
        onClose = {onClose}
        service = {{
          service_name: data.name,
          company_name: data.spCompanyName,
          price: data.price,
          category: data.category
        }}
        sp_username={sp_username}
      />}
    </Box>
  )
}