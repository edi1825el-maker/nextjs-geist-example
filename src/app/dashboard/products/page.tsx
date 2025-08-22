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

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  barbershop: {
    id: number;
    name: string;
  };
  image: string;
  status: "active" | "inactive" | "out_of_stock";
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Pomada para Cabello Premium",
      description: "Pomada de alta calidad para peinados clásicos y modernos. Fijación fuerte y brillo natural.",
      price: 25.99,
      category: "Cuidado Capilar",
      brand: "BarberPro",
      stock: 45,
      barbershop: {
        id: 1,
        name: "Barbería Clásica"
      },
      image: "https://placehold.co/300x300?text=Premium+hair+pomade+with+elegant+packaging",
      status: "active",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z"
    },
    {
      id: 2,
      name: "Aceite para Barba Orgánico",
      description: "Aceite natural para el cuidado y suavizado de la barba. Ingredientes 100% orgánicos.",
      price: 18.50,
      category: "Cuidado de Barba",
      brand: "Natural Beard Co.",
      stock: 32,
      barbershop: {
        id: 2,
        name: "Style & Cut"
      },
      image: "https://placehold.co/300x300?text=Organic+beard+oil+bottle+with+natural+ingredients",
      status: "active",
      createdAt: "2024-01-08T09:15:00Z",
      updatedAt: "2024-01-12T16:45:00Z"
    },
    {
      id: 3,
      name: "Champú Anticaspa Profesional",
      description: "Champú especializado para el tratamiento de la caspa y cuero cabelludo sensible.",
      price: 22.75,
      category: "Cuidado Capilar",
      brand: "ProCare",
      stock: 0,
      barbershop: {
        id: 3,
        name: "Gentleman's Club"
      },
      image: "https://placehold.co/300x300?text=Professional+anti+dandruff+shampoo+bottle",
      status: "out_of_stock",
      createdAt: "2024-01-05T11:30:00Z",
      updatedAt: "2024-01-14T13:20:00Z"
    },
    {
      id: 4,
      name: "Cera Modeladora Mate",
      description: "Cera de fijación media con acabado mate. Ideal para estilos naturales y texturizados.",
      price: 16.99,
      category: "Styling",
      brand: "MatteFix",
      stock: 28,
      barbershop: {
        id: 1,
        name: "Barbería Clásica"
      },
      image: "https://placehold.co/300x300?text=Matte+styling+wax+container+with+modern+design",
      status: "active",
      createdAt: "2024-01-12T15:45:00Z",
      updatedAt: "2024-01-15T10:15:00Z"
    },
    {
      id: 5,
      name: "Loción Aftershave Clásica",
      description: "Loción refrescante y desinfectante para después del afeitado. Aroma clásico masculino.",
      price: 14.25,
      category: "Aftershave",
      brand: "Classic Men",
      stock: 18,
      barbershop: {
        id: 4,
        name: "Urban Cuts"
      },
      image: "https://placehold.co/300x300?text=Classic+aftershave+lotion+bottle+with+vintage+design",
      status: "active",
      createdAt: "2024-01-07T12:00:00Z",
      updatedAt: "2024-01-13T17:30:00Z"
    },
    {
      id: 6,
      name: "Kit de Herramientas Profesional",
      description: "Set completo de herramientas para barbero profesional. Incluye tijeras, navaja y accesorios.",
      price: 89.99,
      category: "Herramientas",
      brand: "BarberTools Pro",
      stock: 8,
      barbershop: {
        id: 2,
        name: "Style & Cut"
      },
      image: "https://placehold.co/300x300?text=Professional+barber+tools+kit+with+scissors+and+razor",
      status: "active",
      createdAt: "2024-01-03T08:20:00Z",
      updatedAt: "2024-01-11T14:10:00Z"
    }
  ]);

  const categories = ["all", "Cuidado Capilar", "Cuidado de Barba", "Styling", "Aftershave", "Herramientas"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barbershop.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "out_of_stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo";
      case "inactive":
        return "Inactivo";
      case "out_of_stock":
        return "Sin Stock";
      default:
        return status;
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", text: "Sin stock" };
    if (stock < 10) return { color: "text-yellow-600", text: "Stock bajo" };
    return { color: "text-green-600", text: "En stock" };
  };

  const handleStatusChange = (id: number, newStatus: "active" | "inactive" | "out_of_stock") => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, status: newStatus } : product
      )
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === "active").length;
  const outOfStockProducts = products.filter(p => p.status === "out_of_stock").length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600 mt-2">
            Administra el inventario de productos de todas las barberías
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Producto</DialogTitle>
              <DialogDescription>
                Completa la información para agregar un nuevo producto al inventario
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Nombre del Producto</Label>
                <Input id="productName" placeholder="Ej: Pomada Premium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input id="brand" placeholder="Nombre de la marca" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="productDescription">Descripción</Label>
                <Textarea id="productDescription" placeholder="Describe el producto y sus beneficios..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Inicial</Label>
                <Input id="stock" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cuidado Capilar">Cuidado Capilar</SelectItem>
                    <SelectItem value="Cuidado de Barba">Cuidado de Barba</SelectItem>
                    <SelectItem value="Styling">Styling</SelectItem>
                    <SelectItem value="Aftershave">Aftershave</SelectItem>
                    <SelectItem value="Herramientas">Herramientas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="barbershop">Barbería</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar barbería" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Barbería Clásica</SelectItem>
                    <SelectItem value="2">Style & Cut</SelectItem>
                    <SelectItem value="3">Gentleman's Club</SelectItem>
                    <SelectItem value="4">Urban Cuts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddModalOpen(false)}>
                Guardar Producto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Productos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Productos Activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sin Stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Valor Total Inventario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nombre, marca o barbería..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="out_of_stock">Sin Stock</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          
          return (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={`${product.name} - Producto profesional para barbería`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/300x300?text=Producto+Barbería";
                  }}
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(product.status)}>
                    {getStatusText(product.status)}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <p className="text-gray-600">
                      <span className="font-medium">Marca:</span> {product.brand}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Barbería:</span> {product.barbershop.name}
                    </p>
                    <p className={stockStatus.color}>
                      <span className="font-medium">Stock:</span> {product.stock} unidades ({stockStatus.text})
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </Button>
                    
                    <Select
                      value={product.status}
                      onValueChange={(value: "active" | "inactive" | "out_of_stock") => 
                        handleStatusChange(product.id, value)
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activar</SelectItem>
                        <SelectItem value="out_of_stock">Sin Stock</SelectItem>
                        <SelectItem value="inactive">Desactivar</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">
              No hay productos que coincidan con los filtros seleccionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
