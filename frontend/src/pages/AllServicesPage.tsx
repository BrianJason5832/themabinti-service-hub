
import { useState } from 'react';
import NavbarTop from '@/components/NavbarTop';
import NavbarBottom from '@/components/NavbarBottom';
import ServiceCard from '@/components/ServiceCard';
import { mockServices } from '@/data/mockServices';
import { serviceCategories } from '@/data/serviceCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { ServiceProps } from '@/components/ServiceCard';

const AllServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Function to filter services based on search query and selected category
  const getFilteredServices = () => {
    let filtered = [...mockServices];
    
    // Filter by search query if it exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(query) || 
        (service.description && service.description.toLowerCase().includes(query)) ||
        service.location.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by category if not "all"
    if (currentTab !== 'all') {
      filtered = filtered.filter(service => {
        const category = serviceCategories.find(cat => cat.id === currentTab);
        return category && service.category === category.title;
      });
    }
    
    return filtered;
  };
  
  const filteredServices = getFilteredServices();

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarTop />
      <NavbarBottom />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">All Services</h1>
            <p className="text-gray-600 max-w-4xl">
              Browse our comprehensive list of beauty, fashion, health, and lifestyle services available across Kenya.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-10 space-y-6">
            <div className="relative max-w-2xl">
              <Input
                type="text"
                placeholder="Search services by name, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <div className="overflow-x-auto pb-3">
                <TabsList className="h-auto p-1">
                  <TabsTrigger value="all" className="rounded-md py-2 px-4">
                    All Categories
                  </TabsTrigger>
                  {serviceCategories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="rounded-md py-2 px-4"
                    >
                      {category.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-6">
                {filteredServices.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">No services found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search criteria or browse all services.</p>
                    <Button onClick={() => {setSearchQuery(''); setCurrentTab('all');}}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              {serviceCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold text-gray-700 mb-4">No services found in {category.title}</h3>
                      <p className="text-gray-500 mb-6">Try adjusting your search criteria or browse all services.</p>
                      <Button onClick={() => {setSearchQuery(''); setCurrentTab('all');}}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;
