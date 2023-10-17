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
let submit = document.getElementById("submit");
submit.addEventListener('click', fun);

function fun() {
    let username=document.getElementById("username").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    var p1 = document.getElementById("password1").value;
    var p2 = document.getElementById("password2").value;
    console.log(p1)
    console.log(p2)
     let wrongoutput = document.getElementById("wrongoutput");
    if (p1 !=p2) {
        wrongoutput.setAttribute("style", "color: blue");
        wrongoutput.textContent = "Password and Confirm Password are not the same";
    } else {
        wrongoutput.textContent = "";
    }
}