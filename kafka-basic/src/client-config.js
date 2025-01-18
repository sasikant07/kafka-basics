const { Kafka } = require("kafkajs");

// Kafka client
const kafka = new Kafka({
  clientId: "simple-producer-consumer-application",
  brokers: ["localhost:9092"],
  connectionTimeout: 3000, // time is ms default value is 1000
  requestTimeout: 25000, // default 3000 ms
  retry: {
    intialretryTime: 100,
    retries: 8,
  },
  logLevel: logLevel.INFO,
});

kafka.logger();
