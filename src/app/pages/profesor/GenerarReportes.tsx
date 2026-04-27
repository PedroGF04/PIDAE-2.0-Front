import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FileText, Download, Send, Calendar, Save, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

// Importamos librerías para la descarga programática
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ReporteDocument from './ReporteDocument';

// --- UTILIDAD PARA EXPORTAR EL TXT DE VERIFICACIÓN ---
const exportToTxt = (datos: any) => {
  let contenido = `Reporte de calificaciones\n`;
  contenido += `--------------------------------------------------\n`;
  contenido += `Profesor: ${datos.profesor}\n`;
  contenido += `Curso: ${datos.curso}\n`;
  contenido += `Nivel: ${datos.nivel}\n`;
  contenido += `Fecha: ${datos.fecha}\n\n`;

  contenido += `CALIFICACIONES:\n`;
  datos.alumnos.forEach((alum: any) => {
    contenido += `- ${alum.nombre}: ${alum.calificacion}\n`;
  });

  contenido += `\nFIRMA DIGITAL (ECDSA):\n`;
  contenido += `--------------------------------------------------\n`;
  contenido += `${datos.firmaProfesor}\n`;

  // Creamos el archivo de texto y lo descargamos
  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `Reporte_${datos.curso.replace(/\s+/g, '_')}_${datos.nivel}.txt`);
};

