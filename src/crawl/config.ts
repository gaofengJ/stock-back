import path from 'path';

const launchOptions: Record<string, any> = {
  timeout: 15000,
  ignoreHTTPSErrors: true,
  devtools: false,
  headless: false,
  executablePath: path.join(__dirname, '../chromium/chrome.exe'),
};

export default launchOptions;
