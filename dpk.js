const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function createHash(key) {
  return crypto.createHash("sha3-512").update(key).digest("hex");
}

exports.deterministicPartitionKey = (event) => {

  // If event is not passed, return 0 (TRIVIAL_PARTITION_KEY)
  if(!event) return TRIVIAL_PARTITION_KEY

  // If event is passed but partitionKey key is missing, stringify the event and return the hash
  if(!event.partitionKey) {
    return createHash(JSON.stringify(event))
  }

  // Get the key from event.partitionKey, if required, stringify it
  let key = (typeof event.partitionKey === "string") ? event.partitionKey : JSON.stringify(event.partitionKey)

  // If key length is greater than MAX_PARTITION_KEY_LENGTH, generate a new key
  if (key.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(key)
  }

  return key
};