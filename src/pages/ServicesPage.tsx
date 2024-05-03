import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react"
import SearchBar from "../components/Search/SearchBar"
import BaseLayout from "../layouts/BaseLayout"
import { useQuery } from "@tanstack/react-query"
import { getAllServices } from "../api/ServicesApi"
import { Service } from "../types"
import ServiceCard from "../components/Services/ServiceCard"
import { useState } from "react"

export default function ServicePage() {
  const [text, setText] = useState("")
  const [rating, setRating] = useState(1)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [locality, setLocality] = useState("")

  const { data } = useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: () => getAllServices(),
  })

  const filteredData = data?.filter((service) => {
    const name = service.name.toLowerCase().includes(text.toLowerCase())
    const serviceProvider = service.spCompanyName
      .toLowerCase()
      .includes(text.toLowerCase())
    const category = service.category.toLowerCase().includes(text.toLowerCase())
    const description = service.description
      .toLowerCase()
      .includes(text.toLowerCase())
    const priceFilter = service.price >= minPrice && service.price <= maxPrice
    const ratingFilter = service.avg_rating >= rating
    const areaFilter = service.location.locality
      .toLowerCase()
      .includes(locality.toLowerCase())
    return (
      (name || category || description || serviceProvider) &&
      priceFilter &&
      ratingFilter &&
      areaFilter
    )
  })

  return (
    <BaseLayout>
      <Box>
        <Flex
          justifyContent="center"
          mt="4"
          mb="2"
          w={{ base: "100%", md: "60%" }}
          mx="auto"
          gap="2"
        >
          <SearchBar setText={setText} />
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="green">Filters</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Filters</PopoverHeader>
              <PopoverBody>
                <Box>
                  <FormControl>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="1">1-star</option>
                      <option value="2">2-star</option>
                      <option value="3">3-star</option>
                      <option value="4">4-star</option>
                      <option value="5">5-star</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <RangeSlider
                      aria-label={["min", "max"]}
                      min={0}
                      max={100000}
                      defaultValue={[0, 100000]}
                      onChangeStart={(val) => setMinPrice(val[0])}
                      onChangeEnd={(val) => setMaxPrice(val[1])}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Locality</FormLabel>
                    <Select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                    >
                      {data?.map((service) => (
                        <option
                          key={service.name}
                          value={service.location.locality}
                        >
                          {service.location.locality}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        <Flex
          p="4"
          gap="6"
          justifyContent="center"
          textAlign="center"
          flexWrap="wrap"
        >
          {filteredData &&
            filteredData.map((service, index) => (
              <ServiceCard {...service} key={index} />
            ))}
        </Flex>
      </Box>
    </BaseLayout>
  )
}
