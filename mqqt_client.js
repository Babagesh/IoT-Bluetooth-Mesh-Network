import mqtt from "mqtt";

let client = null;

function buildClientId() {
  // Unique per app launch. Shared IDs cause the broker to disconnect the other
  // session — random delays and missed sensor messages.
  return `expo-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getMqttClient() {
  if (client) return client;

  const options = {
    host: process.env.EXPO_PUBLIC_MQTT_HOST,
    port: Number(process.env.EXPO_PUBLIC_MQTT_PORT),
    protocol: process.env.EXPO_PUBLIC_MQTT_PROTOCOL,
    path: process.env.EXPO_PUBLIC_MQTT_PATH,
    username: process.env.EXPO_PUBLIC_USERNAME,
    password: process.env.EXPO_PUBLIC_PASSWORD,
    clientId: buildClientId(),
    clean: true,
    keepalive: 60,
    reconnectPeriod: 1000,
    connectTimeout: 30_000,
    /** Helps some brokers / RN WebSocket stacks deliver more reliably for telemetry */
    protocolVersion: 4,
  };

  client = mqtt.connect(options);
  return client;
}

export function closeMqttClient() {
  if (!client) return;
  client.end(true);
  client = null;
}
