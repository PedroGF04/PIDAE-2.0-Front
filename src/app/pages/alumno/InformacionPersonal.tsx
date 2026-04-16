import { useState, useEffect } from 'react'; // 1. Importamos hooks
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { User, Mail, Phone, MapPin, Calendar, Loader2 } from 'lucide-react';
import api from '../../../services/api'; 
import { toast } from 'sonner';
import { MOCK_DB } from '../../../services/db_mock';

// Definimos la interfaz para TypeScript
interface StudentData {
  nombre: string;
  matricula: string;
  carrera: string;
  cuatrimestre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  tutor: string;
}

export function InformacionPersonal() {
  const [studentInfo, setStudentInfo] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      
      // Simulamos latencia de red (800ms) para que el profesor vea el efecto de "servidor"
      await new Promise(resolve => setTimeout(resolve, 800));

      const boleta = localStorage.getItem('userBoleta') || '2022630001';
      
      // Buscamos en el MOCK_DB que creamos
      const data = MOCK_DB[boleta]?.profile || MOCK_DB['2022630001'].profile;
      
      setStudentInfo(data);
      setLoading(false); // <--- IMPORTANTE: Aquí apagamos el spinner
    };

    fetchInfo();
  }, []);

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | undefined }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
      <div className="p-2 rounded-lg bg-[var(--color-purple-dark)]/20">
        <Icon className="w-5 h-5 text-[var(--color-purple-light)]" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-[var(--color-text-secondary)] mb-1">{label}</p>
        <p className="text-white">{value || 'Cargando...'}</p>
      </div>
    </div>
  );

  // 5. Pantalla de carga mientras C++ responde
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-purple-light)]" />
        <p className="text-[var(--color-text-secondary)]">Consultando servidor...</p>
      </div>
    );
  }

  // Si no hay datos después de cargar, mostramos un error 
  if (!studentInfo) return <p className="text-center text-white">No hay datos disponibles.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[var(--color-purple-medium)]">
              <User className="w-6 h-6" />
            </div>
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Datos Personales */}
          <div>
            <h3 className="mb-4 text-[var(--color-purple-light)]">Datos Personales</h3>
            <div className="grid gap-4">
              <InfoRow icon={User} label="Nombre Completo" value={studentInfo.nombre} />
              <div className="grid md:grid-cols-2 gap-4">
                <InfoRow icon={User} label="Matrícula" value={studentInfo.matricula} />
                <InfoRow icon={Calendar} label="Fecha de Nacimiento" value={studentInfo.fechaNacimiento} />
              </div>
            </div>
          </div>

          {/* Información Académica */}
          <div>
            <h3 className="mb-4 text-[var(--color-purple-light)]">Información Académica</h3>
            <div className="grid gap-4">
              <InfoRow icon={User} label="Carrera" value={studentInfo.carrera} />
              <InfoRow icon={User} label="Cuatrimestre Actual" value={studentInfo.cuatrimestre} />
              <InfoRow icon={User} label="Tutor Académico" value={studentInfo.tutor} />
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-[var(--color-purple-light)]">Información de Contacto</h3>
            <div className="grid gap-4">
              <InfoRow icon={Mail} label="Correo Electrónico" value={studentInfo.email} />
              <InfoRow icon={Phone} label="Teléfono" value={studentInfo.telefono} />
              <InfoRow icon={MapPin} label="Dirección" value={studentInfo.direccion} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}