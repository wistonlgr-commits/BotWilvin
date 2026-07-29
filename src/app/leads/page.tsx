"use client";
import { useState, useEffect } from 'react';
import { Search, Filter, Phone, MessageSquare, Clock, CreditCard, Home as HomeIcon, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  status: string;
  payment_method: string | null;
  purpose: string | null;
  timeframe: string | null;
  chat_history: any;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
    setLoading(false);
  }

  // Helper to format date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="flex h-full relative overflow-hidden">
      {/* Main Table Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${selectedLead ? 'mr-96' : ''}`}>
        <header className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-araya-brown">Prospectos (CRM)</h1>
            <p className="text-araya-brown/70 mt-1">Gestiona los contactos calificados por Laura.</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-araya-brown/50" />
              <input 
                type="text" 
                placeholder="Buscar nombre o teléfono..." 
                className="pl-10 pr-4 py-2 border border-araya-brown/20 rounded-xl focus:outline-none focus:border-araya-brown focus:ring-1 focus:ring-araya-brown text-sm w-64 bg-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-araya-brown/20 rounded-xl text-araya-brown hover:bg-araya-beige transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-araya-brown/10 overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-araya-brown/50">Cargando prospectos...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-araya-beige/50 text-araya-brown/70 text-sm border-b border-araya-brown/10">
                  <th className="p-4 font-medium">Nombre</th>
                  <th className="p-4 font-medium">Teléfono</th>
                  <th className="p-4 font-medium">Fecha</th>
                  <th className="p-4 font-medium">Interés</th>
                  <th className="p-4 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-araya-brown/50">Aún no hay prospectos.</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      onClick={() => setSelectedLead(lead)}
                      className="border-b border-araya-brown/5 hover:bg-araya-beige/30 cursor-pointer transition-colors"
                    >
                      <td className="p-4 font-medium text-araya-brown">{lead.name}</td>
                      <td className="p-4 text-araya-brown/80 text-sm">{lead.phone}</td>
                      <td className="p-4 text-araya-brown/60 text-sm">{formatDate(lead.created_at)}</td>
                      <td className="p-4">
                        <span className="bg-araya-brown/5 text-araya-brown text-xs px-2 py-1 rounded-md border border-araya-brown/10">
                          {lead.purpose || 'No definido'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-md border font-medium ${
                          lead.status === 'Agendado' ? 'bg-green-50 text-green-700 border-green-200' :
                          lead.status === 'Descartado' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Slide-over Profile Panel */}
      <div 
        className={`fixed right-0 top-0 h-screen w-96 bg-white border-l border-araya-brown/10 shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          selectedLead ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedLead && (
          <>
            <div className="p-6 border-b border-araya-brown/10 flex justify-between items-center bg-araya-beige/30">
              <div>
                <h2 className="text-xl font-bold text-araya-brown">{selectedLead.name}</h2>
                <p className="text-sm text-araya-brown/60">{selectedLead.phone}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-black/5 rounded-full text-araya-brown/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Qualification Data */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-araya-brown/50">Perfil del Inversor</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-araya-beige/30 p-3 rounded-xl border border-araya-brown/10">
                    <HomeIcon className="w-4 h-4 text-araya-brown mb-1" />
                    <p className="text-xs text-araya-brown/60">Propósito</p>
                    <p className="font-semibold text-araya-brown text-sm">{selectedLead.purpose || '-'}</p>
                  </div>
                  <div className="bg-araya-beige/30 p-3 rounded-xl border border-araya-brown/10">
                    <CreditCard className="w-4 h-4 text-araya-brown mb-1" />
                    <p className="text-xs text-araya-brown/60">Pago</p>
                    <p className="font-semibold text-araya-brown text-sm">{selectedLead.payment_method || '-'}</p>
                  </div>
                  <div className="bg-araya-beige/30 p-3 rounded-xl border border-araya-brown/10 col-span-2">
                    <Clock className="w-4 h-4 text-araya-brown mb-1" />
                    <p className="text-xs text-araya-brown/60">Horizonte Temporal</p>
                    <p className="font-semibold text-araya-brown text-sm">{selectedLead.timeframe || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-araya-brown/50">Acciones</h3>
                <div className="flex gap-2">
                  <a href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a href={`tel:${selectedLead.phone}`} className="flex-1 bg-araya-brown hover:bg-araya-brown/90 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <Phone className="w-4 h-4" />
                    Llamar
                  </a>
                </div>
              </div>

              {/* Chat Transcript */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-araya-brown/50">Historial con Laura</h3>
                <div className="bg-[#e5ddd5] p-4 rounded-xl h-64 overflow-y-auto space-y-3 text-sm flex flex-col">
                  {(!selectedLead.chat_history || (Array.isArray(selectedLead.chat_history) && selectedLead.chat_history.length === 0)) ? (
                    <div className="text-center text-araya-brown/60 text-xs mt-10">No hay historial de chat registrado.</div>
                  ) : (
                    Array.isArray(selectedLead.chat_history) && selectedLead.chat_history.map((msg: any, i: number) => (
                      <div key={i} className={`p-2 rounded-lg max-w-[85%] shadow-sm border border-black/5 text-araya-brown ${
                        msg.role === 'user' 
                          ? 'bg-[#dcf8c6] rounded-tr-none self-end' 
                          : 'bg-white rounded-tl-none self-start'
                      }`}>
                        {msg.content}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
