import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Shield, CheckCircle2, AlertTriangle, FileCheck, Edit } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';

interface Reporte {
  id: number;
  nombre: string;
  profesor: string;
  fecha: string;
  integridad: number;
  estado: string;
  firmaProfesor: string;
  firmaDirector?: string;
  firmadoPorDirector: boolean;
}

export function IntegridadReportes() {
  const [hashToVerify, setHashToVerify] = useState('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [reportes, setReportes] = useState<Reporte[]>([
    {
      id: 1,
      nombre: 'Reporte de Calificaciones - Criptografía Básica Grupo A',
      profesor: 'Dr. García',
      fecha: '2026-03-15',
      integridad: 100,
      estado: 'Pendiente de Firma',
      firmaProfesor: 'Q3J5cHRvZ3JhZsOtYSBCw6F...',
      firmadoPorDirector: false,
    },
    {
      id: 2,
      nombre: 'Reporte de Calificaciones - Criptografía Intermedia Grupo B',
      profesor: 'Ing. Martínez',
      fecha: '2026-03-14',
      integridad: 100,
      estado: 'Firmado',
      firmaProfesor: '9c2d4e1f6a8b...',
      firmaDirector: 'RGlyZWN0b3ItRmlybWEt...',
      firmadoPorDirector: true,
    },
    {
      id: 3,
      nombre: 'Reporte de Calificaciones - Criptografía Avanzada Grupo A',
      profesor: 'M.C. López',
      fecha: '2026-03-13',
      integridad: 100,
      estado: 'Pendiente de Firma',
      firmaProfesor: '7b5e3f2a9d1c...',
      firmadoPorDirector: false,
    },
  ]);

  const verificarIntegridad = () => {
    toast.success('Verificación de integridad completada. Todos los reportes son válidos.');
  };

  const firmarReporte = (reporteId: number) => {
    const reporte = reportes.find((r) => r.id === reporteId);
    if (!reporte) return;

    if (reporte.firmadoPorDirector) {
      toast.error('Este reporte ya está firmado por el Director');
      return;
    }

    // Generar firma digital del director
    const timestamp = new Date().getTime();
    const dataToSign = `${reporte.nombre}-${timestamp}-director`;
    const firmaDirector = btoa(dataToSign).substring(0, 24) + '...';

    setReportes((prev) =>
      prev.map((r) =>
        r.id === reporteId
          ? {
              ...r,
              firmaDirector,
              firmadoPorDirector: true,
              estado: 'Firmado',
            }
          : r
      )
    );

    toast.success('Reporte firmado digitalmente por el Director. Ahora puede ser enviado a Servicios Escolares.');
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Firmado':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pendiente de Firma':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advertencia':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const promedioIntegridad =
    reportes.reduce((sum, r) => sum + r.integridad, 0) / reportes.length;

  const reportesFirmados = reportes.filter((r) => r.firmadoPorDirector).length;
  const reportesPendientes = reportes.filter((r) => !r.firmadoPorDirector).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Integridad de Reportes</h2>
        <p className="text-[var(--color-text-secondary)]">
          Verifica la autenticidad e integridad de los reportes académicos mediante criptografía
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Integridad Global</p>
                <p className="text-3xl">{promedioIntegridad.toFixed(1)}%</p>
              </div>
              <Shield className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Reportes Firmados</p>
                <p className="text-3xl">{reportesFirmados}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Pendientes de Firma</p>
                <p className="text-3xl">{reportesPendientes}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[var(--color-purple-light)]" />
              Sistema de Verificación Criptográfica
            </CardTitle>
            <Button
              onClick={verificarIntegridad}
              className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Verificar Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--border)]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[var(--color-purple-medium)]/20">
                <Shield className="w-6 h-6 text-[var(--color-purple-light)]" />
              </div>
              <div className="flex-1">
                <h4 className="mb-2">Algoritmo de Hash SHA-128</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Todos los reportes son protegidos mediante funciones criptográficas de hash para
                  garantizar su integridad y autenticidad. Cualquier modificación no autorizada será
                  detectada automáticamente.
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    SHA-128 Habilitado
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Firma Digital Activa
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verificador de Hash */}
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-[var(--color-purple-light)]" />
            Verificar Integridad de Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hash">Ingresa el Hash SHA-128 del reporte</Label>
              <Input
                id="hash"
                value={hashToVerify}
                onChange={(e) => setHashToVerify(e.target.value)}
                placeholder="Ej: 3a7f8d9e2b1c..."
                className="bg-[var(--color-bg-tertiary)] border-[var(--border)] font-mono mt-2"
              />
            </div>
            <Button
              onClick={() => {
                if (!hashToVerify) {
                  toast.error('Por favor ingresa un hash');
                  return;
                }
                // Simulación de verificación
                const isValid = reportes.some((r) => r.firmaProfesor === hashToVerify);
                if (isValid) {
                  setVerificationResult('valid');
                  toast.success('✓ Reporte verificado correctamente. La integridad es válida.');
                } else {
                  setVerificationResult('invalid');
                  toast.error('✗ Hash no encontrado o reporte modificado.');
                }
              }}
              className="bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
            >
              <Shield className="w-4 h-4 mr-2" />
              Verificar Hash
            </Button>

            {verificationResult && (
              <div
                className={`p-4 rounded-lg border ${
                  verificationResult === 'valid'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {verificationResult === 'valid' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <h4
                      className={
                        verificationResult === 'valid' ? 'text-green-400' : 'text-red-400'
                      }
                    >
                      {verificationResult === 'valid'
                        ? 'Verificación Exitosa'
                        : 'Verificación Fallida'}
                    </h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {verificationResult === 'valid'
                        ? 'El reporte no ha sido modificado y su integridad está garantizada.'
                        : 'El hash no coincide con ningún reporte registrado o el reporte ha sido alterado.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle>Reportes para Verificar y Firmar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportes.map((reporte) => (
              <div
                key={reporte.id}
                className="p-6 rounded-lg border border-[var(--border)] bg-[var(--color-bg-tertiary)] hover:border-[var(--color-purple-medium)] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="mb-2">{reporte.nombre}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
                      <span>Profesor: {reporte.profesor}</span>
                      <span>Fecha: {reporte.fecha}</span>
                    </div>
                  </div>
                  <Badge className={getEstadoColor(reporte.estado)}>{reporte.estado}</Badge>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-[var(--color-text-secondary)]">Nivel de Integridad</span>
                    <span className="text-[var(--color-purple-light)]">{reporte.integridad}%</span>
                  </div>
                  <Progress
                    value={reporte.integridad}
                    className="h-2 bg-[var(--color-bg-primary)]"
                  />
                </div>

                {/* Firma del Profesor */}
                <div className="mb-3 p-3 rounded bg-[var(--color-bg-primary)] border border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-[var(--color-text-secondary)]">Firma Digital del Profesor:</span>
                  </div>
                  <code className="text-xs text-green-400 font-mono">
                    {reporte.firmaProfesor}
                  </code>
                </div>

                {/* Firma del Director (si existe) */}
                {reporte.firmadoPorDirector && reporte.firmaDirector && (
                  <div className="mb-3 p-3 rounded bg-[var(--color-bg-primary)] border border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[var(--color-purple-light)]" />
                      <span className="text-xs text-[var(--color-text-secondary)]">Firma Digital del Director:</span>
                    </div>
                    <code className="text-xs text-[var(--color-purple-light)] font-mono">
                      {reporte.firmaDirector}
                    </code>
                  </div>
                )}

                {/* Botón de Firma */}
                {!reporte.firmadoPorDirector && (
                  <Button
                    onClick={() => firmarReporte(reporte.id)}
                    className="w-full bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Firmar Digitalmente como Director
                  </Button>
                )}

                {reporte.firmadoPorDirector && (
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <p className="text-sm text-green-400">
                        Reporte firmado y validado. Listo para enviar a Servicios Escolares.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
