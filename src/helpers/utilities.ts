import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';
import config from '../config';
import crypto, { createHash } from 'crypto';

export const generateAlphaNumericString = (length: number, prefix = ''): string => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, length);
  return `${prefix}${nanoid()}`;
};

export const hashString = async (plainText: string, saltRounds = 10): Promise<string> => {
  const hash = await bcrypt.hash(plainText, saltRounds);

  return hash;
};

export const isHashValid = async (plainText: string, hashText: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(plainText, hashText);

  return isValid;
};

export const generateJwt = (payload: { data?: { [key: string]: any }; sub?: string }): { token: string; expiryInSeconds: number } => {
  const privateKey = fs.readFileSync('./src/config/keys/oauth-private.key');
  const expiryInSeconds = config.get('jwt.expiry');

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    audience: config.get('app.baseUrl'),
    issuer: 'GeolandMark',
    expiresIn: expiryInSeconds
  });

  return { token, expiryInSeconds };
};

export const verifyJwt = (jwtToken: string): string | jwt.JwtPayload => {
  const publicKey = fs.readFileSync('./src/config/keys/oauth-public.key');

  const decoded = jwt.verify(jwtToken, publicKey, { audience: config.get('app.baseUrl'), issuer: 'GeolandMark', algorithms: ['RS256'] });

  return decoded;
};

export const isObject = (obj: { [key: string]: any } = {}): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};


export const generateApiKey = () : string  => {
  const apiKeyLength = 32;
  const randomBytes = Math.ceil(apiKeyLength / 2); 
  const hash = createHash('sha256');
  hash.update(crypto.randomBytes(randomBytes));

  return hash.digest('hex');
}




export const encryptAES256 = (clearText: any, encryptionKey: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
  const encrypted = cipher.update(clearText);

  return `${iv.toString('hex')}:${Buffer.concat([encrypted, cipher.final()]).toString('hex')}:${cipher.getAuthTag().toString('hex')}`;
};

/**
 *
 * @param cipherText
 * @param encryptionKey should be 32 characters
 * @returns string
 */
export const decryptAES256 = (cipherText: any, encryptionKey: string): string => {
  const [iv, encryptedText, authTag] = cipherText.split(':');

  const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  const decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
  return `${decrypted}${decipher.final()}`;
};
