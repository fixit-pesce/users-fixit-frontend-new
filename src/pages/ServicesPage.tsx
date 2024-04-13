import { Box, Flex, Wrap } from "@chakra-ui/react";
import SearchBar from "../components/Search/SearchBar";
import BaseLayout from "../layouts/BaseLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../api/ServicesApi";
import { Service } from "../types";
import ServiceCard from "../components/Services/ServiceCard";

export default function ServicePage() {
  const {data} = useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: () => getAllServices()
  })
  return (
    <BaseLayout>
      <Box minW = "100vh" bg = "primary.100" mx = "auto">
        <Flex w = {{base: "100%", md: "60%"}} mx = "auto" my = "5">
          <SearchBar/>
        </Flex>
        <Flex p = "4" gap = "6" justifyContent="center" textAlign="center" flexWrap="wrap">
          {data && data.map((service, index) => (
            <ServiceCard {...service} key = {index}/>
          ))}
        </Flex>
      </Box>
    </BaseLayout>
  )
}
