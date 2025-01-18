const { Kafka } = require("kafkajs");

// Kafka client
const kafka = new Kafka({
  clientId: "simple-producer-consumer-application",
  brokers: ["localhost:9092"],
});

const producerRun = async () => {
  // Kafka Producer
  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "simple-topic",
    messages: [
      {
        value: "Second Message",
      },
    ],
  });

  await producer.send({
    topic: "simple-topic",
    messages: [
      {
        value: "My First Nodejs Message",
      },
    ],
  });

  await producer.disconnect();
};

const startConsumer = async () => {
  // Kafka Consumer
  const consumer = kafka.consumer({ groupId: "simple-group" });

  await consumer.connect();

  await consumer.subscribe({ topic: "simple-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: `consumer reading ${message.value.toString()}`,
      });
    },
  });
};

producerRun().then(() => {
  startConsumer();
});
