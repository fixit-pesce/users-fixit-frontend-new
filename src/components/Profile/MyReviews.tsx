import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Review } from "../../types";
import { getMyReviews } from "../../api/ServicesApi";
import { useQuery } from "@tanstack/react-query";
import RatingDisplay from "../Services/RatingDisplay";

export default function MyReviews() {
  const username = localStorage.getItem("username") ?? ""

  const {data} = useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: () => getMyReviews({username})
  })

  return (
    <Flex gap = "4" w = "100%" h = "100%" flexDir="column" alignItems="center" mt = "6">
      <Heading>My Reviews</Heading>
      <Box boxShadow = "md" bg = "white" p = "4" rounded = "md">
        {data && data.map((review, index) => (
          <Box key = {index}>
            <RatingDisplay rating = {review.rating}/>
            <Text>{review.description}</Text>
            <Text>{review.service_name}</Text>
            <Text>{review.sp_username}</Text>
          </Box>
        ))}
      </Box>
    </Flex>
  )
}
