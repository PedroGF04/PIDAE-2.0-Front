// Definimos los tipos para que TypeScript no nos marque error
export interface StudentProfile {
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

export interface Course {
  materia: string;
  calificacion: number;
  periodo: string;
  estado: 'Aprobada' | 'Reprobada' | 'Cursando';
}

// Nuestra "Base de Datos" de alumnos
export const MOCK_DB: Record<string, { profile: StudentProfile; courses: Course[] }> = {
  '2022630001': {
    profile: {
      nombre: 'Pedro Gasca Fragoso',
      matricula: '2022630001',
      carrera: 'Ingeniería en Sistemas Computacionales',
      cuatrimestre: '7mo Cuatrimestre',
      email: 'pedro.gasca@pidae.edu.mx',
      telefono: '55-1122-3344',
      direccion: 'Ecatepec de Morelos, EdoMex',
      fechaNacimiento: '15/05/2004',
      tutor: 'Dr. Distribuidos'
    },
    courses: [
      { materia: 'Sistemas Distribuidos', calificacion: 9, periodo: '2026-1', estado: 'Aprobada' },
      { materia: 'Criptografía', calificacion: 10, periodo: '2026-1', estado: 'Aprobada' },
      { materia: 'Redes de Computadoras', calificacion: 8, periodo: '2025-3', estado: 'Aprobada' }
    ]
  },
  '2022630002': {
    profile: {
      nombre: 'Hatziry Alejandra',
      matricula: '2022630002',
      carrera: 'Ingeniería en Sistemas Computacionales',
      cuatrimestre: '1er Cuatrimestre',
      email: 'hatziry.ale@pidae.edu.mx',
      telefono: '55-9988-7766',
      direccion: 'CDMX, México',
      fechaNacimiento: '20/10/2005',
      tutor: 'Mtra. Redes'
    },
    courses: [
      { materia: 'Fundamentos de Programación', calificacion: 10, periodo: '2026-1', estado: 'Cursando' },
      { materia: 'Cálculo Diferencial', calificacion: 9, periodo: '2026-1', estado: 'Cursando' }
    ]
  }
};

export interface ProfessorProfile {
  nombre: string;
  empleadoId: string;
  academia: string;
  email: string;
  cubiculo: string;
  gruposAsignados: string[];
}

// Extendemos nuestra base de datos para incluir personal
export const MOCK_DB_STAFF: Record<string, { profile: ProfessorProfile }> = {
  'profesor_distribuidos': {
    profile: {
      nombre: 'Mtro. Ricardo (Profesor)',
      empleadoId: 'EMP-2026-001',
      academia: 'Sistemas y Computación',
      email: 'ricardo.prof@pidae.edu.mx',
      cubiculo: 'C-12',
      gruposAsignados: ['7CM1', '7CM2', '8CM1']
    }
  },
  'director_pidae': {
    profile: {
      nombre: 'Dr. Manuel (Director)',
      empleadoId: 'DIR-2026-001',
      academia: 'Dirección Académica',
      email: 'manuel.dir@pidae.edu.mx',
      cubiculo: 'Oficina Principal - Edificio A',
      gruposAsignados: [] // El director ve todos
    }
  }
};