
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavbarTop from '@/components/NavbarTop';
import NavbarBottom from '@/components/NavbarBottom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, MapPin, Phone, Clock, LayoutGrid } from 'lucide-react';
import { getServiceById } from '@/data/mockServices';
import { ServiceProps } from '@/components/ServiceCard';
import BookAppointmentDialog from '@/components/BookAppointmentDialog';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const foundService = getServiceById(id);
        setService(foundService || null);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBookViaWhatsApp = () => {
    if (service?.whatsapp) {
      window.open(`https://wa.me/${service.whatsapp}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarTop />
        <NavbarBottom />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarTop />
        <NavbarBottom />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
            <p className="text-gray-600 mb-6">
              The service you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/">
              <Button className="bg-purple-500 hover:bg-purple-600">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // For demo purposes, generate additional images
  const additionalImages = Array(3).fill(null).map((_, index) => 
    `https://source.unsplash.com/featured/?${service.category.toLowerCase()},${index}`
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarTop />
      <NavbarBottom />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Images & Media */}
          <div className="w-full md:w-7/12">
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Link to="/" className="hover:text-purple-500">Home</Link>
                <span className="mx-2">/</span>
                <Link to={`/category/${service.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-purple-500">
                  {service.category}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{service.name}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.name}</h1>
              
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{service.location}</span>
              </div>
            </div>

            <Tabs defaultValue="gallery" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gallery">
                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-lg overflow-hidden h-80">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {additionalImages.map((img, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden h-32">
                        <img 
                          src={img} 
                          alt={`${service.name} ${idx}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="description">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Service Description</h3>
                    <p className="text-gray-700 mb-4">
                      {service.name} provides exceptional service in {service.location}. Our team of experienced professionals ensures top-quality results tailored to your specific needs.
                    </p>
                    <p className="text-gray-700 mb-4">
                      We specialize in {service.subcategory} services with years of expertise in the field. Our clients trust us for our attention to detail, professionalism, and commitment to excellence.
                    </p>
                    <p className="text-gray-700">
                      Whether you're looking for a one-time service or regular appointments, we offer flexible scheduling options to accommodate your needs. Contact us today to book your appointment!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column - Service info & booking */}
          <div className="w-full md:w-5/12">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Service Details</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price Range:</span>
                    <span className="font-semibold text-purple-700">
                      Ksh {service.minPrice.toLocaleString()} - {service.maxPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category:</span>
                    <Link 
                      to={`/category/${service.category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-purple-600 hover:underline"
                    >
                      {service.category}
                    </Link>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subcategory:</span>
                    <Link 
                      to={`/subcategory/${service.subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-purple-600 hover:underline"
                    >
                      {service.subcategory}
                    </Link>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Location:</span>
                    <span>{service.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone:</span>
                    <a href={`tel:${service.whatsapp}`} className="text-purple-600 hover:underline">
                      {service.whatsapp}
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3 mt-6">
                  <Button 
                    onClick={() => setBookDialogOpen(true)}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleBookViaWhatsApp}
                    className="border-purple-500 text-purple-500 hover:bg-purple-50"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Contact via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">About the Provider</h3>
                
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                    <img 
                      src={`https://source.unsplash.com/featured/?person`} 
                      alt="Provider" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Service Provider</h4>
                    <p className="text-sm text-gray-500">Member since 2023</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">
                  Professional service provider specializing in {service.subcategory} with over 5 years of experience in the industry.
                </p>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  <a href={`tel:${service.whatsapp}`} className="hover:text-purple-600">
                    {service.whatsapp}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Related Services */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Similar Services</h2>
            <Link to={`/category/${service.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Button variant="ghost" className="text-purple-500 hover:text-purple-700">
                View All
                <LayoutGrid className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* This would be populated with related services */}
            {Array(4).fill(null).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="border border-gray-200 rounded-b-lg p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Book Appointment Dialog */}
      <BookAppointmentDialog open={bookDialogOpen} onOpenChange={setBookDialogOpen} />
    </div>
  );
};

export default ServiceDetail;
