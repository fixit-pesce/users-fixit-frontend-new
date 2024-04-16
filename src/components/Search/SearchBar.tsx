import{
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react"

import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { BaseSyntheticEvent, useState } from "react"
import { searchService } from "../../api/ServicesApi";

export default function SearchBar() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debounceSearch = useDebounce(searchTerm, 300)
  
  const navigate = useNavigate()

  const {data: options} = useQuery<[string, string, string]>({
    queryKey: ["search", debounceSearch],
    queryFn: () => searchService(debounceSearch),
    enabled: debounceSearch.length > 2
  })

  const handleSearch = (e: BaseSyntheticEvent) => {
    e.target.value == "" ? setIsSearching(false) : setIsSearching(true)
    setSearchTerm(e.target.value)
  }
  
  return (
    <Box position = "relative" w = "100%">
      <InputGroup>
        <Input
          type = "search"
          bg = "white"
          rounded = "lg"
          boxShadow="md"
          placeholder = "Search services..."
          onChange = {(e) => handleSearch(e)}
          />
        <InputRightElement>
          <FaSearch opacity="0.5"/>
        </InputRightElement>
      </InputGroup>
      <Box
        w = "100%"
        textAlign= "center"
        bg = "white"
        color = "primary.900"
        borderRadius = "md"
        pos = "absolute"
        top = "48px"
        zIndex = {9999}
        >
        {isSearching && options?.map((option, i: number) => (
          <Text
            key = {i}
            p = {2}
            _hover = {{color: "white", bg : "primary.400", cursor: "pointer"}}
            onClick = {() => {navigate(`/services/${option[2]}/${option[0]}`); setIsSearching(false)}}
            >{`${option[0]} | ${option[1]}`}
          </Text>
          )
        )}
      </Box>
    </Box>
  )
}