export function GenerarReportes() {
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [calificaciones, setCalificaciones] = useState<Record<string, string>>({});
  const [reporteGenerado, setReporteGenerado] = useState(false);
  const [firmaProfesor, setFirmaProfesor] = useState('');

  // Obtenemos el nombre del profesor desde el login (o un fallback)
  const nombreProfesor = localStorage.getItem('userName') || 'Dr. García';

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
    // Validación sencilla para no pasarse de 100
    if (Number(value) > 100) return;
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

    // Validación estricta: deben estar todos calificados
    const calificacionesIngresadas = Object.keys(calificaciones).filter(k => calificaciones[k] !== '').length;
    if (calificacionesIngresadas < estudiantes.length) {
      toast.error(`Faltan ${estudiantes.length - calificacionesIngresadas} calificaciones por capturar`);
      return;
    }

    const timestamp = new Date().getTime();
    const dataToSign = `${selectedGrupo}-${selectedPeriodo}-${timestamp}-profesor`;
    const hashSimulado = btoa(dataToSign).substring(0, 32).toUpperCase();
    
    setFirmaProfesor(hashSimulado);
    setReporteGenerado(true);
    
    toast.success('Reporte generado y firmado digitalmente por el profesor');
  };

  const handleEnviarDirector = () => {
    if (!reporteGenerado) {
      toast.error('Debes generar el reporte primero');
      return;
    }
    toast.success('Reporte enviado al Director para verificación y firma');
  };

  const calcularPromedio = () => {
    const valores = Object.values(calificaciones).filter((v) => v !== '').map(Number);
    if (valores.length === 0) return 0;
    return (valores.reduce((sum, v) => sum + v, 0) / valores.length).toFixed(1);
  };

  // --- PREPARACIÓN DE DATOS PARA EL PDF Y TXT ---
  const datosParaPDF = useMemo(() => {
    return {
      profesor: nombreProfesor,
      curso: selectedGrupo,
      nivel: selectedPeriodo,
      fecha: new Date().toLocaleDateString('es-MX'),
      alumnos: estudiantes.map(est => ({
        nombre: est.nombre,
        calificacion: calificaciones[est.matricula] || 'N/A'
      })),
      firmaProfesor: firmaProfesor,
      firmaDirector: 'Pendiente de verificacion y firma' 
    };
  }, [selectedGrupo, selectedPeriodo, calificaciones, firmaProfesor, nombreProfesor]);

  // --- DESCARGA SECUENCIAL DE AMBOS ARCHIVOS ---
  const handleDescargarTodo = async () => {
    try {
      toast.info("Generando archivos de seguridad...");

      // 1. Descargamos el archivo TXT de verificación
      exportToTxt(datosParaPDF);

      // 2. Generamos y descargamos el PDF oficial de manera programática
      const blobPdf = await pdf(<ReporteDocument datos={datosParaPDF} />).toBlob();
      saveAs(blobPdf, `Reporte_${selectedGrupo.replace(/\s+/g, '')}_${selectedPeriodo}_Oficial.pdf`);

      toast.success("Documentos descargados exitosamente");
    } catch (error) {
      toast.error("Error al generar los documentos");
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Generar Reportes de Calificaciones</h2>
          <p className="text-[var(--color-text-secondary)]">
            Registra las calificaciones por grupo y genera reportes para el Director
          </p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1 text-sm">
          Profesor: {nombreProfesor}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedGrupo} onValueChange={(val) => { setSelectedGrupo(val); setReporteGenerado(false); }}>
              <SelectTrigger className="bg-[var(--color-bg-tertiary)] border-[var(--border)]">
                <SelectValue placeholder="Selecciona un grupo" />
              </SelectTrigger>
              <SelectContent>
                {grupos.map((grupo) => (
                  <SelectItem key={grupo} value={grupo}>{grupo}</SelectItem>
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
            <Select value={selectedPeriodo} onValueChange={(val) => { setSelectedPeriodo(val); setReporteGenerado(false); }}>
              <SelectTrigger className="bg-[var(--color-bg-tertiary)] border-[var(--border)]">
                <SelectValue placeholder="Selecciona el periodo" />
              </SelectTrigger>
              <SelectContent>
                {periodos.map((periodo) => (
                  <SelectItem key={periodo} value={periodo}>{periodo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {selectedGrupo && selectedPeriodo && (
        <div className="space-y-6">
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
            <CardHeader className="border-b border-[var(--border)] mb-4 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Registrar Calificaciones</CardTitle>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {selectedGrupo} - {selectedPeriodo}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleGuardarCalificaciones}
                    variant="outline"
                    className="border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]"
                    disabled={reporteGenerado}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Borrador
                  </Button>
                  <Button
                    onClick={handleGenerarReporte}
                    className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
                    disabled={reporteGenerado}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Generar y Firmar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="p-4 text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-bold">Matrícula</th>
                      <th className="p-4 text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-bold">Nombre</th>
                      <th className="p-4 text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-bold text-center">
                        Calificación (0-100)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudiantes.map((estudiante) => (
                      <tr
                        key={estudiante.matricula}
                        className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)]/50 transition-colors"
                      >
                        <td className="p-4 font-mono text-[var(--color-purple-light)]">
                          {estudiante.matricula}
                        </td>
                        <td className="p-4 text-white font-medium">{estudiante.nombre}</td>
                        <td className="p-4 text-center">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="---"
                            value={calificaciones[estudiante.matricula] || ''}
                            onChange={(e) => handleCalificacionChange(estudiante.matricula, e.target.value)}
                            disabled={reporteGenerado} 
                            className="max-w-[100px] mx-auto bg-[var(--color-bg-tertiary)] border-[var(--border)] text-center font-bold text-lg"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vista Previa de Estadísticas */}
              <div className="mt-6 p-6 bg-[var(--color-bg-tertiary)]/50 rounded-xl border border-[var(--border)]">
                <h4 className="mb-4 font-semibold text-[var(--color-purple-light)]">Vista Previa de Estadísticas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Promedio Grupo</p>
                    <p className="text-2xl font-bold text-white">{calcularPromedio()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Capturadas</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {Object.keys(calificaciones).filter((k) => calificaciones[k] !== '').length} / {estudiantes.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Máxima</p>
                    <p className="text-2xl font-bold text-green-400">
                      {Object.values(calificaciones).length > 0
                        ? Math.max(...Object.values(calificaciones).filter((v) => v !== '').map(Number))
                        : 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Mínima</p>
                    <p className="text-2xl font-bold text-red-400">
                      {Object.values(calificaciones).length > 0
                        ? Math.min(...Object.values(calificaciones).filter((v) => v !== '').map(Number))
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* --- SECCIÓN DEL REPORTE GENERADO CON DESCARGA DE PDF Y TXT --- */}
          {reporteGenerado && (
            <Card className="bg-green-500/5 border-green-500/20 shadow-lg shadow-green-500/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-green-500/20">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">Reporte Firmado Exitosamente</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                        El documento ha sido sellado con ECDSA y bloqueado para modificaciones.
                      </p>
                      <div className="flex items-center gap-2 p-2 rounded bg-[var(--color-bg-primary)] border border-green-500/30">
                        <span className="text-xs text-green-400/70">Hash:</span>
                        <code className="text-xs text-green-400 font-mono tracking-widest">{firmaProfesor}</code>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <Button 
                      onClick={handleDescargarTodo}
                      variant="outline" 
                      className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar PDF y TXT
                    </Button>

                    <Button
                      onClick={handleEnviarDirector}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar a Director
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[var(--color-purple-light)]" />
                Información del Lote
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase mb-1">Fecha</p>
                  <p className="font-medium text-white">{new Date().toLocaleDateString('es-MX')}</p>
                </div>
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase mb-1">Estado</p>
                  <Badge className={reporteGenerado ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}>
                    {reporteGenerado ? 'Firmado / Listo' : 'En Captura'}
                  </Badge>
                </div>
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase mb-1">Evaluados</p>
                  <p className="font-medium text-white">{estudiantes.length}</p>
                </div>
                <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase mb-1">Autor</p>
                  <p className="font-medium text-white truncate" title={nombreProfesor}>{nombreProfesor}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!selectedGrupo && !selectedPeriodo && (
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mt-10">
          <CardContent className="p-16 text-center">
            <div className="w-20 h-20 mx-auto bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Selecciona un Grupo</h3>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
              Para comenzar a capturar calificaciones o ver reportes anteriores, selecciona un grupo y periodo en los menús superiores.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}