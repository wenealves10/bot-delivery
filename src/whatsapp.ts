import { Whatsapp } from "venom-bot";

async function main(whatsapp: Whatsapp) {
  whatsapp.onAnyMessage(async (message) => {
    await whatsapp.sendText(message.chatId, "Hello World");
  });
}

export { main };
