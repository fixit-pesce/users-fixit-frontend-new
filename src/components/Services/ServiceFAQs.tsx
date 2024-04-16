import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { FAQ } from '../../types'
import { getServiceFAQs } from '../../api/ServicesApi'


interface ServiceFAQsProps {
  sp_username: string
  service_name: string
}

export default function ServiceFAQs({sp_username, service_name}: ServiceFAQsProps) {
  const {data} = useQuery<[FAQ]>({
    queryKey: ["services", sp_username, service_name, "faqs"],
    queryFn: () => getServiceFAQs(sp_username, service_name)
  })
  return (
    <Box>
      <Accordion>
        {data && data.map((faq, index) => (
          <AccordionItem key = {index}>
            <AccordionButton>
              <Text fontWeight = "bold" p = "2">{faq.question}</Text>
              <AccordionIcon/>
            </AccordionButton>
            <AccordionPanel>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}
