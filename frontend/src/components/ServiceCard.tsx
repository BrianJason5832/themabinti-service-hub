
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export interface ServiceProps {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  image: string;
  whatsapp?: string;
  category: string;
  subcategory: string;
  description?: string; // Added for compatibility
}

interface ServiceCardProps {
  service: ServiceProps;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { 
    id, 
    name, 
    minPrice, 
    maxPrice, 
    location, 
    image,
    whatsapp
  } = service;

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://wa.me/${whatsapp}`, '_blank');
  };

  return (
    <Link to={`/service/${id}`}>
      <Card className="service-card overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300'; }}
          />
        </div>
        <CardContent className="flex-grow p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium text-purple-700">
              Ksh {minPrice ? minPrice.toLocaleString() : 0} - {maxPrice ? maxPrice.toLocaleString() : 0}
            </span>
          </p>
          <p className="text-xs text-gray-500">{location}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleBookClick} 
            variant="outline" 
            className="w-full border-purple-500 text-purple-500 hover:bg-purple-50"
          >
            Book via WhatsApp
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ServiceCard;
