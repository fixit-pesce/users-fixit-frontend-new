import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Flex,
  Tag
} from '@chakra-ui/react'

import RatingDisplay from './RatingDisplay'
import { Service } from '../../types'
import { useNavigate } from 'react-router-dom'


export default function ServiceCard(props: Service) {
  const navigate = useNavigate()

  return (
    <Card w = "md" boxShadow="md" rounded = "md">
      <CardHeader textAlign = "center">
        <Heading size="lg" mb = "2">{props.name}</Heading>
        <Heading size="md" noOfLines={1}>{props.serviceProvider}</Heading>
      </CardHeader>
      <CardBody>
        <Text noOfLines={4} mb = "2">{props.description}</Text>
        <Flex justifyContent="center" gap = "2" py = "2">
          <Tag bg = "primary.200">{props.avg_rating}</Tag>
          <RatingDisplay rating = {props.avg_rating}/>
        </Flex>
        <Button bg = "secondary.400" color = "foreground" _hover = {{bg: "secondary.500"}} mt = "2" onClick = {() => {navigate(`${props.serviceProvider}/${props.name}`)}}>Read more</Button>
      </CardBody>
    </Card>
  )
}