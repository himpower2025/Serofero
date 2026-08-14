import type { CapacitorConfig } from '@capacitor/cli';

// appId: reverse-domain identifier. This becomes your iOS Bundle ID and
// Android Application ID — it CANNOT be changed after your first store
// submission, so confirm this is what you want before building.
// If Himpower Pvt. Ltd. owns a domain, the convention is com.<domain-without-tld>.<app>.
const config: CapacitorConfig = {
  appId: 'com.himpower.serofero',
  appName: 'Serofero',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
