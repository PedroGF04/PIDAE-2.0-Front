import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Send, FileText, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import { toast } from 'sonner';

export function EnviarReportes() {
  const [selectedReportes, setSelectedReportes] = useState<number[]>([]);

  const reportes = [
    {
      id: 1,
      nombre: 'Reporte de Calificaciones - Criptografía Grupo A',
      profesor: 'Dr. García',
      fecha: '2026-03-15',
      estado: 'Listo para enviar',
      estudiantes: 32,
    },
    {
      id: 2,
      nombre: 'Reporte de Calificaciones - Redes Grupo B',
      profesor: 'Ing. Martínez',
      fecha: '2026-03-14',
      estado: 'Listo para enviar',
      estudiantes: 28,
    },
    {
      id: 3,
      nombre: 'Reporte de Calificaciones - Base de Datos Grupo A',
      profesor: 'M.C. López',
      fecha: '2026-03-13',
      estado: 'Listo para enviar',
      estudiantes: 30,
    },
    {
      id: 4,
      nombre: 'Reporte de Calificaciones - Desarrollo Web Grupo C',
      profesor: 'Ing. Rodríguez',
      fecha: '2026-03-12',
      estado: 'Enviado',
      estudiantes: 25,
    },
  ];

  const historialEnvios = [
    {
      id: 1,
      nombre: 'Reporte Cuatrimestre 5 - Completo',
      fecha: '2025-12-20',
      reportes: 12,
    },
    {
      id: 2,
      nombre: 'Reporte Parcial 3',
      fecha: '2025-11-30',
      reportes: 8,
    },
    {
      id: 3,
      nombre: 'Reporte Parcial 2',
      fecha: '2025-10-15',
      reportes: 8,
    },
  ];

  const toggleReporte = (id: number) => {
    setSelectedReportes((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleEnviar = () => {
    if (selectedReportes.length === 0) {
      toast.error('Selecciona al menos un reporte para enviar');
      return;
    }
    toast.success(`${selectedReportes.length} reporte(s) enviado(s) a Servicios Escolares`);
    setSelectedReportes([]);
  };

  const reportesPendientes = reportes.filter((r) => r.estado !== 'Enviado');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Enviar Reportes a Servicios Escolares</h2>
        <p className="text-[var(--color-text-secondary)]">
          Gestiona el envío de reportes académicos verificados al departamento de servicios escolares
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Reportes Pendientes</p>
                <p className="text-3xl">{reportesPendientes.length}</p>
              </div>
              <Clock className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Reportes Enviados</p>
                <p className="text-3xl">{reportes.filter((r) => r.estado === 'Enviado').length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Seleccionados</p>
                <p className="text-3xl">{selectedReportes.length}</p>
              </div>
              <FileText className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reportes Disponibles para Envío</CardTitle>
            <Button
              onClick={handleEnviar}
              disabled={selectedReportes.length === 0}
              className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)] disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Seleccionados ({selectedReportes.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportes.map((reporte) => (
              <div
                key={reporte.id}
                className={`p-6 rounded-lg border transition-all ${
                  reporte.estado === 'Enviado'
                    ? 'border-[var(--border)] bg-[var(--color-bg-tertiary)] opacity-60'
                    : selectedReportes.includes(reporte.id)
                    ? 'border-[var(--color-purple-medium)] bg-[var(--color-bg-tertiary)]'
                    : 'border-[var(--border)] bg-[var(--color-bg-tertiary)] hover:border-[var(--color-purple-medium)]'
                }`}
              >
                <div className="flex items-start gap-4">
                  {reporte.estado !== 'Enviado' && (
                    <Checkbox
                      checked={selectedReportes.includes(reporte.id)}
                      onCheckedChange={() => toggleReporte(reporte.id)}
                      className="mt-1"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="mb-2">{reporte.nombre}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
                          <span>Profesor: {reporte.profesor}</span>
                          <span>Fecha: {reporte.fecha}</span>
                          <span>Estudiantes: {reporte.estudiantes}</span>
                        </div>
                      </div>
                      <Badge
                        className={
                          reporte.estado === 'Enviado'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }
                      >
                        {reporte.estado}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle>Historial de Envíos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {historialEnvios.map((envio) => (
              <div
                key={envio.id}
                className="p-4 rounded-lg border border-[var(--border)] bg-[var(--color-bg-tertiary)] flex items-center justify-between"
              >
                <div>
                  <h4 className="mb-1">{envio.nombre}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {envio.reportes} reportes enviados
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--color-text-secondary)]">{envio.fecha}</p>
                  <Badge className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">
                    Completado
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
