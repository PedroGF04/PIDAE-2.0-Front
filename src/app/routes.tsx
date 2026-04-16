import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Importación de componentes de Login
import { Login } from './components/Login';
import { ForgotPassword } from './components/ForgotPassword';

// Alumno pages
import { InformacionPersonal } from './pages/alumno/InformacionPersonal';
import { Calificaciones } from './pages/alumno/Calificaciones';
import { HistorialAcademico } from './pages/alumno/HistorialAcademico';
import { Horario } from './pages/alumno/Horario';

// Servicios Escolares pages
import { AdministracionGrupos } from './pages/servicios-escolares/AdministracionGrupos';
import { InformacionEstudiantes } from './pages/servicios-escolares/InformacionEstudiantes';
import { RegistrarCalificaciones } from './pages/servicios-escolares/RegistrarCalificaciones';
import { EditarGrupo } from './pages/servicios-escolares/EditarGrupo';
import { DetalleEstudiante } from './pages/servicios-escolares/DetalleEstudiante';

// Director pages
import { HabilitarEvaluacion } from './pages/director/HabilitarEvaluacion';
import { IntegridadReportes } from './pages/director/IntegridadReportes';
import { EnviarReportes } from './pages/director/EnviarReportes';

// Profesor pages
import { VerGrupos } from './pages/profesor/VerGrupos';
import { GenerarReportes } from './pages/profesor/GenerarReportes';
import { DetalleGrupo } from './pages/profesor/DetalleGrupo';

export const createRouter = (role: string, isLoggedIn: boolean, onLogin: (role: string) => void, onLogout: () => void) =>
  createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn 
        ? <Navigate to={`/${role}`} replace /> 
        : <Navigate to="/login" replace />,
    },
    {
      path: '/login',
      element: !isLoggedIn ? <Login onLogin={onLogin} /> : <Navigate to="/" replace />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },

    // --- Rutas de ALUMNO ---
    {
      path: '/alumno',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['alumno']} isLoggedIn={isLoggedIn}>
          <Layout role="alumno" onLogout={onLogout}><Navigate to="/alumno/informacion" replace /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/alumno/informacion',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['alumno']} isLoggedIn={isLoggedIn}>
          <Layout role="alumno" onLogout={onLogout}><InformacionPersonal /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/alumno/calificaciones',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['alumno']} isLoggedIn={isLoggedIn}>
          <Layout role="alumno" onLogout={onLogout}><Calificaciones /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/alumno/historial',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['alumno']} isLoggedIn={isLoggedIn}>
          <Layout role="alumno" onLogout={onLogout}><HistorialAcademico /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/alumno/horario',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['alumno']} isLoggedIn={isLoggedIn}>
          <Layout role="alumno" onLogout={onLogout}><Horario /></Layout>
        </ProtectedRoute>
      ),
    },

    // --- Rutas de SERVICIOS ESCOLARES ---
    {
      path: '/servicios-escolares',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['servicios-escolares']} isLoggedIn={isLoggedIn}>
          <Layout role="servicios-escolares" onLogout={onLogout}><Navigate to="/servicios-escolares/grupos" replace /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/servicios-escolares/grupos',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['servicios-escolares']} isLoggedIn={isLoggedIn}>
          <Layout role="servicios-escolares" onLogout={onLogout}><AdministracionGrupos /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/servicios-escolares/grupos/editar/:id',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['servicios-escolares']} isLoggedIn={isLoggedIn}>
          <Layout role="servicios-escolares" onLogout={onLogout}><EditarGrupo /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/servicios-escolares/estudiantes',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['servicios-escolares']} isLoggedIn={isLoggedIn}>
          <Layout role="servicios-escolares" onLogout={onLogout}><InformacionEstudiantes /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/servicios-escolares/estudiantes/detalle/:matricula',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['servicios-escolares']} isLoggedIn={isLoggedIn}>
          <Layout role="servicios-escolares" onLogout={onLogout}><DetalleEstudiante /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/servicios-escolares/calificaciones',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['servicios-escolares']} isLoggedIn={isLoggedIn}>
          <Layout role="servicios-escolares" onLogout={onLogout}><RegistrarCalificaciones /></Layout>
        </ProtectedRoute>
      ),
    },

    // --- Rutas de DIRECTOR ---
    {
      path: '/director',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['director']} isLoggedIn={isLoggedIn}>
          <Layout role="director" onLogout={onLogout}><Navigate to="/director/evaluacion" replace /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/director/evaluacion',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['director']} isLoggedIn={isLoggedIn}>
          <Layout role="director" onLogout={onLogout}><HabilitarEvaluacion /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/director/integridad',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['director']} isLoggedIn={isLoggedIn}>
          <Layout role="director" onLogout={onLogout}><IntegridadReportes /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/director/reportes',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['director']} isLoggedIn={isLoggedIn}>
          <Layout role="director" onLogout={onLogout}><EnviarReportes /></Layout>
        </ProtectedRoute>
      ),
    },

    // --- Rutas de PROFESOR ---
    {
      path: '/profesor',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['profesor']} isLoggedIn={isLoggedIn}>
          <Layout role="profesor" onLogout={onLogout}><Navigate to="/profesor/grupos" replace /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/profesor/grupos',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['profesor']} isLoggedIn={isLoggedIn}>
          <Layout role="profesor" onLogout={onLogout}><VerGrupos /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/profesor/grupos/detalle/:id',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['profesor']} isLoggedIn={isLoggedIn}>
          <Layout role="profesor" onLogout={onLogout}><DetalleGrupo /></Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: '/profesor/reportes',
      element: (
        <ProtectedRoute userRole={role} allowedRoles={['profesor']} isLoggedIn={isLoggedIn}>
          <Layout role="profesor" onLogout={onLogout}><GenerarReportes /></Layout>
        </ProtectedRoute>
      ),
    },

    // Fallback: Si no existe la ruta, manda a la raíz
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);