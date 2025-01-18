const { Kafka } = require("kafkajs");

// Kafka client
const kafka = new Kafka({
  clientId: "simple-producer-consumer-application",
  brokers: ["localhost:9092"],
});

const startProducer = async () => {
  // Kafka Producer
  const producer = kafka.producer();

  await producer.connect();

  /* 
    Control the number of required acks.
    -1 = all insync replicas must acknowledge (default)
    0 = no acknowledgements
    1 = only waits for the leader to acknowledge
  */

  await producer.send({
    topic: "simple-topic",
    acks: -1,
    messages: [
      {
        key: "key1",
        value: "Second Message",
        headers: {
          "correlation-id": "uuid",
        },
        // partition: 0,
      },
      {
        key: "key2",
        value: "Third Message",
        // partition: 1,
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
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers.toString(),
        topic: topic,
        partition,
      });
    },
  });
};

startProducer().then(() => {
  startProducer();
});
