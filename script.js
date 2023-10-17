import { config } from "dotenv";
config();

import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.API_KEY });
import readline from "readline";
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  console.log(res.choices[0].message.content);
  userInterface.prompt();
});
