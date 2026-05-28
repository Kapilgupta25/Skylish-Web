import { MongoClient } from "mongodb";

const options = {};

let clientPromise;

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return uri;
}

function getClientPromise() {
  if (process.env.NODE_ENV === "development") {
    if (!globalThis._mongoClientPromise) {
      const client = new MongoClient(getMongoUri(), options);
      globalThis._mongoClientPromise = client.connect().catch((error) => {
        globalThis._mongoClientPromise = undefined;
        throw error;
      });
    }

    return globalThis._mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(getMongoUri(), options);
    clientPromise = client.connect().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  return clientPromise;
}

export async function getDatabase() {
  const mongoClient = await getClientPromise();

  return mongoClient.db(process.env.MONGODB_DB || "skylish");
}

export default getClientPromise;
