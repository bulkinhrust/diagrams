import React from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import authStore from '@stores/auth/authStore';

const OAuthComponent: React.FC = () => {
  const navigate = useNavigate();
  const { login } = authStore;

  const handleLoginSuccess = (response: CredentialResponse) => {
    console.log('response', response);
    login(response);
    navigate('/diagrams');
  };

  const handleLoginFailure = () => {
    // Обработка ошибок авторизации
    console.error('Login Failed');
  };

  return (
    <GoogleLogin
      onError={handleLoginFailure} 
      onSuccess={handleLoginSuccess}
      shape="pill"
      type="icon"
      auto_select
    />
  );
};

export default OAuthComponent;