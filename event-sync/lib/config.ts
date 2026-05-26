const requiredEnvVars = {
  JWT_SECRET: process.env.JWT_SECRET,
  API_BASE_URL: process.env.VITE_API_BASE_URL
} as const;

checkEnvVariables();

export function checkEnvVariables() {
  const missing: string[] = [];

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value || value.trim() === '') {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `❌ Variables d'environnement manquantes :\n${missing.map(v => `- ${v}`).join('\n')}\n\n` +
      `Veuillez les ajouter dans votre fichier .env.local`
    );
  }
}

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  
  if (!secret || secret.trim() === '') {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  if (process.env.NODE_ENV === 'production' && secret.length < 32) {
    console.warn('⚠️ JWT_SECRET est trop court en production (recommandé : 64 caractères minimum)');
  }
  return secret;
}

export const API_BASE_URL = process.env.VITE_API_BASE_URL;