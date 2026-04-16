import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar, Clock } from 'lucide-react';

export function Horario() {
  const horario = {
    Lunes: [
      { materia: 'Criptografía', hora: '07:00 - 09:00', salon: 'A-201', profesor: 'Dr. García' },
      { materia: 'Redes de Computadoras', hora: '09:00 - 11:00', salon: 'B-105', profesor: 'Ing. Martínez' },
    ],
    Martes: [
      { materia: 'Base de Datos Avanzadas', hora: '07:00 - 09:00', salon: 'A-303', profesor: 'M.C. López' },
      { materia: 'Desarrollo Web', hora: '11:00 - 13:00', salon: 'C-202', profesor: 'Ing. Rodríguez' },
    ],
    Miércoles: [
      { materia: 'Criptografía', hora: '07:00 - 09:00', salon: 'A-201', profesor: 'Dr. García' },
      { materia: 'Inteligencia Artificial', hora: '09:00 - 11:00', salon: 'B-304', profesor: 'Dr. Hernández' },
    ],
    Jueves: [
      { materia: 'Base de Datos Avanzadas', hora: '07:00 - 09:00', salon: 'A-303', profesor: 'M.C. López' },
      { materia: 'Arquitectura de Software', hora: '11:00 - 13:00', salon: 'C-101', profesor: 'Ing. Pérez' },
    ],
    Viernes: [
      { materia: 'Desarrollo Web', hora: '07:00 - 09:00', salon: 'C-202', profesor: 'Ing. Rodríguez' },
      { materia: 'Inteligencia Artificial', hora: '09:00 - 11:00', salon: 'B-304', profesor: 'Dr. Hernández' },
    ],
  };

  const dias = Object.keys(horario);

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)] mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[var(--color-purple-medium)]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <CardTitle>Horario del Cuatrimestre</CardTitle>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Cuatrimestre 6 - Otoño 2025</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {dias.map((dia) => (
          <Card key={dia} className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[var(--color-purple-light)]">{dia}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {horario[dia as keyof typeof horario].map((clase, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--border)] hover:border-[var(--color-purple-medium)] transition-colors"
                  >
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <h4 className="mb-1">{clase.materia}</h4>
                        <p className="text-sm text-[var(--color-text-secondary)]">{clase.profesor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--color-purple-light)]" />
                        <span className="text-sm">{clase.hora}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[var(--color-purple-medium)]" />
                        <span className="text-sm">Salón {clase.salon}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
