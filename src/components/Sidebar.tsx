"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Panel Principal', icon: LayoutDashboard, path: '/' },
    { name: 'Prospectos (CRM)', icon: Users, path: '/leads' },
    { name: 'Calendario', icon: Calendar, path: '/calendar' },
  ];

  return (
    <div className="w-64 h-screen bg-araya-beige text-araya-brown flex flex-col border-r border-araya-brown/20 fixed">
      <div className="p-6 flex items-center">
        <img src="/logo.png" alt="Willvin Punta Cana Logo" className="h-10 w-auto object-contain" />
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-araya-brown text-araya-beige font-medium shadow-md' 
                  : 'hover:bg-araya-brown/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-araya-brown/20">
        <Link href="/settings" className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-colors ${pathname === '/settings' ? 'bg-araya-brown/10 font-medium' : 'hover:bg-araya-brown/10'}`}>
          <Settings className="w-5 h-5" />
          Configuración
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-araya-accent/10 text-araya-accent transition-colors mt-2">
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
