import { Flex, Heading, Box, Text, Link } from "@chakra-ui/react"
import BaseLayout from "../layouts/BaseLayout"
import SearchBar from "../components/Search/SearchBar"
import { Category } from "../types"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../api/ServicesApi"

export default function LandingPage() {
  const { data } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  return (
    <BaseLayout>
      <Flex
        w="100%"
        minH={{ base: "calc(100vh - 56px)", md: "calc(100vh - 59.2px)" }}
        flexDirection={{ base: "column-reverse", md: "row" }}
      >
        <Flex
          w={{ base: "100%", md: "50%" }}
          bg="secondary.400"
          minH={{ base: "100vh", md: "inherit" }}
          flexDirection="column"
          p="4"
          gap="8"
          justifyContent="center"
        >
          <Heading
            mx="auto"
            pb="4"
            color="primary.900"
            size="2xl"
            textAlign="center"
          >
            Home services at your doorstep
          </Heading>
          <Heading mx="auto" pb="4" textAlign="center">
            Fixit: Where home happiness begins, one task at a time
          </Heading>
          <Heading mx="auto" pb="4" color="primary.900">
            Categories Available
          </Heading>
          <Flex
            gap="5"
            wrap="wrap"
            p="4"
            justifyContent="center"
            alignItems="center"
          >
            {data &&
              data.map((category, index) => (
                <Box key={index}>
                  <Box
                    dangerouslySetInnerHTML={{ __html: `${category.icon}` }}
                    pl="3"
                  />
                  <Text>{category.name}</Text>
                </Box>
              ))}
          </Flex>
        </Flex>
        <Flex
          w={{ base: "100%", md: "50%" }}
          bg="primary.100"
          minH={{ base: "calc(100vh - 56px)", md: "inherit" }}
          alignItems="center"
        >
          <Box w="80%" mx="auto">
            <SearchBar setText={() => {}} />
            <Text
              textAlign="center"
              py="2"
              fontSize="2xl"
              fontWeight="bold"
              color="primary.900"
            >
              Search across 100s of services
            </Text>
            <Box pt="4">
              <Text
                textAlign="center"
                color="primary.900"
                fontSize="xl"
                fontWeight="bold"
              >
                Want to be a service provider? <br /> Click here to{" "}
                <Link
                  href={`${import.meta.env.VITE_SERVICE_PROVIDER_URL}`}
                  isExternal
                  color="secondary.400"
                  textDecoration="underline"
                >
                  sign up
                </Link>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </BaseLayout>
  )
}
