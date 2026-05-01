import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import IntervalSlider from "../components/IntervalSlider";
import LightBulbToggle from "../components/LightBulbToggle";
import ProjectHeader from "../components/ProjectHeader";
import SensorDataCard from "../components/SensorDataCard";
import { getMqttClient } from '../mqqt_client';

const subscribeTopics = ["sensors/lux", "sensors/temp"]

export default function Index() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [luxIntervalSeconds, setLuxIntervalSeconds] = useState(3);
  const [luxValue, setLuxValue] = useState("--");
  const [tempValue, setTempValue] = useState("--");
  const [temperatureIntervalSeconds, setTemperatureIntervalSeconds] = useState(5);

  useEffect(() => {
    const client = getMqttClient();

    const onConnect = () => {
      console.log("Connected");
      client.subscribe(subscribeTopics);
    };

    const onError = (error: Error) => {
      console.log(error);
    };

    const onMessage = (topic: string, message: any) => {
      const value = message.toString();
      console.log("Received Message:", topic, value);

      if (topic === "sensors/lux") {
        setLuxValue(value);
      }
      if (topic === "sensors/temp") {
        setTempValue(value);
      }
    };

    client.on("connect", onConnect);
    client.on("error", onError);
    client.on("message", onMessage);

    // Immediate subscribe if already connected before component mounts
    if (client.connected) {
      onConnect();
    }

    return () => {
      client.off("connect", onConnect);
      client.off("error", onError);
      client.off("message", onMessage);
      client.unsubscribe(subscribeTopics);
    };
  }, []);

  const handleToggleLight = () => {
    const state = !isLightOn
    setIsLightOn(state)
    getMqttClient().publish("sensors/light", state ? "on" : "off")
  }

  const handleLuxIntervalChange = (value: number) => {
    setLuxIntervalSeconds(value)
    getMqttClient().publish("sensors/lux/interval", String(value))
  }

  const handleTempIntervalChange = (value: number) => {
    setTemperatureIntervalSeconds(value);
    getMqttClient().publish("sensors/temp/interval", String(value))
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProjectHeader />

        <SensorDataCard luxValue={luxValue} temperatureValue={tempValue} />

        <LightBulbToggle isOn={isLightOn} onToggle={handleToggleLight} />

        <View style={styles.slidersWrapper}>
          <IntervalSlider
            label="Lux Interval"
            value={luxIntervalSeconds}
            onChange={handleLuxIntervalChange}
          />
          <IntervalSlider
            label="Temperature Interval"
            value={temperatureIntervalSeconds}
            onChange={handleTempIntervalChange}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 28,
  },
  slidersWrapper: {
    marginTop: 18,
    gap: 26,
  },
});
