export interface Service{
  name: string
  description: string
  price: number
  category: string
  serviceProvider: string
  spCompanyName: string
  avg_rating: number
  total_reviews: number
  total_bookings: number
}

export interface FAQ{
  question: string
  answer: string
}


export interface Review{
  username: string
  rating: number
  description: string
  created_at: string
  updated_at: string | null
}

export interface Category{
  name: string
  icon: SVGElement
}