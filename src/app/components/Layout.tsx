import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  User,
  GraduationCap,
  Calendar,
  BookOpen,
  Building2,
  Users,
  FileText,
  UserCog,
  Settings,
  ClipboardCheck,
  Send,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface LayoutProps {
  children: ReactNode;
  role: string;
  onLogout: () => void;
}

const roleMenus = {
  alumno: [
    { path: '/alumno/informacion', label: 'Información Personal', icon: User },
    { path: '/alumno/calificaciones', label: 'Calificaciones', icon: FileText },
    { path: '/alumno/historial', label: 'Historial Académico', icon: BookOpen },
    { path: '/alumno/horario', label: 'Horario', icon: Calendar },
  ],
  'servicios-escolares': [
    { path: '/servicios-escolares/grupos', label: 'Administración de Grupos', icon: Users },
    { path: '/servicios-escolares/estudiantes', label: 'Información de Estudiantes', icon: GraduationCap },
    { path: '/servicios-escolares/calificaciones', label: 'Registrar Calificaciones', icon: FileText },
  ],
  director: [
    { path: '/director/evaluacion', label: 'Habilitar Evaluación', icon: Settings },
    { path: '/director/integridad', label: 'Integridad de Reportes', icon: ClipboardCheck },
    { path: '/director/reportes', label: 'Enviar Reportes', icon: Send },
  ],
  profesor: [
    { path: '/profesor/grupos', label: 'Ver Grupos', icon: Users },
    { path: '/profesor/reportes', label: 'Generar Reportes', icon: FileText },
  ],
};

const roleTitles = {
  alumno: 'Alumno',
  'servicios-escolares': 'Servicios Escolares',
  director: 'Director',
  profesor: 'Profesor',
};

export function Layout({ children, role, onLogout }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const menuItems = roleMenus[role as keyof typeof roleMenus] || [];
  const roleTitle = roleTitles[role as keyof typeof roleTitles];

  const handleLogout = () => {
    onLogout();
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-[var(--border)]">
        <h2 className="text-xl text-[var(--color-purple-light)]">PIDAE 2.0</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{roleTitle}</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[var(--color-purple-medium)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-[var(--border)]">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-3 border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[var(--color-bg-primary)]">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--border)]">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--border)] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
              <div>
                <h2 className="text-xl text-[var(--color-purple-light)]">Sistema Académico</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{roleTitle}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-[var(--color-purple-medium)] text-white'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
            <div className="p-4 border-t border-[var(--border)]">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-start gap-3 border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[var(--color-bg-secondary)] border-b border-[var(--border)] p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl lg:text-2xl">
                {menuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}