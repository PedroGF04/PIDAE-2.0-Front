import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor ingresa tu correo institucional');
      return;
    }
    
    // Aquí es donde C++ enviaría el correo en el futuro
    toast.success('Se han enviado las instrucciones a tu correo');
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" 
         style={{ background: 'linear-gradient(135deg, var(--color-gradient-start) 0%, var(--color-gradient-end) 100%)' }}>
      <div className="w-full max-w-md">
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-center">Recuperar Contraseña</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6 text-center">
              Ingresa tu correo y te enviaremos un enlace para restablecer tu acceso.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@alumno.edu.mx"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[var(--color-bg-tertiary)] border-[var(--border)]"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)]">
                Enviar enlace
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-[var(--color-purple-light)] flex items-center justify-center gap-2 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}