export interface Service {
  name: string
  description: string
  price: number
  category: string
  serviceProvider: string
  spCompanyName: string
  avg_rating: number
  total_reviews: number
  total_bookings: number
  location: {
    locality: string
    city: string
  }
}

export interface FAQ {
  question: string
  answer: string
}

export interface Review {
  service_name: string
  sp_username: string
  rating: number
  description: string
  created_at: string
  updated_at: string | null
}

export interface Category {
  name: string
  icon: SVGElement
}

export interface User {
  username: string
  email: string
  first_name: string
  last_name: string
  phone_no: string
}

export interface Booking {
  booking_id: string
  service_name: string
  company_name: string
  category: string
  price: number
  username: string
  phone_no: string
  payment_method: {
    type: string
    card_no: string
    status: string
  }
  booked_at: string
  completed_at: string | null
  status: string
}
