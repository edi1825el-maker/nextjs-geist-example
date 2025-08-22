"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const barbershops = [
    {
      id: 1,
      name: "Barbería Clásica",
      description: "Cortes tradicionales y modernos con más de 20 años de experiencia",
      address: "Calle Principal 123, Centro",
      rating: 4.8,
      reviews: 156,
      image: "https://placehold.co/400x300?text=Modern+barbershop+interior+with+vintage+chairs+and+mirrors",
      services: ["Corte", "Barba", "Afeitado"],
      openHours: "9:00 AM - 8:00 PM"
    },
    {
      id: 2,
      name: "Style & Cut",
      description: "Barbería moderna especializada en estilos contemporáneos",
      address: "Avenida Norte 456, Zona Rosa",
      rating: 4.6,
      reviews: 89,
      image: "https://placehold.co/400x300?text=Contemporary+barbershop+with+sleek+modern+design",
      services: ["Corte Moderno", "Styling", "Tratamientos"],
      openHours: "10:00 AM - 9:00 PM"
    },
    {
      id: 3,
      name: "Gentleman's Club",
      description: "Experiencia premium para el caballero moderno",
      address: "Boulevard Sur 789, Distrito Financiero",
      rating: 4.9,
      reviews: 203,
      image: "https://placehold.co/400x300?text=Luxury+barbershop+with+premium+leather+chairs+and+elegant+decor",
      services: ["Corte Premium", "Barba", "Masajes"],
      openHours: "8:00 AM - 10:00 PM"
    }
  ];

  const filteredBarbershops = barbershops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BarberShop Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Inicio</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Servicios</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Productos</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Mi Perfil</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Encuentra la Barbería Perfecta
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Reserva tu cita en las mejores barberías de la ciudad. Servicios profesionales, 
            productos de calidad y la mejor experiencia.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Buscar barberías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Barbershops Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Barberías Destacadas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBarbershops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative">
                  <img
                    src={shop.image}
                    alt={`${shop.name} - Barbería profesional`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/400x300?text=Barbería+Profesional";
                    }}
                  />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{shop.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{shop.rating}</span>
                      <span className="text-gray-500">({shop.reviews})</span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">
                    {shop.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Dirección:</span> {shop.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Horario:</span> {shop.openHours}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {shop.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button className="flex-1">
                        Ver Perfil
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Reservar Cita
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BarberShop Pro</h3>
              <p className="text-gray-400">
                La plataforma líder para reservas en barberías profesionales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Reserva de Citas</li>
                <li>Gestión de Barberías</li>
                <li>Productos Premium</li>
                <li>Reseñas y Calificaciones</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centro de Ayuda</li>
                <li>Contacto</li>
                <li>Términos de Servicio</li>
                <li>Política de Privacidad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@barbershoppro.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Lunes - Domingo</li>
                <li>9:00 AM - 10:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BarberShop Pro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
