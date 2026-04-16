import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BookOpen, Award, TrendingUp } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

export function HistorialAcademico() {
  const historial = [
    {
      cuatrimestre: 'Cuatrimestre 6 - Otoño 2025',
      materias: [
        { nombre: 'Criptografía', calificacion: 95, creditos: 6 },
        { nombre: 'Redes de Computadoras', calificacion: 88, creditos: 6 },
        { nombre: 'Base de Datos Avanzadas', calificacion: 92, creditos: 6 },
      ],
    },
    {
      cuatrimestre: 'Cuatrimestre 5 - Primavera 2025',
      materias: [
        { nombre: 'Sistemas Operativos', calificacion: 90, creditos: 6 },
        { nombre: 'Programación Orientada a Objetos', calificacion: 94, creditos: 6 },
        { nombre: 'Estructura de Datos', calificacion: 87, creditos: 6 },
      ],
    },
    {
      cuatrimestre: 'Cuatrimestre 4 - Otoño 2024',
      materias: [
        { nombre: 'Algoritmos', calificacion: 92, creditos: 6 },
        { nombre: 'Matemáticas Discretas', calificacion: 85, creditos: 6 },
        { nombre: 'Arquitectura de Computadoras', calificacion: 88, creditos: 6 },
      ],
    },
  ];

  const calcularPromedio = (materias: any[]) => {
    const sum = materias.reduce((acc, m) => acc + m.calificacion, 0);
    return (sum / materias.length).toFixed(1);
  };

  const promedioGeneral = (
    historial.reduce((acc, sem) => {
      return acc + parseFloat(calcularPromedio(sem.materias));
    }, 0) / historial.length
  ).toFixed(1);

  const totalCreditos = historial.reduce((acc, sem) => {
    return acc + sem.materias.reduce((sum, m) => sum + m.creditos, 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-[var(--color-purple-dark)] to-[var(--color-purple-medium)] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Promedio Acumulado</p>
                <p className="text-3xl">{promedioGeneral}</p>
              </div>
              <Award className="w-10 h-10 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Créditos Acumulados</p>
                <p className="text-3xl">{totalCreditos}</p>
              </div>
              <BookOpen className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Cuatrimestres Cursados</p>
                <p className="text-3xl">{historial.length}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-[var(--color-purple-light)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {historial.map((sem, index) => (
          <Card key={index} className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--color-purple-light)]">{sem.cuatrimestre}</CardTitle>
                <Badge className="bg-[var(--color-purple-medium)]/20 text-[var(--color-purple-light)] border-[var(--color-purple-medium)]/30">
                  Promedio: {calcularPromedio(sem.materias)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left p-4 text-[var(--color-text-secondary)]">Materia</th>
                      <th className="text-center p-4 text-[var(--color-text-secondary)]">Créditos</th>
                      <th className="text-center p-4 text-[var(--color-text-secondary)]">Calificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem.materias.map((materia, mIndex) => (
                      <tr key={mIndex} className="border-b border-[var(--border)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                        <td className="p-4">{materia.nombre}</td>
                        <td className="p-4 text-center text-[var(--color-text-secondary)]">{materia.creditos}</td>
                        <td className="p-4 text-center">
                          <span className={`text-xl ${materia.calificacion >= 90 ? 'text-green-400' : materia.calificacion >= 80 ? 'text-blue-400' : 'text-yellow-400'}`}>
                            {materia.calificacion}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
