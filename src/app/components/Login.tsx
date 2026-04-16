import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { MOCK_DB, MOCK_DB_STAFF } from '../../services/db_mock';

interface LoginProps {
  onLogin: (role: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Por favor ingresa usuario y contraseña');
      return;
    }

    // --- LÓGICA DE VALIDACIÓN CON MOCK DB ---

    // Caso A: Es un Alumno (Buscamos en MOCK_DB por boleta)
    if (MOCK_DB[username]) {
      const alumno = MOCK_DB[username];
      
      // Guardamos datos en el "navegador" para que el Sidebar y Perfil los lean
      localStorage.setItem('userBoleta', username);
      localStorage.setItem('userName', alumno.profile.nombre);
      
      toast.success(`Bienvenido, ${alumno.profile.nombre}`);
      onLogin('alumno');
      return;
    }

    // Caso B: Es Personal (Profesor o Director - Buscamos en MOCK_DB_STAFF)
    if (MOCK_DB_STAFF[username]) {
      const staff = MOCK_DB_STAFF[username];
      
      localStorage.setItem('userBoleta', username); // ID de empleado
      localStorage.setItem('userName', staff.profile.nombre);
      
      // Decidimos el rol: si el ID contiene "director", le damos ese rol
      const roleToSet = username.toLowerCase().includes('director') ? 'director' : 'profesor';
      
      toast.success(`Bienvenido, ${staff.profile.nombre}`);
      onLogin(roleToSet);
      return;
    }

    // Caso C: No existe en nuestros Mocks
    toast.error('Credenciales incorrectas o boleta no registrada');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, var(--color-gradient-start) 0%, var(--color-gradient-end) 100%)',
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">PIDAE 2.0</h1>
          <p className="text-[var(--color-text-secondary)]">
            Plataforma Integral de Autenticación y Evaluación
          </p>
        </div>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-center">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <div className="flex justify-end">
                  <Link 
                    to="/forgot-password"
                    className="text-xs text-[var(--color-purple-light)] hover:underline hover:text-white transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]"
              >
                Iniciar Sesión
              </Button>
            </form>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
