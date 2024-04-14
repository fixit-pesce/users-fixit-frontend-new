import { Link, Route, Routes } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import MyProfile from "../components/Profile/MyProfile";
import MyReviews from "../components/Profile/MyReviews";
import MyBookings from "../components/Profile/MyBookings";
import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function ProfilePage() {
  return (
    <BaseLayout>
      <Flex>
        <Flex
          w = "240px"
          bg = "white"
          minH = {{base: "calc(100vh - 56px)", md: "calc(100vh - 59.2px)"}}
          boxShadow = "lg"
          textAlign = "center"
          flexDirection="column"
          gap = "4"
          p = "2"
          >
          <Link
            as = {NavLink}
            to = "/profile"
            _activeLink = {{bg: "primary.400"}}
          >
          My Profile
          </Link>
          <Link
            as = {NavLink}
            to = "/reviews"
            p = "2"
          >
          My Reviews
          </Link>
          <Link
            as = {NavLink}
            to = "/bookings"
            p = "2"
          >
          My Bookings
          </Link>
        </Flex>
        <Box>
          <Routes>
            <Route path = "/profile" element = {<MyProfile/>}/>
            <Route path = "/reviews" element = {<MyReviews/>}/>
            <Route path = "/bookings" element = {<MyBookings/>}/>
          </Routes>
        </Box>
      </Flex>
    </BaseLayout>
  )
}
