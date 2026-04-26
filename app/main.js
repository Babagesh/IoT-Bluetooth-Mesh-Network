import mqqt from 'mqqt';

const options = {
  host: process.env.EXPO_PUBLIC_MQTT_HOST,
  port: Number(process.env.EXPO_PUBLIC_MQTT_PORT),
  protocol: process.env.EXPO_PUBLIC_MQTT_PROTOCOL,
  username: process.env.EXPO_PUBLIC_MQTT_USERNAME,
  password: process.env.EXPO_PUBLIC_MQTT_PASSWORD,
};

var client = mqqt.connect(options)

client.on('connect', () => {
    console.log('Connected!')
})

client.on('error', function (error) {
    console.log(error);
});
