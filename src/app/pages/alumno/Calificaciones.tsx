import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FileText, TrendingUp } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

export function Calificaciones() {
  const calificaciones = [
    { materia: 'Criptografía', creditos: 6, calificacion: 95, estado: 'Aprobado' },
    { materia: 'Redes de Computadoras', creditos: 6, calificacion: 88, estado: 'Aprobado' },
    { materia: 'Base de Datos Avanzadas', creditos: 6, calificacion: 92, estado: 'Aprobado' },
    { materia: 'Desarrollo Web', creditos: 6, calificacion: 90, estado: 'Aprobado' },
    { materia: 'Inteligencia Artificial', creditos: 6, calificacion: 85, estado: 'Aprobado' },
    { materia: 'Arquitectura de Software', creditos: 6, calificacion: 78, estado: 'Aprobado' },
  ];

  const promedio = (calificaciones.reduce((sum, c) => sum + c.calificacion, 0) / calificaciones.length).toFixed(1);

  const getColorByGrade = (grade: number) => {
    if (grade >= 90) return 'text-green-400';
    if (grade >= 80) return 'text-blue-400';
    if (grade >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Promedio General</p>
                <p className="text-3xl">{promedio}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Materias Cursadas</p>
                <p className="text-3xl">{calificaciones.length}</p>
              </div>
              <FileText className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Créditos Totales</p>
                <p className="text-3xl">{calificaciones.reduce((sum, c) => sum + c.creditos, 0)}</p>
              </div>
              <FileText className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle>Calificaciones del Cuatrimestre Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 text-[var(--color-text-secondary)]">Materia</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Créditos</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Calificación</th>
                  <th className="text-center p-4 text-[var(--color-text-secondary)]">Estado</th>
                </tr>
              </thead>
              <tbody>
                {calificaciones.map((item, index) => (
                  <tr key={index} className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                    <td className="p-4">{item.materia}</td>
                    <td className="p-4 text-center text-[var(--color-text-secondary)]">{item.creditos}</td>
                    <td className="p-4 text-center">
                      <span className={`text-xl ${getColorByGrade(item.calificacion)}`}>
                        {item.calificacion}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {item.estado}
                      </Badge>
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
