import { Box, Flex } from "@chakra-ui/react";
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
      <Box>
        <Flex justifyContent="center" mt = "4" mb = "2" w = {{base: "100%", md: "60%"}} mx = "auto">
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
