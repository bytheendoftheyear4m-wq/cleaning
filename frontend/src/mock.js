// Mock data for Pure Gold Solutions Car Wash Website

export const services = [
  {
    id: '1',
    title: 'Exterior Wash & Wax',
    description: 'Complete exterior cleaning with premium hand wash, foam bath, and protective wax coating.',
    price: 'From $59',
    features: ['Hand Wash', 'Foam Bath', 'Tire Shine', 'Protective Wax', 'Window Cleaning'],
    image: 'https://images.unsplash.com/photo-1624884269715-70759892cd29?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxjYXIlMjBpbnRlcmlvciUyMGNsZWFuaW5nfGVufDB8fHx8MTc2MzAxMDUxNXww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '2',
    title: 'Interior Detailing',
    description: 'Deep cleaning of interior surfaces, upholstery shampooing, and air freshening.',
    price: 'From $79',
    features: ['Vacuum & Shampoo', 'Dashboard Polish', 'Leather Conditioning', 'Window Interior', 'Air Freshening'],
    image: 'https://images.unsplash.com/photo-1656077885491-3922185f3932?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGNsZWFuaW5nfGVufDB8fHx8MTc2MzAxMDUxNXww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '3',
    title: 'Premium Full Detail',
    description: 'Complete interior and exterior detailing for showroom-quality results.',
    price: 'From $149',
    features: ['Full Exterior Detail', 'Complete Interior Detail', 'Engine Bay Cleaning', 'Paint Correction', 'Ceramic Coating Option'],
    image: 'https://images.unsplash.com/photo-1620584898989-d39f7f9ed1b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZXRhaWxpbmd8ZW58MHx8fHwxNzYzMDEwNTIwfDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '4',
    title: 'Engine Bay Cleaning',
    description: 'Professional cleaning and degreasing of engine compartment.',
    price: 'From $49',
    features: ['Engine Degreasing', 'Component Cleaning', 'Protective Dressing', 'Detailed Inspection'],
    image: 'https://images.unsplash.com/photo-1761312834150-4beefff097a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3YXNofGVufDB8fHx8MTc2MzAxMDQ4MHww&ixlib=rb-4.1.0&q=85'
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Calgary, AB',
    rating: 5,
    text: 'Pure Gold Solutions transformed my car! The attention to detail was incredible. They came to my home and did an amazing job. Highly recommend!',
    date: '2025-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Calgary, AB',
    rating: 5,
    text: 'Best car detailing service in Calgary. Professional, punctual, and my car looks brand new. The mobile service is so convenient!',
    date: '2025-01-10'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'Calgary, AB',
    rating: 5,
    text: 'Exceptional service! They detailed my SUV inside and out. The team was friendly and the results exceeded my expectations.',
    date: '2025-01-05'
  }
];

export const vehicleTypes = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'truck', label: 'Truck' },
  { value: 'van', label: 'Van' },
  { value: 'luxury', label: 'Luxury Vehicle' },
  { value: 'other', label: 'Other' }
];

export const timeSlots = [
  { value: '8:00 AM', label: '8:00 AM' },
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '1:00 PM', label: '1:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' },
  { value: '5:00 PM', label: '5:00 PM' }
];

// Store bookings in localStorage for frontend demo
export const saveBooking = (booking) => {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const newBooking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return newBooking;
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};