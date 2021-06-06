import AssistantV2 from "ibm-watson/assistant/v2";
import { IamAuthenticator } from "ibm-watson/auth";
import { Message, Whatsapp } from "venom-bot";
import { assistantId, tokenIA, version } from "../../tokens/tokenIA.json";

const service = new AssistantV2({
  version,
  authenticator: new IamAuthenticator({
    apikey: tokenIA,
  }),
});

let client = {
  result: {
    session_id: "",
  },
};

service
  .createSession({
    assistantId,
  })
  .then((res) => {
    client = res;
  })
  .catch((err) => {
    console.log(err);
  });

async function sendMessage(
  message: Message
): Promise<AssistantV2.MessageResponse> {
  try {
    const response = await service.message({
      assistantId,
      sessionId: client.result.session_id,
      input: {
        message_type: "text",
        text: message.body,
      },
    });
    return response.result;
  } catch (error) {
    throw new Error("Desculpe o sistema está fora do ar");
  }
}

async function deleteSession() {
  try {
    await service.deleteSession({
      assistantId,
      sessionId: client.result.session_id,
    });
  } catch (error) {
    throw new Error("Desculpe não existe mais sessão");
  }
}

export { sendMessage, deleteSession };
