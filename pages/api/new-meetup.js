import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    // BODY
    const body = req.body;

    // DB {username, password, dbname - imp things}
    const client = await MongoClient.connect(
      "mongodb+srv://vrajpatel4801:Do3BAnxmTzMI9DCD@meetup-cluster.abqjqi5.mongodb.net/meetups"
    );
    const db = client.db();

    // COLLECTION
    const meetupsCollection = db.collection("meetups");

    // POST
    const result = await meetupsCollection.insertOne(body);
    client.close();

    // RES
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
