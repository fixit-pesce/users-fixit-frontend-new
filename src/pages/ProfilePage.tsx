import { Route, Routes } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import MyProfile from "../components/Profile/MyProfile";
import MyReviews from "../components/Profile/MyReviews";
import MyBookings from "../components/Profile/MyBookings";
import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function ProfilePage() {
  return (
    <BaseLayout>
      <Flex bg = "primary.100" minH = {{base: "calc(100vh - 56px)", md: "calc(100vh - 59.2px)"}}>
        <Flex
          w = "240px"
          bg = "secondary.400"
          boxShadow = "lg"
          textAlign = "center"
          flexDirection="column"
          fontWeight = "bold"
          color = "primary.900"
          >
          <Link
            as = {NavLink}
            to = "/me/profile"
            _activeLink = {{bg: "secondary.500", color: "white", fontWeight: "bold"}}
            p = "2"
          >
          My Profile
          </Link>
          <Link
            as = {NavLink}
            to = "/me/reviews"
            _activeLink = {{bg: "secondary.500", color: "white", fontWeight: "bold"}}
            p = "2"
          >
          My Reviews
          </Link>
          <Link
            as = {NavLink}
            to = "/me/bookings"
            _activeLink = {{bg: "secondary.500", color: "white", fontWeight: "bold"}}
            p = "2"
          >
          My Bookings
          </Link>
        </Flex>
        <Box w = "calc(100% - 240px)">
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
