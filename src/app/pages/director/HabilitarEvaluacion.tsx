import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Settings, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

export function HabilitarEvaluacion() {
  const periodos = [
    { id: 1, nombre: 'Parcial 1', fechaInicio: '2025-08-15', fechaFin: '2025-09-30', activo: true },
    { id: 2, nombre: 'Parcial 2', fechaInicio: '2025-10-01', fechaFin: '2025-11-15', activo: false },
    { id: 3, nombre: 'Parcial 3', fechaInicio: '2025-11-16', fechaFin: '2025-12-20', activo: false },
    { id: 4, nombre: 'Final', fechaInicio: '2026-01-05', fechaFin: '2026-01-25', activo: false },
  ];

  const handleToggle = (periodoNombre: string, enabled: boolean) => {
    if (enabled) {
      toast.success(`${periodoNombre} habilitado para evaluación`);
    } else {
      toast.info(`${periodoNombre} deshabilitado`);
    }
  };

  const handleHabilitarTodos = () => {
    toast.success('Todos los periodos han sido habilitados');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Habilitar Sistemas de Evaluación</h2>
        <p className="text-[var(--color-text-secondary)]">
          Gestiona los periodos de evaluación del cuatrimestre actual
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Periodos Activos</p>
                <p className="text-3xl">{periodos.filter((p) => p.activo).length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Total Periodos</p>
                <p className="text-3xl">{periodos.length}</p>
              </div>
              <Calendar className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Pendientes</p>
                <p className="text-3xl">{periodos.filter((p) => !p.activo).length}</p>
              </div>
              <Settings className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Periodos de Evaluación</CardTitle>
            <Button
              onClick={handleHabilitarTodos}
              className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
            >
              <Settings className="w-4 h-4 mr-2" />
              Habilitar Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {periodos.map((periodo) => (
              <div
                key={periodo.id}
                className="p-6 rounded-lg border border-[var(--border)] bg-[var(--color-bg-tertiary)] hover:border-[var(--color-purple-medium)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl">{periodo.nombre}</h3>
                      {periodo.activo && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--color-purple-light)]" />
                        <span>Inicio: {periodo.fechaInicio}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--color-purple-light)]" />
                        <span>Fin: {periodo.fechaFin}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label htmlFor={`periodo-${periodo.id}`} className="cursor-pointer">
                      {periodo.activo ? 'Habilitado' : 'Deshabilitado'}
                    </Label>
                    <Switch
                      id={`periodo-${periodo.id}`}
                      defaultChecked={periodo.activo}
                      onCheckedChange={(checked) => handleToggle(periodo.nombre, checked)}
                      className="data-[state=checked]:bg-[var(--color-purple-medium)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle>Configuración Global</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <div>
                <p className="mb-1">Permitir captura de calificaciones fuera de periodo</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Los profesores podrán capturar calificaciones aunque el periodo esté cerrado
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-[var(--color-purple-medium)]" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
              <div>
                <p className="mb-1">Notificar a profesores cuando se habilite un periodo</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Enviar correo automático cuando se active un nuevo periodo de evaluación
                </p>
              </div>
              <Switch
                defaultChecked
                className="data-[state=checked]:bg-[var(--color-purple-medium)]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
