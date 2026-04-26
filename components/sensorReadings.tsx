import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getMqttClient } from "../mqqt_client";

type TopicReading = {
  raw: string;
  parsed: unknown;
  updatedAt: number;
};

type SensorReadingsProps = {
  topics?: string[];
};

const DEFAULT_TOPICS = ["sensors/lux1", "sensors/lux2", "sensors/temp1"];

export default function SensorReadings({ topics = DEFAULT_TOPICS }: SensorReadingsProps) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [readings, setReadings] = useState<Record<string, TopicReading>>({});

  const topicSet = useMemo(() => new Set(topics), [topics]);

  useEffect(() => {
    const client = getMqttClient();
    setStatus(client.connected ? "connected" : "connecting");

    const subscribeToTopics = () => {
      if (!topics.length) return;
      client.subscribe(topics, { qos: 0 }, (err: Error | null) => {
        if (err) {
          setError(`Subscribe failed: ${err.message}`);
        }
      });
    };

    const onConnect = () => {
      setStatus("connected");
      setError("");
      subscribeToTopics();
    };

    const onReconnect = () => setStatus("reconnecting");
    const onOffline = () => setStatus("offline");
    const onError = (err: Error) => {
      setStatus("error");
      setError(err.message);
    };

    const onMessage = (topic: string, payload: any) => {
      if (!topicSet.has(topic)) return;

      const raw = payload.toString();
      let parsed: unknown = raw;

      try {
        parsed = JSON.parse(raw);
      } catch {
        // Keep raw text if payload is not JSON.
      }

      setReadings((prev) => ({
        ...prev,
        [topic]: {
          raw,
          parsed,
          updatedAt: Date.now(),
        },
      }));
    };

    client.on("connect", onConnect);
    client.on("reconnect", onReconnect);
    client.on("offline", onOffline);
    client.on("error", onError);
    client.on("message", onMessage);

    if (client.connected) {
      subscribeToTopics();
    }

    return () => {
      client.off("connect", onConnect);
      client.off("reconnect", onReconnect);
      client.off("offline", onOffline);
      client.off("error", onError);
      client.off("message", onMessage);
      client.unsubscribe(topics);
    };
  }, [topics, topicSet]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.status}>MQTT status: {status}</Text>
      {error ? <Text style={styles.error}>Error: {error}</Text> : null}

      {topics.map((topic) => {
        const reading = readings[topic];

        return (
          <View key={topic} style={styles.card}>
            <Text style={styles.topic}>{topic}</Text>
            <Text style={styles.time}>
              Last update: {reading ? new Date(reading.updatedAt).toLocaleTimeString() : "No data yet"}
            </Text>
            <Text style={styles.payload}>
              Value: {reading ? JSON.stringify(reading.parsed) : "-"}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 12,
  },
  status: {
    fontSize: 14,
    marginBottom: 8,
    color: "#1f3b5c",
  },
  error: {
    color: "#b00020",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#eef5ff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  topic: {
    fontSize: 16,
    fontWeight: "700",
    color: "#12345b",
  },
  time: {
    marginTop: 4,
    color: "#415a77",
  },
  payload: {
    marginTop: 4,
    color: "#243447",
  },
});

