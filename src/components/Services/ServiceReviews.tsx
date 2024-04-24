import { useQuery } from "@tanstack/react-query"
import { Review } from "../../types"
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { getServiceReviews } from "../../api/ServicesApi"
import RatingDisplay from "./RatingDisplay"
import WriteReviewModal from "./WriteReviewModal"

const convertDate = (dateString: string) => {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  const formattedDate = date.toLocaleString('en-US', options)
  return formattedDate
}


interface ServiceReviewsProps {
  sp_username: string
  service_name: string
}

export default function ServiceReviews({sp_username, service_name}: ServiceReviewsProps) {
  const {data} = useQuery<[Review]>({
    queryKey: ["services", sp_username, service_name, "reviews"],
    queryFn: () => getServiceReviews(sp_username, service_name)
  })

  const username = localStorage.getItem("username") ?? ""
  
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Flex flexDir = "column" gap = "4">
      <Box textAlign="right">
        <Button color = "white" bg = "primary.400" _hover = {{bg: "primary.500"}} onClick = {onOpen}>Write Review</Button>
      </Box>
      {data && data.map((review, index) => (
        <Box boxShadow = "lg" bg = "gray.100" key = {index}>
          <Text p = "2">{review.username}</Text>
          <Flex alignItems="center" gap = "4"  p = "2">
            <RatingDisplay rating = {review.rating}/>
            <Text>{convertDate(review.created_at)}</Text>
          </Flex>
          <Text p = "2">{review.description}</Text>
        </Box>
      ))}
      <WriteReviewModal isOpen = {isOpen} onClose = {onClose} sp_username = {sp_username} service_name = {service_name} username = {username}/>
    </Flex>
  )
}
