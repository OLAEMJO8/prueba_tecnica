import axios from 'axios';
import React, { useState } from 'react';
import Button from '../Components/Utils/Button';
import Card from '../Components/Utils/Card';

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3000/api/recover-password', { email });

      if (response.status === 200) {
        setMessage('Se ha enviado un correo de recuperación de contraseña.');
      }
    } catch (error) {
      if (error.response) {
 
        setMessage(error.response.data.message);
      } else {
       
        console.error('Error al solicitar recuperación de contraseña:', error);
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    
        <Card>

        <h2 className="text-2xl font-semibold text-center">Recuperación de Contraseña</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-2 border rounded-md  text-gray-700 "
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="text-red-500">{message}</div>
          <div className="mt-4">
            <Button
             
            >
              Enviar Correo de Recuperación
            </Button>
          </div>
        </form>
        </Card>
    
    </div>
  );
}

export default PasswordRecovery;
