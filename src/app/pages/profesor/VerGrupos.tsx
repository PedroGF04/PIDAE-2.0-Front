import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, Eye, Calendar, BookOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router';

export function VerGrupos() {
  const navigate = useNavigate();
  
  const grupos = [
    {
      id: 1,
      materia: 'Criptografía Básica',
      grupo: 'Grupo A',
      estudiantes: 32,
      horario: 'Lun-Mié 07:00-09:00',
      salon: 'A-201',
      nivel: 'Básico',
      promedio: 89.5,
    },
    {
      id: 2,
      materia: 'Criptografía Intermedia',
      grupo: 'Grupo A',
      estudiantes: 28,
      horario: 'Mar-Jue 09:00-11:00',
      salon: 'B-305',
      nivel: 'Intermedio',
      promedio: 91.2,
    },
    {
      id: 3,
      materia: 'Criptografía Avanzada',
      grupo: 'Grupo B',
      estudiantes: 25,
      horario: 'Vie 07:00-11:00',
      salon: 'C-101',
      nivel: 'Avanzado',
      promedio: 87.8,
    },
  ];

  const estadisticas = {
    totalEstudiantes: grupos.reduce((sum, g) => sum + g.estudiantes, 0),
    promedioGeneral: (
      grupos.reduce((sum, g) => sum + g.promedio, 0) / grupos.length
    ).toFixed(1),
    gruposActivos: grupos.length,
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Básico':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermedio':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Avanzado':
        return 'bg-[var(--color-purple-medium)]/20 text-[var(--color-purple-light)] border-[var(--color-purple-medium)]/30';
      default:
        return 'bg-[var(--color-purple-medium)]/20 text-[var(--color-purple-light)] border-[var(--color-purple-medium)]/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Mis Grupos</h2>
        <p className="text-[var(--color-text-secondary)]">
          Gestiona y visualiza información de tus grupos asignados
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Grupos Activos</p>
                <p className="text-3xl">{estadisticas.gruposActivos}</p>
              </div>
              <BookOpen className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Total Estudiantes</p>
                <p className="text-3xl">{estadisticas.totalEstudiantes}</p>
              </div>
              <Users className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Promedio General</p>
                <p className="text-3xl">{estadisticas.promedioGeneral}</p>
              </div>
              <Users className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grupos.map((grupo) => (
          <Card
            key={grupo.id}
            className="bg-[var(--color-bg-secondary)] border-[var(--border)] hover:border-[var(--color-purple-medium)] transition-all"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{grupo.materia}</CardTitle>
                  <p className="text-sm text-[var(--color-text-secondary)]">{grupo.grupo}</p>
                </div>
                <Badge className={getNivelColor(grupo.nivel)}>
                  {grupo.nivel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <Users className="w-5 h-5 text-[var(--color-purple-light)]" />
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-text-secondary)]">Estudiantes</p>
                    <p>{grupo.estudiantes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <Calendar className="w-5 h-5 text-[var(--color-purple-light)]" />
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-text-secondary)]">Horario</p>
                    <p>{grupo.horario}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <BookOpen className="w-5 h-5 text-[var(--color-purple-light)]" />
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-text-secondary)]">Salón</p>
                    <p>{grupo.salon}</p>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-[var(--color-purple-dark)]/20 to-[var(--color-purple-medium)]/20 rounded-lg border border-[var(--color-purple-medium)]/30">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                    Promedio del Grupo
                  </p>
                  <p className="text-2xl text-[var(--color-purple-light)]">{grupo.promedio}</p>
                </div>
              </div>

              <Button
                onClick={() => navigate(`/profesor/grupos/detalle/${grupo.id}`)}
                className="w-full bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}