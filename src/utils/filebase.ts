import { DynamoDBClient,ListTablesCommand } from "@aws-sdk/client-dynamodb";

console.log("hey")
const fileBase = async () => {
    const client = new DynamoDBClient({ region: "us-west-2" });
    const command = new ListTablesCommand({});
    try {
      const results = await client.send(command);
      console.log(results,"hey");
    } catch (err) {
      console.error(err);
    }
  };

  fileBase()