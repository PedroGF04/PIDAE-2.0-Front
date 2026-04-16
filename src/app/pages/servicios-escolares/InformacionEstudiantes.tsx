import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Search, Eye, Mail, Phone } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router';

export function InformacionEstudiantes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const estudiantes = [
    {
      matricula: 'A00123456',
      nombre: 'Juan Pérez García',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '6to',
      promedio: 90.5,
      email: 'juan.perez@estudiante.edu.mx',
      telefono: '+52 55 1234 5678',
      estatus: 'Activo',
    },
    {
      matricula: 'A00123457',
      nombre: 'María López Hernández',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '5to',
      promedio: 92.3,
      email: 'maria.lopez@estudiante.edu.mx',
      telefono: '+52 55 2345 6789',
      estatus: 'Activo',
    },
    {
      matricula: 'A00123458',
      nombre: 'Carlos Rodríguez Martínez',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '6to',
      promedio: 88.7,
      email: 'carlos.rodriguez@estudiante.edu.mx',
      telefono: '+52 55 3456 7890',
      estatus: 'Activo',
    },
    {
      matricula: 'A00123459',
      nombre: 'Ana García López',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '7mo',
      promedio: 94.1,
      email: 'ana.garcia@estudiante.edu.mx',
      telefono: '+52 55 4567 8901',
      estatus: 'Activo',
    },
    {
      matricula: 'A00123460',
      nombre: 'Luis Martínez Sánchez',
      carrera: 'Ingeniería en Sistemas',
      cuatrimestre: '6to',
      promedio: 85.9,
      email: 'luis.martinez@estudiante.edu.mx',
      telefono: '+52 55 5678 9012',
      estatus: 'Activo',
    },
  ];

  const filteredEstudiantes = estudiantes.filter(
    (est) =>
      est.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPromedioColor = (promedio: number) => {
    if (promedio >= 90) return 'text-green-400';
    if (promedio >= 80) return 'text-blue-400';
    if (promedio >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Información de Estudiantes</h2>
        <p className="text-[var(--color-text-secondary)]">Consulta y gestiona la información de los estudiantes</p>
      </div>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
            <Input
              placeholder="Buscar por nombre o matrícula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[var(--color-bg-tertiary)] border-[var(--border)]"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle>Listado de Estudiantes ({filteredEstudiantes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 text-[var(--color-text-secondary)]">Matrícula</th>
                  <th className="text-left p-4 text-[var(--color-text-secondary)]">Nombre</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Cuatrimestre</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Promedio</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Estatus</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEstudiantes.map((estudiante) => (
                  <tr
                    key={estudiante.matricula}
                    className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <td className="p-4 text-[var(--color-purple-light)]">{estudiante.matricula}</td>
                    <td className="p-4">
                      <div>
                        <p>{estudiante.nombre}</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">{estudiante.carrera}</p>
                      </div>
                    </td>
                    <td className="p-4 text-center">{estudiante.cuatrimestre}</td>
                    <td className="p-4 text-center">
                      <span className={`text-xl ${getPromedioColor(estudiante.promedio)}`}>
                        {estudiante.promedio}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {estudiante.estatus}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
                        onClick={() => navigate(`/servicios-escolares/estudiantes/detalle/${estudiante.matricula}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalles
                      </Button>
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