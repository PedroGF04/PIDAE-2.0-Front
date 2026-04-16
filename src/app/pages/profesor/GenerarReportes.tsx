import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FileText, Download, Send, Calendar, Save, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

export function GenerarReportes() {
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [calificaciones, setCalificaciones] = useState<Record<string, string>>({});
  const [reporteGenerado, setReporteGenerado] = useState(false);
  const [firmaProfesor, setFirmaProfesor] = useState('');

  const grupos = [
    'Criptografía Básica - Grupo A',
    'Criptografía Intermedia - Grupo A',
    'Criptografía Avanzada - Grupo B',
  ];

  const periodos = ['Parcial 1', 'Parcial 2', 'Parcial 3', 'Final'];

  const estudiantes = [
    { matricula: 'A00123456', nombre: 'Juan Pérez García' },
    { matricula: 'A00123457', nombre: 'María López Hernández' },
    { matricula: 'A00123458', nombre: 'Carlos Rodríguez Martínez' },
    { matricula: 'A00123459', nombre: 'Ana García López' },
    { matricula: 'A00123460', nombre: 'Luis Martínez Sánchez' },
  ];

  const handleCalificacionChange = (matricula: string, value: string) => {
    setCalificaciones((prev) => ({
      ...prev,
      [matricula]: value,
    }));
  };

  const handleGuardarCalificaciones = () => {
    if (!selectedGrupo || !selectedPeriodo) {
      toast.error('Selecciona un grupo y periodo');
      return;
    }

    const calificacionesIngresadas = Object.keys(calificaciones).length;
    if (calificacionesIngresadas === 0) {
      toast.error('Ingresa al menos una calificación');
      return;
    }

    toast.success(`${calificacionesIngresadas} calificaciones guardadas correctamente`);
  };

  const handleGenerarReporte = () => {
    if (!selectedGrupo || !selectedPeriodo) {
      toast.error('Selecciona un grupo y periodo');
      return;
    }

    const calificacionesIngresadas = Object.keys(calificaciones).length;
    if (calificacionesIngresadas === 0) {
      toast.error('Ingresa al menos una calificación');
      return;
    }

    // Generar firma digital del profesor (simulación con hash)
    const timestamp = new Date().getTime();
    const dataToSign = `${selectedGrupo}-${selectedPeriodo}-${timestamp}-profesor`;
    const hashSimulado = btoa(dataToSign).substring(0, 24) + '...';
    
    setFirmaProfesor(hashSimulado);
    setReporteGenerado(true);
    
    toast.success('Reporte generado y firmado digitalmente por el profesor');
  };

  const handleEnviarDirector = () => {
    if (!selectedGrupo || !selectedPeriodo) {
      toast.error('Genera un reporte primero');
      return;
    }

    if (!reporteGenerado) {
      toast.error('Debes generar el reporte primero');
      return;
    }

    toast.success('Reporte enviado al Director para verificación y firma');
  };

  const handleDescargar = () => {
    if (!reporteGenerado) {
      toast.error('Debes generar el reporte primero');
      return;
    }
    toast.success('Reporte descargado exitosamente');
  };

  const calcularPromedio = () => {
    const valores = Object.values(calificaciones)
      .filter((v) => v !== '')
      .map(Number);
    if (valores.length === 0) return 0;
    return (valores.reduce((sum, v) => sum + v, 0) / valores.length).toFixed(1);
  };

  const getColorByGrade = (grade: number) => {
    if (grade >= 90) return 'text-green-400';
    if (grade >= 80) return 'text-blue-400';
    if (grade >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Generar Reportes de Calificaciones</h2>
        <p className="text-[var(--color-text-secondary)]">
          Registra las calificaciones por grupo y genera reportes para el Director
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
            <CardTitle className="text-lg">Periodo de Evaluación</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
              <SelectTrigger className="bg-[var(--color-bg-tertiary)] border-[var(--border)]">
                <SelectValue placeholder="Selecciona el periodo" />
              </SelectTrigger>
              <SelectContent>
                {periodos.map((periodo) => (
                  <SelectItem key={periodo} value={periodo}>
                    {periodo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {selectedGrupo && selectedPeriodo && (
        <>
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registrar Calificaciones</CardTitle>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {selectedGrupo} - {selectedPeriodo}
                  </p>
                </div>
                <Button
                  onClick={handleGuardarCalificaciones}
                  variant="outline"
                  className="border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Calificaciones
                </Button>
                <Button
                  onClick={handleGenerarReporte}
                  className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Generar Reporte y Firmar
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
                      <th className="text-center p-4 text-[var(--color-text-secondary)]">
                        Calificación (0-100)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudiantes.map((estudiante) => (
                      <tr
                        key={estudiante.matricula}
                        className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                      >
                        <td className="p-4 text-[var(--color-purple-light)]">
                          {estudiante.matricula}
                        </td>
                        <td className="p-4">{estudiante.nombre}</td>
                        <td className="p-4 text-center">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0-100"
                            value={calificaciones[estudiante.matricula] || ''}
                            onChange={(e) =>
                              handleCalificacionChange(estudiante.matricula, e.target.value)
                            }
                            className="max-w-[120px] mx-auto bg-[var(--color-bg-tertiary)] border-[var(--border)] text-center"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--border)]">
                <h4 className="mb-3">Vista Previa de Estadísticas</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                      Promedio Calculado
                    </p>
                    <p className="text-2xl text-[var(--color-purple-light)]">
                      {calcularPromedio()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                      Calificaciones Capturadas
                    </p>
                    <p className="text-2xl text-blue-400">
                      {Object.keys(calificaciones).filter((k) => calificaciones[k] !== '').length} /{' '}
                      {estudiantes.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                      Calificación Más Alta
                    </p>
                    <p className="text-2xl text-green-400">
                      {Object.values(calificaciones).length > 0
                        ? Math.max(
                            ...Object.values(calificaciones)
                              .filter((v) => v !== '')
                              .map(Number)
                          )
                        : 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Firma Digital y Acciones */}
              {reporteGenerado && (
                <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-[var(--color-purple-light)]" />
                      Firma Digital del Profesor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-purple-medium)]/30 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-[var(--color-purple-medium)]/20">
                          <Shield className="w-6 h-6 text-[var(--color-purple-light)]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-2 text-[var(--color-purple-light)]">Reporte Firmado Digitalmente</h4>
                          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            Este reporte ha sido firmado digitalmente por el profesor usando SHA-128.
                            La firma garantiza la autenticidad e integridad del documento.
                          </p>
                          <div className="flex items-center gap-2 p-3 rounded bg-[var(--color-bg-primary)] border border-[var(--border)]">
                            <span className="text-xs text-[var(--color-text-secondary)]">Firma Digital:</span>
                            <code className="text-xs text-[var(--color-purple-light)] font-mono">
                              {firmaProfesor}
                            </code>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Firmado por Profesor
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              SHA-128
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleDescargar}
                        variant="outline"
                        className="flex-1 border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar PDF
                      </Button>
                      <Button
                        onClick={handleEnviarDirector}
                        className="flex-1 bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar a Director
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[var(--color-purple-light)]" />
                Información del Reporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    Fecha de Generación
                  </p>
                  <p>16 de Marzo de 2026</p>
                </div>
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">Estado</p>
                  <Badge className={reporteGenerado ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}>
                    {reporteGenerado ? 'Firmado' : 'En Captura'}
                  </Badge>
                </div>
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    Total de Estudiantes
                  </p>
                  <p>{estudiantes.length}</p>
                </div>
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">Profesor</p>
                  <p>Dr. García</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!selectedGrupo && !selectedPeriodo && (
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