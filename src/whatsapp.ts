import { Whatsapp } from "venom-bot";
import { sendMessage } from "./ia";

async function main(whatsapp: Whatsapp) {
  whatsapp.onMessage(async (message) => {
    try {
      const response = await sendMessage(message);
      const textClient = response.output;
      // textClient.generic.forEach(async ({ text }) => {
      //   await whatsapp.reply(message.from, text, message.id);
      // });
      console.log(textClient.generic);
    } catch (error) {
      console.log(error.message);
    }
  });
}

export { main };
