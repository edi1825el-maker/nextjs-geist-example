"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Citas",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      description: "Citas programadas este mes"
    },
    {
      title: "Ingresos",
      value: "$45,678",
      change: "+8%",
      changeType: "positive",
      description: "Ingresos totales del mes"
    },
    {
      title: "Barberías Activas",
      value: "28",
      change: "+3",
      changeType: "positive",
      description: "Barberías registradas"
    },
    {
      title: "Reseñas Promedio",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      description: "Calificación promedio"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      client: "Juan Pérez",
      barbershop: "Barbería Clásica",
      service: "Corte + Barba",
      time: "10:00 AM",
      date: "Hoy",
      status: "confirmada"
    },
    {
      id: 2,
      client: "María González",
      barbershop: "Style & Cut",
      service: "Corte Moderno",
      time: "2:30 PM",
      date: "Hoy",
      status: "pendiente"
    },
    {
      id: 3,
      client: "Carlos Rodríguez",
      barbershop: "Gentleman's Club",
      service: "Corte Premium",
      time: "4:00 PM",
      date: "Mañana",
      status: "confirmada"
    }
  ];

  const topBarbershops = [
    {
      name: "Gentleman's Club",
      appointments: 156,
      revenue: "$12,450",
      rating: 4.9
    },
    {
      name: "Barbería Clásica",
      appointments: 134,
      revenue: "$10,890",
      rating: 4.8
    },
    {
      name: "Style & Cut",
      appointments: 98,
      revenue: "$8,760",
      rating: 4.6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Resumen general de tu plataforma de barberías
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription className="text-sm font-medium">
                {stat.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Citas Recientes</CardTitle>
            <CardDescription>
              Últimas citas programadas en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {appointment.client.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.client}</p>
                        <p className="text-sm text-gray-600">{appointment.barbershop}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                      <span>{appointment.service}</span>
                      <span>•</span>
                      <span>{appointment.date} - {appointment.time}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Ver Todas las Citas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Barbershops */}
        <Card>
          <CardHeader>
            <CardTitle>Barberías Top</CardTitle>
            <CardDescription>
              Barberías con mejor rendimiento este mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBarbershops.map((shop, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{shop.name}</p>
                      <p className="text-sm text-gray-600">
                        {shop.appointments} citas • {shop.revenue}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{shop.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Ver Todas las Barberías
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accesos directos a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Nueva Barbería</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Gestionar Citas</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Productos</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Reportes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
