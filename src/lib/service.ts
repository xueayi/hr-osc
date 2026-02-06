import { getConfig } from './config';
import { sendOscBool, sendOscFloat, sendOscInt } from './osc';

export type ServiceProps = {
  setConnected: (connected: boolean) => void;
  setHeartRate: (heartRate: number) => void;
};

let timeout: ReturnType<typeof setTimeout>;

export const connected = async (onConnected?: () => void) => {
  const config = await getConfig();

  console.info('connected');
  onConnected?.();
  clearTimeout(timeout);
  sendOscBool(config, config.osc_path_connected, true);
};

export const disconnected = async (onDisconnect?: () => void) => {
  const config = await getConfig();

  console.info('disconnected');
  onDisconnect?.();
  clearTimeout(timeout);
  sendOscBool(config, config.osc_path_connected, false);
};

export const getTimeoutSeconds = async () => {
  const config = await getConfig();
  return config.connected_timeout * 1000;
};

export const sendOscHeartRate = async (heartRate: number) => {
  const config = await getConfig();
  // 发送心率原始值（int）
  sendOscInt(config, config.osc_path_heart_rate, heartRate);
  // 发送心率百分比（float）
  sendOscFloat(config, config.osc_path_percent, heartRate / config.max_heart_rate);
};
