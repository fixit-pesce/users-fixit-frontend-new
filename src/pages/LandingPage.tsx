import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import BaseLayout from "../layouts/BaseLayout";
import SearchBar from "../components/Search/SearchBar";

export default function LandingPage() {
  return (
    <BaseLayout>
      <Flex w = "100%" h = "calc(100vh - 59.2px)">
        <Flex bg = "secondary.400" w = "50%">
          <Heading>

          </Heading>
        </Flex>
        <Flex bg = "primary.100" w = "50%" justifyContent="center" alignItems = "center" flexDirection="column" gap = "2" pb = "10">
          <Box w = "80%"><SearchBar/></Box>
          <Text fontSize = "lg" fontWeight = "bold">Find your best service across 100s of services</Text>
        </Flex>
      </Flex>
    </BaseLayout>
  )
}
