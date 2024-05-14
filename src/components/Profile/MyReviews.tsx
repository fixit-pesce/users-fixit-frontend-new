import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { Review } from "../../types"
import { getMyReviews } from "../../api/ServicesApi"
import { useQuery } from "@tanstack/react-query"
import RatingDisplay from "../Services/RatingDisplay"

const convertDate = (dateString: string) => {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }

  const formattedDate = date.toLocaleString("en-US", options)
  return formattedDate
}

export default function MyReviews() {
  const username = localStorage.getItem("username") ?? ""

  const { data } = useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: () => getMyReviews({ username }),
  })

  return (
    <Flex gap="4" w="100%" h="100%" flexDir="column" alignItems="center" mt="6">
      <Heading>My Reviews</Heading>
      <Flex gap="4" flexDir="column">
        {data &&
          data.map((review, index) => (
            <Box key={index} p="4" shadow="md" rounded="md" bg="white">
              <RatingDisplay rating={review.rating} />
              <Text>{review.description}</Text>
              <Text>
                <b>Service Name:</b> {review.service_name}
              </Text>
              <Text textAlign="right">
                <b>Created At:</b> {convertDate(review.created_at)}
              </Text>
            </Box>
          ))}
      </Flex>
    </Flex>
  )
}
