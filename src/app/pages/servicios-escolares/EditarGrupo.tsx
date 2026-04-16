import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Save, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

export function EditarGrupo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const gruposData = {
    G1: { nombre: 'Criptografía Básica - Grupo A', profesor: 'Dr. García', estudiantes: 32, nivel: 'Básico', horario: 'Lun-Mié 07:00-09:00', salon: 'A-201' },
    G2: { nombre: 'Criptografía Básica - Grupo B', profesor: 'Ing. Martínez', estudiantes: 28, nivel: 'Básico', horario: 'Mar-Jue 09:00-11:00', salon: 'B-105' },
    G3: { nombre: 'Criptografía Intermedia - Grupo A', profesor: 'M.C. López', estudiantes: 30, nivel: 'Intermedio', horario: 'Lun-Mié 11:00-13:00', salon: 'A-303' },
    G4: { nombre: 'Criptografía Intermedia - Grupo B', profesor: 'Ing. Rodríguez', estudiantes: 25, nivel: 'Intermedio', horario: 'Mar-Jue 13:00-15:00', salon: 'C-202' },
    G5: { nombre: 'Criptografía Avanzada - Grupo A', profesor: 'Dr. Hernández', estudiantes: 27, nivel: 'Avanzado', horario: 'Vie 07:00-11:00', salon: 'B-304' },
    G6: { nombre: 'Criptografía Avanzada - Grupo B', profesor: 'Ing. Pérez', estudiantes: 29, nivel: 'Avanzado', horario: 'Vie 11:00-15:00', salon: 'C-101' },
  };

  const grupo = gruposData[id as keyof typeof gruposData];

  const handleSave = () => {
    toast.success('Cambios guardados exitosamente');
    navigate('/servicios-escolares/grupos');
  };

  if (!grupo) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-12 text-center">
            <p className="text-[var(--color-text-secondary)]">Grupo no encontrado</p>
            <Button
              onClick={() => navigate('/servicios-escolares/grupos')}
              className="mt-4 bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
            >
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate('/servicios-escolares/grupos')}
        className="mb-6 hover:bg-[var(--color-bg-tertiary)]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a Grupos
      </Button>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[var(--color-purple-medium)]">
              <Users className="w-6 h-6" />
            </div>
            Editar Grupo - {id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Información Básica */}
          <div>
            <h3 className="mb-4 text-[var(--color-purple-light)]">Información Básica</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Grupo</Label>
                <Input
                  id="nombre"
                  defaultValue={grupo.nombre}
                  className="bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nivel">Nivel</Label>
                  <Select defaultValue={grupo.nivel}>
                    <SelectTrigger className="bg-[var(--color-bg-tertiary)] border-[var(--border)]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profesor">Profesor Asignado</Label>
                  <Select defaultValue={grupo.profesor}>
                    <SelectTrigger className="bg-[var(--color-bg-tertiary)] border-[var(--border)]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. García">Dr. García</SelectItem>
                      <SelectItem value="Ing. Martínez">Ing. Martínez</SelectItem>
                      <SelectItem value="M.C. López">M.C. López</SelectItem>
                      <SelectItem value="Ing. Rodríguez">Ing. Rodríguez</SelectItem>
                      <SelectItem value="Dr. Hernández">Dr. Hernández</SelectItem>
                      <SelectItem value="Ing. Pérez">Ing. Pérez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Configuración de Horario */}
          <div>
            <h3 className="mb-4 text-[var(--color-purple-light)]">Configuración de Horario</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horario">Horario</Label>
                <Input
                  id="horario"
                  defaultValue={grupo.horario}
                  className="bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                  placeholder="Ej: Lun-Mié 07:00-09:00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salon">Salón</Label>
                <Input
                  id="salon"
                  defaultValue={grupo.salon}
                  className="bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                  placeholder="Ej: A-201"
                />
              </div>
            </div>
          </div>

          {/* Capacidad */}
          <div>
            <h3 className="mb-4 text-[var(--color-purple-light)]">Capacidad</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estudiantes">Estudiantes Actuales</Label>
                <Input
                  id="estudiantes"
                  type="number"
                  defaultValue={grupo.estudiantes}
                  className="bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                  disabled
                />
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Este valor se actualiza automáticamente
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacidad">Capacidad Máxima</Label>
                <Input
                  id="capacidad"
                  type="number"
                  defaultValue={35}
                  className="bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                />
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div>
            <h3 className="mb-4 text-[var(--color-purple-light)]">Estadísticas del Grupo</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                  Estudiantes Inscritos
                </p>
                <p className="text-2xl text-[var(--color-purple-light)]">{grupo.estudiantes}</p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                  Lugares Disponibles
                </p>
                <p className="text-2xl text-green-400">{35 - grupo.estudiantes}</p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Ocupación</p>
                <p className="text-2xl text-blue-400">
                  {Math.round((grupo.estudiantes / 35) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-3 pt-6 border-t border-[var(--border)]">
            <Button
              variant="outline"
              onClick={() => navigate('/servicios-escolares/grupos')}
              className="flex-1 border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
