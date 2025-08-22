"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Appointment {
  id: number;
  client: {
    name: string;
    phone: string;
    email: string;
  };
  barbershop: {
    name: string;
    address: string;
  };
  service: {
    name: string;
    duration: number;
    price: number;
  };
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      client: {
        name: "Juan Pérez",
        phone: "+1 (555) 123-4567",
        email: "juan.perez@email.com"
      },
      barbershop: {
        name: "Barbería Clásica",
        address: "Calle Principal 123"
      },
      service: {
        name: "Corte + Barba",
        duration: 45,
        price: 25
      },
      date: "2024-01-15",
      time: "10:00",
      status: "confirmed",
      notes: "Cliente prefiere corte clásico",
      createdAt: "2024-01-10T09:00:00Z"
    },
    {
      id: 2,
      client: {
        name: "María González",
        phone: "+1 (555) 234-5678",
        email: "maria.gonzalez@email.com"
      },
      barbershop: {
        name: "Style & Cut",
        address: "Avenida Norte 456"
      },
      service: {
        name: "Corte Moderno",
        duration: 30,
        price: 20
      },
      date: "2024-01-15",
      time: "14:30",
      status: "pending",
      createdAt: "2024-01-12T15:30:00Z"
    },
    {
      id: 3,
      client: {
        name: "Carlos Rodríguez",
        phone: "+1 (555) 345-6789",
        email: "carlos.rodriguez@email.com"
      },
      barbershop: {
        name: "Gentleman's Club",
        address: "Boulevard Sur 789"
      },
      service: {
        name: "Corte Premium + Masaje",
        duration: 60,
        price: 45
      },
      date: "2024-01-16",
      time: "16:00",
      status: "confirmed",
      notes: "Incluir tratamiento capilar",
      createdAt: "2024-01-11T11:20:00Z"
    },
    {
      id: 4,
      client: {
        name: "Ana Martínez",
        phone: "+1 (555) 456-7890",
        email: "ana.martinez@email.com"
      },
      barbershop: {
        name: "Urban Cuts",
        address: "Calle Moderna 321"
      },
      service: {
        name: "Corte + Color",
        duration: 90,
        price: 55
      },
      date: "2024-01-14",
      time: "11:00",
      status: "completed",
      createdAt: "2024-01-08T14:45:00Z"
    },
    {
      id: 5,
      client: {
        name: "Roberto Silva",
        phone: "+1 (555) 567-8901",
        email: "roberto.silva@email.com"
      },
      barbershop: {
        name: "Barbería Clásica",
        address: "Calle Principal 123"
      },
      service: {
        name: "Afeitado Tradicional",
        duration: 30,
        price: 15
      },
      date: "2024-01-13",
      time: "09:30",
      status: "cancelled",
      notes: "Cliente canceló por enfermedad",
      createdAt: "2024-01-09T16:10:00Z"
    }
  ]);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.barbershop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelada";
      case "completed":
        return "Completada";
      default:
        return status;
    }
  };

  const handleStatusChange = (id: number, newStatus: "confirmed" | "pending" | "cancelled" | "completed") => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) > new Date());
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-600 mt-2">
            Administra todas las citas programadas en la plataforma
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar
          </Button>
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Citas de Hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {todayAppointments.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Próximas Citas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {upcomingAppointments.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {completedAppointments.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ingresos del Día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${todayAppointments.reduce((sum, apt) => sum + apt.service.price, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Buscar por cliente, barbería o servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="confirmed">Confirmadas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>

            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "calendar" | "list")} className="w-full lg:w-auto">
              <TabsList>
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "calendar" | "list")}>
        <TabsContent value="list" className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {appointment.client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.client.name}</h3>
                        <p className="text-sm text-gray-600">{appointment.client.phone}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Barbería:</span>
                        <p className="text-gray-600">{appointment.barbershop.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Servicio:</span>
                        <p className="text-gray-600">{appointment.service.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Fecha y Hora:</span>
                        <p className="text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} - {appointment.time}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Precio:</span>
                        <p className="text-gray-600">${appointment.service.price}</p>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Notas:</span>
                        <p className="text-gray-600">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Select
                        value={appointment.status}
                        onValueChange={(value: "confirmed" | "pending" | "cancelled" | "completed") => 
                          handleStatusChange(appointment.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmar</SelectItem>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="completed">Completar</SelectItem>
                          <SelectItem value="cancelled">Cancelar</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Selecciona una fecha para ver las citas</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  Citas del {selectedDate?.toLocaleDateString() || 'día seleccionado'}
                </CardTitle>
                <CardDescription>
                  Citas programadas para esta fecha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedDate && appointments
                    .filter(apt => apt.date === selectedDate.toISOString().split('T')[0])
                    .map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.time}
                          </div>
                          <div>
                            <p className="font-medium">{appointment.client.name}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.service.name} - {appointment.barbershop.name}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                    ))}
                  
                  {selectedDate && appointments.filter(apt => apt.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
                    <div className="text-center py-8">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-600">No hay citas programadas para esta fecha</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {filteredAppointments.length === 0 && viewMode === "list" && (
        <Card>
          <CardContent className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron citas</h3>
            <p className="text-gray-600">
              No hay citas que coincidan con los filtros seleccionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
