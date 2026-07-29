"use client";
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-araya-brown">Calendario de Citas</h1>
        <p className="text-araya-brown/70 mt-1">Llamadas agendadas por Laura para cierres de 10 minutos.</p>
      </header>
      <div className="bg-white rounded-2xl shadow-sm border border-araya-brown/10 p-8 h-[600px] flex items-center justify-center flex-col text-araya-brown/50">
        <CalendarIcon className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg">Vista de calendario en construcción.</p>
        <p className="text-sm">Aquí se integrará la vista mensual/semanal de citas.</p>
      </div>
    </div>
  );
}
