import type { Config, Default } from './config.interface';

export const configuration = async (): Promise<Config> => {
  const { config } = <{ config: Default }>await import(`./envs/default`);
  return config;
};
