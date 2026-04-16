import { Navigate } from 'react-router';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  userRole: string | null;       // El rol que obtuviste de C++
  allowedRoles: string[];        // Los roles que tienen permiso aquí
  isLoggedIn: boolean;           // ¿Hay una sesión activa?
}

export function ProtectedRoute({ 
  children, 
  userRole, 
  allowedRoles, 
  isLoggedIn 
}: ProtectedRouteProps) {
  
  // 1. Si no está logueado, mándalo al login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si está logueado pero su rol no tiene permiso, mándalo a su dashboard inicial
  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to={`/${userRole}`} replace />;
  }

  // 3. Si todo está bien, renderiza la página
  return <>{children}</>;
}