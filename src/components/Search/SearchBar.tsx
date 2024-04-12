import{
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react"

import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <InputGroup>
      <Input type = "search" bg = "white" rounded = "lg" boxShadow="md"/>
      <InputRightElement>
        <FaSearch opacity="0.5"/>
      </InputRightElement>
    </InputGroup>
  )
}