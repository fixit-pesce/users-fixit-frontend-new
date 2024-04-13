import { Box, Icon } from "@chakra-ui/react"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"

const starsFromRating = (rating: number) => {
  if (rating < 0 || rating > 5){
    return [0, 0, 0]
  }
  const roundedRating = Math.round(rating * 2) / 2
  let full = 0, half = 0, empty = 0

  full = Math.floor(roundedRating)
  half += (roundedRating % 1 === 0.5) ? 1 : 0
  empty = 5 - full - half
  return [full, half, empty]
}

export default function RatingDisplay({rating}: {rating: number}) {
  const [full, half, empty] = starsFromRating(rating)

  return (
    <Box>
      {[...Array(full)].map((_, i) => (
        <Icon key = {i} as = {FaStar} color = "yellow.400" />
      ))}
      {[...Array(half)].map((_, i) => (
        <Icon key = {i} as = {FaStarHalfAlt} color = "yellow.400" />
      ))}
      {[...Array(empty)].map((_, i) => (
        <Icon key = {i} as = {FaRegStar} color = "yellow.400" />
      ))}
    </Box>
  )
}