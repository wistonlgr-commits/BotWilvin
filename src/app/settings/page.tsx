"use client";
import { useState, useEffect } from 'react';
import { Bot, Calendar, Bell, Shield, Save, Users, Key } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('bot');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    min_price: '$150,000 USD',
    allowed_days: 'Lunes a Sábado',
    system_prompt: 'Prioriza hablar de la rentabilidad del proyecto por renta vacacional y la ubicación en Punta Cana.',
    alert_whatsapp: true,
    alert_email: true,
    target_phone: '+18095550000',
    target_email: 'willvin@arayapuntacana.com'
  });

  const tabs = [
    { id: 'bot', name: 'Ajustes del Bot (Laura)', icon: Bot },
    { id: 'calendar', name: 'Calendario', icon: Calendar },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'security', name: 'Seguridad y Accesos', icon: Shield },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single();
    if (data) {
      setSettings(data);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase.from('settings').update(settings).eq('id', 1);
    setSaving(false);
    if (!error) {
      alert('Configuración guardada exitosamente.');
    } else {
      alert('Error guardando configuración.');
    }
  }

  if (loading) {
    return <div className="p-8 text-araya-brown">Cargando configuración...</div>;
  }

  return (
    <div className="max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-araya-brown">Configuración</h1>
        <p className="text-araya-brown/70 mt-1">Administra el comportamiento de Laura y las integraciones del sistema.</p>
      </header>

      <div className="flex gap-8">
        {/* Settings Navigation */}
        <div className="w-72 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-araya-brown/10 p-2 flex flex-col gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors text-left ${
                    isActive 
                      ? 'bg-araya-beige text-araya-brown font-semibold shadow-sm border border-araya-brown/10' 
                      : 'text-araya-brown/70 hover:bg-araya-beige/50 hover:text-araya-brown'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-araya-brown/10 p-8">
          
          {/* BOT SETTINGS */}
          {activeTab === 'bot' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-araya-brown flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Ajustes de Laura (Bot IA)
                </h2>
                <p className="text-sm text-araya-brown/70 mt-1">
                  Define las reglas que Laura usará para calificar a los leads.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-araya-brown mb-2">Precio inicial autorizado</label>
                    <input type="text" value={settings.min_price} onChange={e => setSettings({...settings, min_price: e.target.value})} className="w-full px-4 py-2 border border-araya-brown/20 rounded-xl focus:outline-none focus:border-araya-brown focus:ring-1 focus:ring-araya-brown text-sm" />
                    <p className="text-xs text-araya-brown/50 mt-1">Laura mencionará precios "desde" este valor.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-araya-brown mb-2">Días hábiles para citas</label>
                    <select value={settings.allowed_days} onChange={e => setSettings({...settings, allowed_days: e.target.value})} className="w-full px-4 py-2 border border-araya-brown/20 rounded-xl focus:outline-none focus:border-araya-brown focus:ring-1 focus:ring-araya-brown text-sm">
                      <option>Lunes a Sábado</option>
                      <option>Lunes a Viernes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-araya-brown mb-2">Instrucciones Adicionales (System Prompt)</label>
                  <textarea rows={4} value={settings.system_prompt} onChange={e => setSettings({...settings, system_prompt: e.target.value})} className="w-full px-4 py-2 border border-araya-brown/20 rounded-xl focus:outline-none focus:border-araya-brown focus:ring-1 focus:ring-araya-brown text-sm resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* CALENDAR SETTINGS */}
          {activeTab === 'calendar' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-araya-brown flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Sincronización de Calendario
                </h2>
                <p className="text-sm text-araya-brown/70 mt-1">Conecta tu agenda de Google para que Laura pueda ver los espacios libres reales y agendar sin choques.</p>
              </div>
              <div className="p-6 border border-araya-brown/10 rounded-xl bg-araya-beige/30 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-araya-brown">Cuenta de Google</p>
                  <p className="text-sm text-araya-brown/60">Ninguna cuenta vinculada</p>
                </div>
                <button className="px-6 py-2 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-xl text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                  Iniciar sesión con Google
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-araya-brown flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificaciones de Cierres
                </h2>
                <p className="text-sm text-araya-brown/70 mt-1">Configura a dónde y cómo se enviarán las alertas cuando Laura logre agendar a un cliente.</p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-araya-brown/10 rounded-xl">
                  <label className="flex items-start gap-3 mb-4 cursor-pointer">
                    <input type="checkbox" checked={settings.alert_whatsapp} onChange={e => setSettings({...settings, alert_whatsapp: e.target.checked})} className="w-5 h-5 mt-0.5 accent-araya-brown rounded" />
                    <div>
                      <p className="font-medium text-araya-brown">Alerta por WhatsApp</p>
                      <p className="text-xs text-araya-brown/60">Recibe una notificación push a un número específico.</p>
                    </div>
                  </label>
                  <div className="pl-8">
                    <label className="block text-xs font-medium text-araya-brown/70 mb-1">Número de teléfono destino</label>
                    <input type="tel" value={settings.target_phone} onChange={e => setSettings({...settings, target_phone: e.target.value})} className="w-full px-4 py-2 border border-araya-brown/20 rounded-xl focus:outline-none focus:border-araya-brown focus:ring-1 focus:ring-araya-brown text-sm" />
                  </div>
                </div>

                <div className="p-4 border border-araya-brown/10 rounded-xl">
                  <label className="flex items-start gap-3 mb-4 cursor-pointer">
                    <input type="checkbox" checked={settings.alert_email} onChange={e => setSettings({...settings, alert_email: e.target.checked})} className="w-5 h-5 mt-0.5 accent-araya-brown rounded" />
                    <div>
                      <p className="font-medium text-araya-brown">Resumen por Correo Electrónico</p>
                      <p className="text-xs text-araya-brown/60">Recibe un correo cada vez que un prospecto califique.</p>
                    </div>
                  </label>
                  <div className="pl-8">
                    <label className="block text-xs font-medium text-araya-brown/70 mb-1">Dirección de correo</label>
                    <input type="email" value={settings.target_email} onChange={e => setSettings({...settings, target_email: e.target.value})} className="w-full px-4 py-2 border border-araya-brown/20 rounded-xl focus:outline-none focus:border-araya-brown focus:ring-1 focus:ring-araya-brown text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY & ACCESS */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-araya-brown flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Seguridad y Accesos
                </h2>
                <p className="text-sm text-araya-brown/70 mt-1">Controla quién tiene acceso a este dashboard y gestiona las sesiones activas.</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Team Management */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-araya-brown flex items-center gap-2 border-b border-araya-brown/10 pb-2">
                    <Users className="w-4 h-4" />
                    Miembros del Equipo
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-araya-beige/30 rounded-xl border border-araya-brown/10">
                      <div>
                        <p className="text-sm font-medium text-araya-brown">Willvin Gómez</p>
                        <p className="text-xs text-araya-brown/60">willvin@arayapuntacana.com</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-araya-brown/10 text-araya-brown rounded-md">Admin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-araya-brown/10 flex justify-end">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-araya-brown text-white rounded-xl text-sm font-medium hover:bg-araya-brown/90 transition-colors shadow-md disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
