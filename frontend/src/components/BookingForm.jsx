import React, { useState } from 'react';
import { Calendar, MapPin, Car, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useToast } from '../hooks/use-toast';
import { services, vehicleTypes, timeSlots, saveBooking } from '../mock';
import { format } from 'date-fns';

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    vehicleType: '',
    date: undefined,
    time: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.address || !formData.service || !formData.date || !formData.time) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // Save booking to localStorage (mock)
    const booking = saveBooking({
      ...formData,
      date: formData.date ? format(formData.date, 'yyyy-MM-dd') : ''
    });

    toast({
      title: 'Booking Confirmed!',
      description: `Your appointment has been scheduled for ${format(formData.date, 'PPP')} at ${formData.time}. We'll contact you shortly to confirm.`,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      service: '',
      vehicleType: '',
      date: undefined,
      time: '',
      notes: ''
    });
  };

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your Service
            </h2>
            <p className="text-xl text-gray-600">
              Schedule your car detailing or home cleaning service in Calgary
            </p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white">
              <CardTitle className="text-2xl">Service Booking</CardTitle>
              <CardDescription className="text-amber-50">
                Fill out the form below and we'll confirm your appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-amber-600" />
                      <span>Full Name *</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <span>Phone Number *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(403) 555-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Service Address in Calgary *</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main St NW, Calgary, AB"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-amber-600" />
                      <span>Select Service *</span>
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleType" className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-amber-600" />
                      <span>Vehicle Type</span>
                    </Label>
                    <Select value={formData.vehicleType} onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>Preferred Date *</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData({ ...formData, date })}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Preferred Time *</span>
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    <span>Additional Notes</span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requests or information we should know?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-lg py-6"
                >
                  Confirm Booking
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  * Payment will be collected after service completion
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;