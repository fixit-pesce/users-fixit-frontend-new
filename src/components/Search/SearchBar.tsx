import{
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react"

import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { BaseSyntheticEvent, useState } from "react"

export default function SearchBar() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debounceSearch = useDebounce(searchTerm, 300)
  
  const navigate = useNavigate()

  const {data} = useQuery({
    queryKey: ["search", debounceSearch],
    queryFn: () => searchService(debounceSearch),
    enabled: debounceSearch.length > 2
  })

  const handleSearch = (e: BaseSyntheticEvent) => {
    e.target.value == "" ? setIsSearching(false) : setIsSearching(true)
    setSearchTerm(e.target.value)
  }
  
  return (
    <InputGroup>
      <Input type = "search" bg = "white" rounded = "lg" boxShadow="md" placeholder = "Search services..."/>
      <InputRightElement>
        <FaSearch opacity="0.5"/>
      </InputRightElement>
    </InputGroup>
  )
}