import { HfInference } from "@huggingface/inference";

const inference = new HfInference("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");

export const getIneference = async () => {
  for await (const chunk of inference.chatCompletionStream({
    model: "microsoft/Phi-3-mini-4k-instruct",
    messages: [{ role: "user", content: "What is the capital of nigeria" }],
    max_tokens: 500,
  })) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
};
