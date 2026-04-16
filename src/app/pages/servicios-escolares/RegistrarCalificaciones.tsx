import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Save, Upload, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

export function RegistrarCalificaciones() {
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');

  const grupos = [
    'Criptografía - Grupo A',
    'Redes de Computadoras - Grupo B',
    'Base de Datos Avanzadas - Grupo A',
    'Desarrollo Web - Grupo C',
  ];

  const estudiantes = [
    { matricula: 'A00123456', nombre: 'Juan Pérez García', calificacion: '' },
    { matricula: 'A00123457', nombre: 'María López Hernández', calificacion: '' },
    { matricula: 'A00123458', nombre: 'Carlos Rodríguez Martínez', calificacion: '' },
    { matricula: 'A00123459', nombre: 'Ana García López', calificacion: '' },
    { matricula: 'A00123460', nombre: 'Luis Martínez Sánchez', calificacion: '' },
  ];

  const handleSave = () => {
    toast.success('Calificaciones guardadas correctamente en el historial académico');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Registrar Calificaciones</h2>
        <p className="text-[var(--color-text-secondary)]">
          Ingresa las calificaciones que se guardarán en el historial académico de los alumnos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedGrupo} onValueChange={setSelectedGrupo}>
              <SelectTrigger className="bg-[var(--color-bg-tertiary)] border-[var(--border)]">
                <SelectValue placeholder="Selecciona un grupo" />
              </SelectTrigger>
              <SelectContent>
                {grupos.map((grupo) => (
                  <SelectItem key={grupo} value={grupo}>
                    {grupo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-lg">Periodo</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMateria} onValueChange={setSelectedMateria}>
              <SelectTrigger className="bg-[var(--color-bg-tertiary)] border-[var(--border)]">
                <SelectValue placeholder="Selecciona el periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parcial1">Parcial 1</SelectItem>
                <SelectItem value="parcial2">Parcial 2</SelectItem>
                <SelectItem value="parcial3">Parcial 3</SelectItem>
                <SelectItem value="final">Calificación Final</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {selectedGrupo && selectedMateria && (
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calificaciones - {selectedGrupo}</CardTitle>
              <Button
                variant="outline"
                className="border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left p-4 text-[var(--color-text-secondary)]">Matrícula</th>
                    <th className="text-left p-4 text-[var(--color-text-secondary)]">Nombre</th>
                    <th className="text-center p-4 text-[var(--color-text-secondary)]">Calificación</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantes.map((estudiante) => (
                    <tr
                      key={estudiante.matricula}
                      className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                    >
                      <td className="p-4 text-[var(--color-purple-light)]">{estudiante.matricula}</td>
                      <td className="p-4">{estudiante.nombre}</td>
                      <td className="p-4 text-center">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0-100"
                          className="max-w-[120px] mx-auto bg-[var(--color-bg-tertiary)] border-[var(--border)] text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[var(--border)]">
              <Button
                variant="outline"
                className="border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
              >
                <FileText className="w-4 h-4 mr-2" />
                Vista Previa
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar en Historial
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedGrupo && !selectedMateria && (
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-[var(--color-text-secondary)]" />
            <p className="text-[var(--color-text-secondary)]">
              Selecciona un grupo y periodo para comenzar a registrar calificaciones
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
