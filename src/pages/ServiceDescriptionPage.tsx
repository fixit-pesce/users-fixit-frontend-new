import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import BaseLayout from '../layouts/BaseLayout'
import ServiceInformation from '../components/Services/ServiceInformation'
import ServiceReviews from '../components/Services/ServiceReviews'
import { useParams } from 'react-router-dom'
import ServiceFAQs from '../components/Services/ServiceFAQs'

export default function ServiceDescriptionPage() {
  let {sp_username, service_name} = useParams()

  sp_username = sp_username as string
  service_name = service_name as string

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
            <Tab>FAQs</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ServiceInformation sp_username = {sp_username} service_name={service_name}/>
            </TabPanel>
            <TabPanel>
              <ServiceReviews sp_username = {sp_username} service_name={service_name}/>
            </TabPanel>
            <TabPanel>
              <ServiceFAQs sp_username = {sp_username} service_name={service_name}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  </BaseLayout>
  )
}
