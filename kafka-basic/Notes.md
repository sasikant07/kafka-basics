## npm install kafkajs

## Step 3: Kafka Producer Example in Node.js
<!-- 
The Kafka producer sends messages to Kafka topics. Here's how you can implement a producer in Node.js:

javascript
Copy
// producer.js

const { Kafka } = require('kafkajs');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // list of Kafka brokers
});

const producer = kafka.producer();

const run = async () => {
  // Connect the producer to Kafka
  await producer.connect();

  // Produce messages to the topic 'my-topic'
  try {
    await producer.send({
      topic: 'my-topic',
      messages: [
        { value: 'Hello Kafka from Node.js' },
        { value: 'This is a test message' },
        { value: 'Kafka is awesome!' },
      ],
    });

    console.log('Messages sent successfully');
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
  }

  // Disconnect the producer
  await producer.disconnect();
};

run().catch(console.error);
-->

## Step 4: Kafka Consumer Example in Node.js
<!-- 

A Kafka consumer reads messages from a Kafka topic. Here's an example consumer in Node.js:

javascript
Copy
// consumer.js

const { Kafka } = require('kafkajs');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // list of Kafka brokers
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const run = async () => {
  // Connect the consumer to Kafka
  await consumer.connect();

  // Subscribe to the topic 'my-topic'
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  // Consume messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

run().catch(console.error);

-->

## Step 5: Kafka Error Handling and Logging
<!--

To make your Kafka producer and consumer more robust, it is important to handle errors effectively and log important events.

Error Handling in Producer:
javascript
Copy
const run = async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'my-topic',
      messages: [{ value: 'Hello Kafka from Node.js' }],
    });
    console.log('Message sent');
  } catch (error) {
    console.error('Error in Producer:', error);
  } finally {
    await producer.disconnect();
  }
};
Error Handling in Consumer:
javascript
Copy
const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Message received: ${message.value.toString()}`);
      },
    });
  } catch (error) {
    console.error('Error in Consumer:', error);
  } finally {
    await consumer.disconnect();
  }
};

-->

## Step 6: Managing Topics and Partitions
<!-- 

Kafka topics are central to how messages are organized and consumed. You can dynamically create topics or use existing ones.

Creating a Topic: Kafka topics can be created using the Kafka CLI or programmatically using admin.createTopics().
Listing Topics: You can list existing topics using admin.listTopics().
Example of managing topics in Node.js:

javascript
Copy
// admin.js

const { Kafka } = require('kafkajs');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'admin-app',
  brokers: ['localhost:9092'],
});

const admin = kafka.admin();

const run = async () => {
  try {
    await admin.connect();

    // Create a topic 'new-topic' with 1 partition and replication factor 1
    await admin.createTopics({
      topics: [{ topic: 'new-topic', numPartitions: 1, replicationFactor: 1 }],
    });

    console.log('Topic created successfully');

    // List topics
    const topics = await admin.listTopics();
    console.log('Existing topics:', topics);
  } catch (error) {
    console.error('Error managing topics:', error);
  } finally {
    await admin.disconnect();
  }
};

run().catch(console.error);

-->

## Step 7: Deploying Kafka and Using ZooKeeper (Optional)
<!-- 
If you're using older versions of Kafka, you will likely interact with ZooKeeper for broker coordination. However, recent versions of Kafka (2.x and beyond) have started to remove the dependency on ZooKeeper, simplifying the setup.

If you're using Kafka with ZooKeeper, make sure you configure the zookeeper.connect property in your Kafka configuration files.

-->



## Sources: 
`https://github.com/TusharVashishth/quick_chat/blob/main/server/src/config/kafka.config.ts`