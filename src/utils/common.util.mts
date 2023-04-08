export const getRequiredEnv = (envName: string): string => {
  const env = process.env[envName];
  if (env === undefined) {
    throw new Error(
      `The application cannot be started because "${envName}" is not set`
    );
  }
  return env;
};
