import mqtt from "mqtt";

let client = null;

export function getMqttClient() {
  if (client) return client;

  const options = {
    host: process.env.EXPO_PUBLIC_MQTT_HOST,
    port: Number(process.env.EXPO_PUBLIC_MQTT_PORT),
    protocol: process.env.EXPO_PUBLIC_MQTT_PROTOCOL,
    path: process.env.EXPO_PUBLIC_MQTT_PATH,
    username: process.env.EXPO_PUBLIC_MQTT_USERNAME,
    password: process.env.EXPO_PUBLIC_MQTT_PASSWORD,
  };

  client = mqtt.connect(options);
  return client;
}

export function closeMqttClient() {
  if (!client) return;
  client.end(true);
  client = null;
}
