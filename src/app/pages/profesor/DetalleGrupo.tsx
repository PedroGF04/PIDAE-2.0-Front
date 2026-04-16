import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Users, Calendar, BookOpen, Award, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

export function DetalleGrupo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const gruposData: Record<string, any> = {
    '1': {
      materia: 'Criptografía Básica',
      grupo: 'Grupo A',
      nivel: 'Básico',
      estudiantes: 32,
      horario: 'Lun-Mié 07:00-09:00',
      salon: 'A-201',
      promedio: 89.5,
      profesor: 'Dr. García',
      descripcion: 'Curso introductorio a los conceptos fundamentales de criptografía, incluyendo cifrados clásicos y modernos.',
      estudiantes_list: [
        { matricula: 'A00123456', nombre: 'Juan Pérez García', promedio: 92 },
        { matricula: 'A00123457', nombre: 'María López Hernández', promedio: 95 },
        { matricula: 'A00123458', nombre: 'Carlos Rodríguez Martínez', promedio: 85 },
        { matricula: 'A00123459', nombre: 'Ana García López', promedio: 90 },
        { matricula: 'A00123460', nombre: 'Luis Martínez Sánchez', promedio: 88 },
      ],
    },
    '2': {
      materia: 'Criptografía Intermedia',
      grupo: 'Grupo A',
      nivel: 'Intermedio',
      estudiantes: 28,
      horario: 'Mar-Jue 09:00-11:00',
      salon: 'B-305',
      promedio: 91.2,
      profesor: 'Dr. García',
      descripcion: 'Algoritmos criptográficos avanzados, protocolos de seguridad y aplicaciones prácticas.',
      estudiantes_list: [
        { matricula: 'A00234567', nombre: 'Pedro Sánchez López', promedio: 94 },
        { matricula: 'A00234568', nombre: 'Laura Fernández García', promedio: 92 },
        { matricula: 'A00234569', nombre: 'Diego Torres Ruiz', promedio: 88 },
        { matricula: 'A00234570', nombre: 'Carmen Díaz Martín', promedio: 90 },
      ],
    },
    '3': {
      materia: 'Criptografía Avanzada',
      grupo: 'Grupo B',
      nivel: 'Avanzado',
      estudiantes: 25,
      horario: 'Vie 07:00-11:00',
      salon: 'C-101',
      promedio: 87.8,
      profesor: 'Dr. García',
      descripcion: 'Criptografía cuántica, blockchain, y técnicas avanzadas de seguridad de la información.',
      estudiantes_list: [
        { matricula: 'A00345678', nombre: 'Roberto Jiménez Vega', promedio: 93 },
        { matricula: 'A00345679', nombre: 'Isabel Moreno Cruz', promedio: 87 },
        { matricula: 'A00345680', nombre: 'Andrés Ramírez Gil', promedio: 84 },
        { matricula: 'A00345681', nombre: 'Sofía Castro Ortiz', promedio: 89 },
      ],
    },
  };

  const grupo = gruposData[id || ''];

  if (!grupo) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-12 text-center">
            <p className="text-[var(--color-text-secondary)]">Grupo no encontrado</p>
            <Button
              onClick={() => navigate('/profesor/grupos')}
              className="mt-4 bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
            >
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const getPromedioColor = (promedio: number) => {
    if (promedio >= 90) return 'text-green-400';
    if (promedio >= 80) return 'text-blue-400';
    if (promedio >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate('/profesor/grupos')}
        className="mb-6 hover:bg-[var(--color-bg-tertiary)]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a Mis Grupos
      </Button>

      {/* Encabezado del Grupo */}
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-[var(--color-purple-medium)]">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-1">{grupo.materia}</CardTitle>
                <p className="text-[var(--color-text-secondary)]">{grupo.grupo}</p>
              </div>
            </div>
            <Badge className={getNivelColor(grupo.nivel)}>{grupo.nivel}</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Promedio del Grupo</p>
                <p className="text-3xl">{grupo.promedio}</p>
              </div>
              <Award className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Estudiantes</p>
                <p className="text-3xl">{grupo.estudiantes}</p>
              </div>
              <Users className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Horario</p>
                <p className="text-sm">{grupo.horario}</p>
              </div>
              <Calendar className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Salón</p>
                <p className="text-xl">{grupo.salon}</p>
              </div>
              <BookOpen className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información del Curso */}
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <CardTitle>Información del Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">Descripción</p>
              <p>{grupo.descripcion}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Profesor</p>
                <p>{grupo.profesor}</p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Nivel</p>
                <Badge className={getNivelColor(grupo.nivel)}>{grupo.nivel}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Estudiantes */}
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[var(--color-purple-light)]" />
            Estudiantes Inscritos ({grupo.estudiantes_list.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 text-[var(--color-text-secondary)]">Matrícula</th>
                  <th className="text-left p-4 text-[var(--color-text-secondary)]">Nombre</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">
                    Promedio Actual
                  </th>
                </tr>
              </thead>
              <tbody>
                {grupo.estudiantes_list.map((estudiante: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <td className="p-4 text-[var(--color-purple-light)]">
                      {estudiante.matricula}
                    </td>
                    <td className="p-4">{estudiante.nombre}</td>
                    <td className="p-4 text-center">
                      <span className={`text-xl ${getPromedioColor(estudiante.promedio)}`}>
                        {estudiante.promedio}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
