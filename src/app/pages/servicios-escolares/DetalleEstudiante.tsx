import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, BookOpen, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

export function DetalleEstudiante() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  const estudiantesData: Record<string, any> = {
    A00123456: {
      nombre: 'Juan Pérez García',
      matricula: 'A00123456',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '6to',
      promedio: 90.5,
      email: 'juan.perez@estudiante.edu.mx',
      telefono: '+52 55 1234 5678',
      direccion: 'Av. Universidad 123, Ciudad de México',
      fechaNacimiento: '15 de Marzo de 2004',
      estatus: 'Activo',
      creditosAcumulados: 180,
      grupo: 'Criptografía Intermedia - Grupo A',
      tutor: 'Dr. García',
      calificaciones: [
        { materia: 'Criptografía Básica', calificacion: 95, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Algoritmos', calificacion: 92, cuatrimestre: 'Cuatrimestre 4' },
        { materia: 'Programación Avanzada', calificacion: 88, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Matemáticas Discretas', calificacion: 87, cuatrimestre: 'Cuatrimestre 4' },
      ],
    },
    A00123457: {
      nombre: 'María López Hernández',
      matricula: 'A00123457',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '5to',
      promedio: 92.3,
      email: 'maria.lopez@estudiante.edu.mx',
      telefono: '+52 55 2345 6789',
      direccion: 'Calle Principal 456, Ciudad de México',
      fechaNacimiento: '22 de Julio de 2004',
      estatus: 'Activo',
      creditosAcumulados: 150,
      grupo: 'Criptografía Básica - Grupo B',
      tutor: 'Ing. Martínez',
      calificaciones: [
        { materia: 'Programación', calificacion: 96, cuatrimestre: 'Cuatrimestre 4' },
        { materia: 'Base de Datos', calificacion: 94, cuatrimestre: 'Cuatrimestre 4' },
        { materia: 'Redes', calificacion: 90, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Sistemas Operativos', calificacion: 89, cuatrimestre: 'Cuatrimestre 5' },
      ],
    },
    A00123458: {
      nombre: 'Carlos Rodríguez Martínez',
      matricula: 'A00123458',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '6to',
      promedio: 88.7,
      email: 'carlos.rodriguez@estudiante.edu.mx',
      telefono: '+52 55 3456 7890',
      direccion: 'Boulevard Norte 789, Ciudad de México',
      fechaNacimiento: '10 de Noviembre de 2003',
      estatus: 'Activo',
      creditosAcumulados: 180,
      grupo: 'Criptografía Intermedia - Grupo B',
      tutor: 'M.C. López',
      calificaciones: [
        { materia: 'Estructuras de Datos', calificacion: 90, cuatrimestre: 'Cuatrimestre 4' },
        { materia: 'Arquitectura de Computadoras', calificacion: 88, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Análisis de Algoritmos', calificacion: 87, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Cálculo Diferencial', calificacion: 89, cuatrimestre: 'Cuatrimestre 4' },
      ],
    },
    A00123459: {
      nombre: 'Ana García López',
      matricula: 'A00123459',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '7mo',
      promedio: 94.1,
      email: 'ana.garcia@estudiante.edu.mx',
      telefono: '+52 55 4567 8901',
      direccion: 'Avenida Central 321, Ciudad de México',
      fechaNacimiento: '5 de Enero de 2003',
      estatus: 'Activo',
      creditosAcumulados: 210,
      grupo: 'Criptografía Avanzada - Grupo A',
      tutor: 'Dr. Hernández',
      calificaciones: [
        { materia: 'Seguridad Informática', calificacion: 97, cuatrimestre: 'Cuatrimestre 6' },
        { materia: 'Inteligencia Artificial', calificacion: 95, cuatrimestre: 'Cuatrimestre 6' },
        { materia: 'Desarrollo Web', calificacion: 92, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Compiladores', calificacion: 93, cuatrimestre: 'Cuatrimestre 6' },
      ],
    },
    A00123460: {
      nombre: 'Luis Martínez Sánchez',
      matricula: 'A00123460',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '6to',
      promedio: 85.9,
      email: 'luis.martinez@estudiante.edu.mx',
      telefono: '+52 55 5678 9012',
      direccion: 'Paseo de la Reforma 654, Ciudad de México',
      fechaNacimiento: '18 de Septiembre de 2004',
      estatus: 'Activo',
      creditosAcumulados: 175,
      grupo: 'Criptografía Intermedia - Grupo A',
      tutor: 'Ing. Rodríguez',
      calificaciones: [
        { materia: 'Programación Orientada a Objetos', calificacion: 88, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Graficación', calificacion: 84, cuatrimestre: 'Cuatrimestre 5' },
        { materia: 'Teoría de la Computación', calificacion: 86, cuatrimestre: 'Cuatrimestre 6' },
        { materia: 'Redes de Computadoras', calificacion: 85, cuatrimestre: 'Cuatrimestre 6' },
      ],
    },
  };

  const estudiante = estudiantesData[matricula || ''];

  if (!estudiante) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-12 text-center">
            <p className="text-[var(--color-text-secondary)]">Estudiante no encontrado</p>
            <Button
              onClick={() => navigate('/servicios-escolares/estudiantes')}
              className="mt-4 bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
            >
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getPromedioColor = (promedio: number) => {
    if (promedio >= 90) return 'text-green-400';
    if (promedio >= 80) return 'text-blue-400';
    if (promedio >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate('/servicios-escolares/estudiantes')}
        className="mb-6 hover:bg-[var(--color-bg-tertiary)]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a Estudiantes
      </Button>

      {/* Información General */}
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-[var(--color-purple-medium)]">
                <User className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-1">{estudiante.nombre}</CardTitle>
                <p className="text-[var(--color-text-secondary)]">
                  Matrícula: {estudiante.matricula}
                </p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {estudiante.estatus}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Promedio General</p>
                <p className="text-3xl">{estudiante.promedio}</p>
              </div>
              <Award className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Cuatrimestre Actual</p>
                <p className="text-3xl">{estudiante.cuatrimestre}</p>
              </div>
              <BookOpen className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                  Créditos Acumulados
                </p>
                <p className="text-3xl">{estudiante.creditosAcumulados}</p>
              </div>
              <BookOpen className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Información Personal */}
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <Mail className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Correo Electrónico</p>
                <p>{estudiante.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <Phone className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Teléfono</p>
                <p>{estudiante.telefono}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <MapPin className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Dirección</p>
                <p>{estudiante.direccion}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <Calendar className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Fecha de Nacimiento</p>
                <p>{estudiante.fechaNacimiento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información Académica */}
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <CardTitle>Información Académica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <BookOpen className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Carrera</p>
                <p>{estudiante.carrera}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <User className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Grupo Actual</p>
                <p>{estudiante.grupo}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <User className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Tutor Académico</p>
                <p>{estudiante.tutor}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
              <Award className="w-5 h-5 text-[var(--color-purple-light)] mt-1" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Promedio Acumulado</p>
                <p className={`text-xl ${getPromedioColor(estudiante.promedio)}`}>
                  {estudiante.promedio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial de Calificaciones */}
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle>Historial de Calificaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 text-[var(--color-text-secondary)]">Materia</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Cuatrimestre</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">
                    Calificación
                  </th>
                </tr>
              </thead>
              <tbody>
                {estudiante.calificaciones.map((cal: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <td className="p-4">{cal.materia}</td>
                    <td className="p-4 text-center text-[var(--color-text-secondary)]">
                      {cal.cuatrimestre}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-xl ${getPromedioColor(cal.calificacion)}`}>
                        {cal.calificacion}
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
