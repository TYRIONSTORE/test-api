import config from '../config/index';
import { encryptAES256, decryptAES256} from './utilities';



export const decryptEncryptedApiKey = (encryptedApiKey: string, encryptionKey = config.get('encryption.apiKeyEncryptionKey')): string => {
  return decryptAES256(encryptedApiKey, encryptionKey);
  
};

export const encryptApiKey = (plainApiKey: string, encryptionKey = config.get('encryption.apiKeyEncryptionKey')): string => {
  return encryptAES256(plainApiKey, encryptionKey);
};


