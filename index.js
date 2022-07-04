import { MongoClient } from "mongodb";
 
const uri = "mongodb+srv://user:Fruitbat63@cluster0.0o25cqe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const simulateAsyncPause = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });

let changeStream;

async function run() {
  try {
    await client.connect();
    const database = client.db("mqtt");
    const collection = database.collection("pm100");

    changeStream = collection.watch();

    changeStream.on("change", next => {

      console.log("received a change to the collection: \t", next);
    });
    
    await simulateAsyncPause();
    
    await collection.insertOne({
      
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    });
    
    await simulateAsyncPause();
    
    await changeStream.close();
    
    console.log("closed the change stream");
    
  } finally {
    
    await client.close();
  }
}
run().catch(console.dir);
