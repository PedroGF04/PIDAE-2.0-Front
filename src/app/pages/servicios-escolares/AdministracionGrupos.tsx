import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router';

export function AdministracionGrupos() {
  const navigate = useNavigate();
  
  const grupos = [
    { id: 'G1', nombre: 'Criptografía Básica - Grupo A', profesor: 'Dr. García', estudiantes: 32, nivel: 'Básico' },
    { id: 'G2', nombre: 'Criptografía Básica - Grupo B', profesor: 'Ing. Martínez', estudiantes: 28, nivel: 'Básico' },
    { id: 'G3', nombre: 'Criptografía Intermedia - Grupo A', profesor: 'M.C. López', estudiantes: 30, nivel: 'Intermedio' },
    { id: 'G4', nombre: 'Criptografía Intermedia - Grupo B', profesor: 'Ing. Rodríguez', estudiantes: 25, nivel: 'Intermedio' },
    { id: 'G5', nombre: 'Criptografía Avanzada - Grupo A', profesor: 'Dr. Hernández', estudiantes: 27, nivel: 'Avanzado' },
    { id: 'G6', nombre: 'Criptografía Avanzada - Grupo B', profesor: 'Ing. Pérez', estudiantes: 29, nivel: 'Avanzado' },
  ];

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl mb-2">Administración de Grupos</h2>
          <p className="text-[var(--color-text-secondary)]">Gestiona los grupos del cuatrimestre actual</p>
        </div>
        <Button className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Grupo
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grupos.map((grupo) => (
          <Card key={grupo.id} className="bg-[var(--color-bg-secondary)] border-[var(--border)] hover:border-[var(--color-purple-medium)] transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{grupo.nombre}</CardTitle>
                  <p className="text-sm text-[var(--color-text-secondary)]">{grupo.profesor}</p>
                </div>
                <Badge className={getNivelColor(grupo.nivel)}>
                  {grupo.nivel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4 p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                <Users className="w-5 h-5 text-[var(--color-purple-light)]" />
                <span className="text-sm">{grupo.estudiantes} estudiantes</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
                  onClick={() => navigate(`/servicios-escolares/grupos/editar/${grupo.id}`)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[var(--border)] hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mt-6">
        <CardHeader>
          <CardTitle>Estadísticas Generales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">Total de Grupos</p>
              <p className="text-3xl text-[var(--color-purple-light)]">{grupos.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">Total de Estudiantes</p>
              <p className="text-3xl text-[var(--color-purple-light)]">
                {grupos.reduce((sum, g) => sum + g.estudiantes, 0)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">Promedio por Grupo</p>
              <p className="text-3xl text-[var(--color-purple-light)]">
                {Math.round(grupos.reduce((sum, g) => sum + g.estudiantes, 0) / grupos.length)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}