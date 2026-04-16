import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { createRouter } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  // Inicializamos el estado intentando leer del localStorage para persistencia básica
  const [selectedRole, setSelectedRole] = useState<string | null>(
    localStorage.getItem('userRole')
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem('userRole')
  );

  const handleLogin = (role: string) => {
    setSelectedRole(role);
    setIsLoggedIn(true);
    // Guardamos en el navegador para que no se borre al dar F5
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setSelectedRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userRole');
    localStorage.removeItem('token'); // Asumiendo que guardarás un token de C++
  };

  // Creamos el router pasando los nuevos parámetros: role, isLoggedIn, login y logout
  // selectedRole! le dice a TS que estamos seguros que no es null en este punto
  const router = createRouter(
    selectedRole || '', 
    isLoggedIn, 
    handleLogin, 
    handleLogout
  );

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}