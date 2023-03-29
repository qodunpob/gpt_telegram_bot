export const getRequiredEnv = (envName: string): string => {
  const env = process.env[envName];
  if (env === undefined) {
    throw new Error(
      `The application cannot be started because "${envName}" is not set`
    );
  }
  return env;
};

export const getDependedEnv = (
  envName: string,
  flagEnvName: string
): string | undefined => {
  const env = process.env[envName];
  const flag = process.env[flagEnvName] === "true";
  if (flag && env === undefined) {
    throw new Error(
      `The application cannot be started because "${envName}" is not set while "${flagEnvName}" is true`
    );
  }
  return env;
};
