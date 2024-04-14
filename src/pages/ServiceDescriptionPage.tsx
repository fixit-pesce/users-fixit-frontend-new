import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import BaseLayout from '../layouts/BaseLayout'
import ServiceInformation from '../components/Services/ServiceInformation'
import ServiceReviews from '../components/Services/ServiceReviews'
import { useParams } from 'react-router-dom'

export default function ServiceDescriptionPage() {
  const {service_name} = useParams()

  return (
    <BaseLayout>
      <Box
        bg = "white"
        w = "80%"
        mx = "auto"
        boxShadow = "lg"
        rounded = "md"
        mt = "10"
        p = "8">
        <Heading textAlign="center" mb = "6">{service_name}</Heading>
        <Tabs variant = "enclosed-colored" isFitted>
          <TabList>
            <Tab>Information</Tab>
            <Tab>Reviews</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ServiceInformation/>
            </TabPanel>
            <TabPanel>
              <ServiceReviews/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  </BaseLayout>
  )
}
