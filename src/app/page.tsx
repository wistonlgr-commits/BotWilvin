"use client";
import Link from 'next/link';
import { Users, UserCheck, CalendarCheck, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', leads: 4 },
  { name: 'Mar', leads: 7 },
  { name: 'Mié', leads: 5 },
  { name: 'Jue', leads: 10 },
  { name: 'Vie', leads: 15 },
  { name: 'Sáb', leads: 8 },
  { name: 'Dom', leads: 2 },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-araya-brown">Hola Willvin,</h1>
        <p className="text-araya-brown/70 mt-1">Aquí tienes el resumen del rendimiento de Laura de hoy.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-araya-brown/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-araya-brown/70">Total Leads</p>
              <h3 className="text-3xl font-bold text-araya-brown mt-2">142</h3>
            </div>
            <div className="p-3 bg-araya-beige rounded-lg">
              <Users className="w-6 h-6 text-araya-brown" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4 flex items-center gap-1 font-medium">
            <TrendingUp className="w-4 h-4" /> +12% esta semana
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-araya-brown/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-araya-brown/70">Leads Calificados</p>
              <h3 className="text-3xl font-bold text-araya-brown mt-2">86</h3>
            </div>
            <div className="p-3 bg-araya-beige rounded-lg">
              <UserCheck className="w-6 h-6 text-araya-brown" />
            </div>
          </div>
          <p className="text-sm text-araya-brown/70 mt-4">
            60% de los contactos totales
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-araya-brown/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-araya-brown/70">Citas Agendadas</p>
              <h3 className="text-3xl font-bold text-araya-brown mt-2">34</h3>
            </div>
            <div className="p-3 bg-araya-beige rounded-lg">
              <CalendarCheck className="w-6 h-6 text-araya-brown" />
            </div>
          </div>
          <p className="text-sm text-araya-brown/70 mt-4">
            Llamadas de 10 min pendientes
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-araya-brown/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-araya-brown/70">Conversión a Cita</p>
              <h3 className="text-3xl font-bold text-araya-accent mt-2">39%</h3>
            </div>
            <div className="p-3 bg-araya-accent/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-araya-accent" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4 flex items-center gap-1 font-medium">
            <TrendingUp className="w-4 h-4" /> Excelente rendimiento
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-araya-brown/10 lg:col-span-2">
          <h3 className="text-lg font-bold text-araya-brown mb-6">Leads Captados (Últimos 7 días)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#786957'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#786957'}} />
                <Tooltip cursor={{fill: '#faf2ee'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="leads" fill="#786957" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-araya-brown/10">
          <h3 className="text-lg font-bold text-araya-brown mb-6">Próximas Citas (Hoy)</h3>
          
          <div className="space-y-4">
            {[
              { time: '14:00', name: 'Carlos Mendoza', tag: 'Inversión' },
              { time: '15:30', name: 'Laura Gómez', tag: 'Uso Personal' },
              { time: '17:00', name: 'Roberto Díaz', tag: 'Inversión' },
            ].map((apt, i) => (
              <Link href="/leads" key={i} className="flex items-center gap-4 p-4 rounded-xl border border-araya-beige hover:bg-araya-beige/50 transition-colors cursor-pointer">
                <div className="bg-araya-accent/10 text-araya-accent font-bold px-3 py-2 rounded-lg text-sm">
                  {apt.time}
                </div>
                <div>
                  <p className="font-semibold text-araya-brown">{apt.name}</p>
                  <p className="text-xs text-araya-brown/60 mt-1">{apt.tag}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/calendar" className="block w-full mt-6 py-3 rounded-xl bg-araya-beige text-araya-brown font-medium text-center hover:bg-araya-brown hover:text-white transition-colors">
            Ver Calendario Completo
          </Link>
        </div>
      </div>
    </div>
  );
}
