"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Barbershop {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openHours: string;
  rating: number;
  reviews: number;
  status: "active" | "inactive" | "pending";
  image: string;
  services: string[];
  owner: string;
  joinDate: string;
}

export default function BarbershopsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [barbershops, setBarbershops] = useState<Barbershop[]>([
    {
      id: 1,
      name: "Barbería Clásica",
      description: "Cortes tradicionales y modernos con más de 20 años de experiencia",
      address: "Calle Principal 123, Centro",
      phone: "+1 (555) 123-4567",
      email: "info@barberiaclasica.com",
      openHours: "9:00 AM - 8:00 PM",
      rating: 4.8,
      reviews: 156,
      status: "active",
      image: "https://placehold.co/400x300?text=Classic+barbershop+interior+with+traditional+chairs",
      services: ["Corte", "Barba", "Afeitado"],
      owner: "Carlos Mendoza",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Style & Cut",
      description: "Barbería moderna especializada en estilos contemporáneos",
      address: "Avenida Norte 456, Zona Rosa",
      phone: "+1 (555) 234-5678",
      email: "contact@styleandcut.com",
      openHours: "10:00 AM - 9:00 PM",
      rating: 4.6,
      reviews: 89,
      status: "active",
      image: "https://placehold.co/400x300?text=Modern+barbershop+with+contemporary+styling+stations",
      services: ["Corte Moderno", "Styling", "Tratamientos"],
      owner: "Ana García",
      joinDate: "2023-03-22"
    },
    {
      id: 3,
      name: "Gentleman's Club",
      description: "Experiencia premium para el caballero moderno",
      address: "Boulevard Sur 789, Distrito Financiero",
      phone: "+1 (555) 345-6789",
      email: "info@gentlemansclub.com",
      openHours: "8:00 AM - 10:00 PM",
      rating: 4.9,
      reviews: 203,
      status: "active",
      image: "https://placehold.co/400x300?text=Luxury+barbershop+with+premium+leather+chairs",
      services: ["Corte Premium", "Barba", "Masajes"],
      owner: "Roberto Silva",
      joinDate: "2022-11-08"
    },
    {
      id: 4,
      name: "Urban Cuts",
      description: "Barbería urbana con estilos modernos y creativos",
      address: "Calle Moderna 321, Centro Comercial",
      phone: "+1 (555) 456-7890",
      email: "hello@urbancuts.com",
      openHours: "11:00 AM - 8:00 PM",
      rating: 4.4,
      reviews: 67,
      status: "pending",
      image: "https://placehold.co/400x300?text=Urban+barbershop+with+creative+modern+design",
      services: ["Corte Urbano", "Diseños", "Color"],
      owner: "Miguel Torres",
      joinDate: "2024-01-10"
    }
  ]);

  const filteredBarbershops = barbershops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || shop.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa";
      case "inactive":
        return "Inactiva";
      case "pending":
        return "Pendiente";
      default:
        return status;
    }
  };

  const handleStatusChange = (id: number, newStatus: "active" | "inactive" | "pending") => {
    setBarbershops(prev => 
      prev.map(shop => 
        shop.id === id ? { ...shop, status: newStatus } : shop
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta barbería?")) {
      setBarbershops(prev => prev.filter(shop => shop.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Barberías</h1>
          <p className="text-gray-600 mt-2">
            Administra todas las barberías registradas en la plataforma
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nueva Barbería
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Barbería</DialogTitle>
              <DialogDescription>
                Completa la información para registrar una nueva barbería
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Barbería</Label>
                <Input id="name" placeholder="Ej: Barbería Moderna" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Propietario</Label>
                <Input id="owner" placeholder="Nombre del propietario" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describe los servicios y especialidades..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="info@barberia.com" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Calle, número, colonia, ciudad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Horario</Label>
                <Input id="hours" placeholder="9:00 AM - 8:00 PM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="inactive">Inactiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddModalOpen(false)}>
                Guardar Barbería
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nombre, propietario o dirección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="inactive">Inactivas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Barbershops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBarbershops.map((shop) => (
          <Card key={shop.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={shop.image}
                alt={`${shop.name} - Interior de barbería profesional`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x300?text=Barbería+Profesional";
                }}
              />
              <div className="absolute top-4 right-4">
                <Badge className={getStatusColor(shop.status)}>
                  {getStatusText(shop.status)}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{shop.name}</CardTitle>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold">{shop.rating}</span>
                  <span className="text-gray-500 text-sm">({shop.reviews})</span>
                </div>
              </div>
              <CardDescription>{shop.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Propietario:</span> {shop.owner}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Dirección:</span> {shop.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Teléfono:</span> {shop.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Horario:</span> {shop.openHours}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Registro:</span> {new Date(shop.joinDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {shop.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Select
                    value={shop.status}
                    onValueChange={(value: "active" | "inactive" | "pending") => 
                      handleStatusChange(shop.id, value)
                    }
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activar</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="inactive">Desactivar</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(shop.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBarbershops.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron barberías</h3>
            <p className="text-gray-600">
              No hay barberías que coincidan con los filtros seleccionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
