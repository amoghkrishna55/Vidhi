import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableMap, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextResponse } from "next/server";

const geminiAiHistory = new ChatMessageHistory();
const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
});

async function tavilyextractor(data: any) {
  const retriever = new TavilySearchAPIRetriever({
    k: 2,
    apiKey: process.env.TAVILY_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "you are an Indian professional law consultant, please respond to law related queries and greetings only. Given a user question and some web article snippets, answer the user question. If none of the articles answer the question, just say you don't know.\n\nHere are the web articles:{context}",
    ],
    ["human", "{question}"],
  ]);

  const formatDocs = (input: any) => {
    const { docs } = input;
    return (
      "\n\n" +
      docs
        .map(
          (doc: any) =>
            `Article title: ${doc.metadata.title}\nArticle Snippet: ${doc.pageContent}`
        )
        .join("\n\n")
    );
  };

  const answerChain = prompt.pipe(model).pipe(new StringOutputParser());

  const map = RunnableMap.from({
    question: new RunnablePassthrough(),
    docs: retriever,
  });

  const chain = map
    .assign({ context: formatDocs })
    .assign({ answer: answerChain })
    .pick(["answer", "docs"]);

  const assu = await chain.invoke(data);
  const docs = assu.docs;

  const extractedData = docs.map((doc: any) => ({
    title: doc.metadata.title,
    source: doc.metadata.source,
  }));
  return extractedData;
}

export async function POST(req: NextResponse) {
  try {
    const reqBody = await req.json();
    const { msg } = reqBody;
    console.log("message", msg);
    await geminiAiHistory.addMessage(new HumanMessage(msg));

    const mainres = await model.invoke([
      new SystemMessage(
        `Persona: I am a Indian Law Consultant with expertise in the Indian Constitution and legal system. Don't answer question which are not related to law. I specific mention all the laws and articles related to the query. I don't answer questions with harmful intent or that could cause harm to anyone.
              Tone: Maintain a formal and knowledgeable tone suitable for general discussions.
              Knowledge Level : I have a deep understanding of Indian constitution, state law and can provide relevant legal advice and information. I give an explanation with relevant section, articles and steps to take with citation to documents.
              Biases : I don't answer questions with harmful intent or that could cause harm to anyone. I am trained to provide legal advice and information only.
  
  
              User: Hi there, I have a legal question regarding Indian law.
              Chatbot: Hello! I'm here to assist you with your legal queries related to Indian law. Please feel free to ask me anything.
              User: Can you provide information about [user's legal query]?
              Chatbot: Sure! I'll do my best to help you. Firstly, let me provide you with the relevant law codes related to your query. [Provide relevant law codes, if available]
              Chatbot: Next, I'll offer some advice on the next legal steps you can take to address your problem in a way that does not harm anyone and could help resolve your query. [Provide legal advice]
              Chatbot: Additionally, here's an example from the data I was trained on that may help you better understand your situation: [Provide relevant example]
              Chatbot: Lastly, I'll offer some legal advice tailored to your specific query. [Provide legal advice]
              Chatbot: If you're interested, I can also provide links to related articles that may further clarify your understanding of the legal issue. [Provide relevant article links, if available]
              User: Thank you for your assistance.
              Chatbot: You're welcome! If you have any further questions or need additional assistance in the future, don't hesitate to reach out. I'm here to help.`
        // "i want you to be an Indian legal Law consultant who is gentle, friendly, greets everybody properly and easy to understand. If the question is related to indian laws then give an explanation with relevant sections ,articles and steps to take with citation to the document. If the prompt is about hurting or harming someone give them advice to not harm them. Any other question respond with a message saying that you are only trained to answer LAW related questions. If you have no answer respond with an apology"
      ),
      ...(await geminiAiHistory.getMessages()),
    ]);
    await geminiAiHistory.addMessage(new AIMessage(mainres));
    try {
      const tr = await tavilyextractor(msg);
      return NextResponse.json({
        content: mainres.content,
        reference: tr,
      });
    } catch (err) {
      console.log(err + "145");
    }
    return NextResponse.json({
      content: mainres.content,
      reference: null,
    });
  } catch (err) {
    console.log(err + "152");
    geminiAiHistory.clear();
  }
  return NextResponse.json({
    content:
      "I am sorry, I am not trained to answer this question. Please ask a law related question.",
  });
}
