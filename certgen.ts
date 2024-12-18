import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const isWindows = process.platform === 'win32';

const cmd = isWindows
  ? 'mkdir certs && cd .\\certs\\ && openssl req -x509 -newkey rsa:4096 -keyout app.key -out app.crt -days 365 -nodes -subj "/CN=localhost"'
  : 'mkdir -p certs && cd ./certs && openssl req  -x509 -newkey rsa:4096 -keyout app.key -out app.crt -days 365 -nodes -subj "/CN=localhost"';

const loadCertData = (keyUri: string, certUri: string) => {
  let devServerKey = path.resolve(__dirname, keyUri);
  let devServerCert = path.resolve(__dirname, certUri);

  if (isWindows) {
    devServerKey = '/' + devServerKey.replace(/[A-Z]:/g, '').replace(/[/\\]/g, '/').replace(/^\/+/, '');
    devServerCert = '/' + devServerCert.replace(/[A-Z]:/g, '').replace(/[/\\]/g, '/').replace(/^\/+/, '');
  }

  return { devServerKey, devServerCert };
};

export default (keyUrl: string, certUrl: string): Promise<{ devServerKey: string; devServerCert: string }> =>
  new Promise((resolve, reject) => {
    const localCertExists =
      fs.existsSync(path.resolve(__dirname, keyUrl)) && fs.existsSync(path.resolve(__dirname, certUrl));

    if (localCertExists) {
      console.log('Loading ssl certs from certs dir at project root...');

      return resolve(loadCertData('./certs/app.key', './certs/app.crt'));
    } else {
      console.log('Could not find ssl certs, generating them in certs dir at project root...');
      exec(cmd, (err: Error) => {
        if (err) {
          console.error(err);
          return reject(err);
        }

        return resolve(loadCertData('./certs/app.key', './certs/app.crt'));
      });
    }
  });
