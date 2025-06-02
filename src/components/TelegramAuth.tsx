import { LoginButton } from "@telegram-auth/react";
import { TelegramAuthData } from "@telegram-auth/react";
import { envConfig } from "@/envConfig";
import axios from "@/api/axios";
import { useState } from "react";

export const TelegramAuth = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (data: TelegramAuthData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/auth', data);
      localStorage.setItem('access_token', response.data.access_token);
      
      onSuccess();
    } catch (err) {
      setError('Ошибка авторизации');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginButton
      botUsername={envConfig.BOT_USERNAME}
      onAuthCallback={handleAuth}
      buttonSize="large"
      cornerRadius={20}
      requestAccess="write"
    />
  );
};
