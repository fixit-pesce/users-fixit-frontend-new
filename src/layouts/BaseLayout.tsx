import {Box} from "@chakra-ui/react"
import Navbar from "../components/Navbar/Navbar";

interface BaseLayoutProps {
  children?: React.ReactNode;
}

export default function BaseLayout({children}: BaseLayoutProps) {
  return (
    <Box bg = "primary.100" h = "100vh">
      <Navbar/>
      {children}
    </Box>
  )
}