import { createClient } from 'redis';
import config from '../config';
import { logger } from './logger';

const { username, password, host, port } = config.get('redis');

const client = createClient({ url: `redis://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${encodeURIComponent(host)}:${port}` });

client.on('connect', (): any => {
  logger.info('Redis client connected');
});

client.on('error', (err: any): any => {
  logger.error(`Redis: Something went wrong ${err}`);
});

export const initiateConnection = async (): Promise<void> => {
  await client.connect();
};

export const get = (key: string): Promise<string | null> => client.get(key);

export const set = async (key: string, value: number | string, expiryInMilliseconds?: number): Promise<string | null> => {
  const setValue = await client.set(key, value);

  if (expiryInMilliseconds) {
    await client.expire(key, expiryInMilliseconds / 1000);
  }

  return setValue;
};

export const del = (key: string): Promise<number> => client.del(key);

export const exists = (key: string): Promise<number> => client.exists(key);

export const expire = (key: string, expiryInMilliseconds: number): Promise<boolean> => client.expire(key, expiryInMilliseconds / 1000);

export const hSet = (key: string, field: string, value: number | string): Promise<number> => client.hSet(key, field, value);

export const hGet = (key: string, field: string): Promise<string | undefined> => client.hGet(key, field);

export const hGetAll = (key: string): Promise<{ [key: string]: string }> => client.hGetAll(key);
