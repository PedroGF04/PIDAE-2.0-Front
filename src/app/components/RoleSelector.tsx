import { User, Building2, UserCog, GraduationCap } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface RoleSelectorProps {
  onSelectRole: (role: string) => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = [
    {
      id: 'alumno',
      name: 'Alumno',
      icon: GraduationCap,
      description: 'Acceso a calificaciones y horarios',
    },
    {
      id: 'servicios-escolares',
      name: 'Servicios Escolares',
      icon: Building2,
      description: 'Administración de grupos y estudiantes',
    },
    {
      id: 'director',
      name: 'Director',
      icon: UserCog,
      description: 'Gestión de evaluaciones y reportes',
    },
    {
      id: 'profesor',
      name: 'Profesor',
      icon: User,
      description: 'Reportes y gestión de grupos',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      background: 'linear-gradient(135deg, var(--color-gradient-start) 0%, var(--color-gradient-end) 100%)'
    }}>
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">PIDAE 2.0</h1>
          <p className="text-[var(--color-text-secondary)]">Plataforma Integral de Autenticación y Evaluación</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="cursor-pointer transition-all hover:scale-105 hover:border-[var(--color-purple-medium)] bg-[var(--color-bg-secondary)] border-[var(--border)]"
                onClick={() => onSelectRole(role.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-[var(--color-bg-tertiary)]">
                      <Icon className="w-8 h-8 text-[var(--color-purple-light)]" />
                    </div>
                  </div>
                  <h3 className="mb-2">{role.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{role.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}