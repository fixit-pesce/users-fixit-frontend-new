import {Box} from "@chakra-ui/react"
import Navbar from "../components/Navbar/Navbar";

interface BaseLayoutProps {
  children?: React.ReactNode;
}

export default function BaseLayout({children}: BaseLayoutProps) {
  return (
    <Box bgGradient = "linear(to-br, primary.200, primary.500, primary.900)" minH = "100vh">
      <Navbar/>
      {children}
    </Box>
  )
}