import { QdrantClient } from "@qdrant/js-client-rest";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { experiences, projects, skillCategories, profileData } from "@/data";

// Environment variables
const { OPENAI_API_KEY, QDRANT_URL, QDRANT_API_KEY } = process.env;

// Type definitions
interface Message {
  content: string;
  role: "user" | "assistant";
}

interface RequestBody {
  messages: Message[];
}

interface ApiResponse {
  id: string;
  content: string;
  role: "assistant";
}

// Initialize clients safely
let openai: OpenAI ;
let qdrantClient: QdrantClient;

// Safe initialization function
function initializeClients() {
  try {
    if (!OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY not configured");
      return;
    }
    openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    
    if (QDRANT_URL) {
      qdrantClient = new QdrantClient({
        url: QDRANT_URL,
        apiKey: QDRANT_API_KEY || undefined,
      });
    }
    console.log("AI clients initialized successfully");
  } catch (error) {
    console.error("Failed to initialize clients:", error);
  }
}

// Initialize on module load
if (typeof window === "undefined") {
  initializeClients();
}

// Prepare local data as context
function prepareLocalData(): string {
  const contextData = {
    profile: profileData,
    experiences: experiences.map((exp) => ({
      company: exp.company,
      role: exp.role,
      type: exp.type,
      duration: exp.duration,
      description: exp.description,
      achievements: exp.achievements || [],
      technologies: exp.technologies || [],
    })),
    projects: projects.map((project) => ({
      title: project.title,
      description: project.description,
      type: project.type,
      technologies: project.technologies,
    })),
    skills: skillCategories.map((category) => ({
      title: category.title,
      skills: category.skills,
    })),
  };

  return JSON.stringify(contextData, null, 2);
}

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
  lastRequestTime = Date.now();
}

// Generate UUID
function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Helper function to split text into chunks
function splitIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  const sentences = text.split(". ");
  let currentChunk = "";

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length < chunkSize) {
      currentChunk += sentence + ". ";
    } else {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence + ". ";
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Initialize Qdrant collection
async function initializeQdrantCollection(): Promise<void> {
  if (!qdrantClient) return;

  try {
    const collectionName = "vansh_portfolio";

    try {
      await qdrantClient.getCollection(collectionName);
      console.log("Collection already exists");
      return; // Already initialized
    } catch (error) {
      await qdrantClient.createCollection(collectionName, {
        vectors: {
          size: 1536, // OpenAI text-embedding-3-small dimension
          distance: "Cosine",
        },
      });
      console.log("Collection created successfully");
    }

    const localContext = prepareLocalData();
    const chunks = splitIntoChunks(localContext, 500);

    if (!openai) {
      console.error("OpenAI client not available for embedding");
      return;
    }

    for (let i = 0; i < chunks.length; i++) {
      try {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: chunks[i],
        });
        const vector = embeddingResponse.data[0].embedding;

        if (!qdrantClient) {
          console.error("Qdrant client not available for upsert");
          return;
        }

        await qdrantClient.upsert(collectionName, {
          wait: true,
          points: [
            {
              id: `chunk_${i}`,
              vector: vector,
              payload: { text: chunks[i], chunk_id: i },
            },
          ],
        });
        console.log(`Uploaded chunk ${i + 1}/${chunks.length}`);
      } catch (error) {
        console.error(`Failed to upload chunk ${i}:`, error);
      }
    }
  } catch (error) {
    console.error("Failed to initialize Qdrant collection:", error);
  }
}

function getSmartFallback(question: string): string {
  const lowerQuestion = question.toLowerCase();

  // Contact info
  if (
    lowerQuestion.includes("contact") ||
    lowerQuestion.includes("email") ||
    lowerQuestion.includes("reach")
  ) {
    return `📧 **Contact Vansh Mundhra**

**Email:** ${profileData.email}
**Location:** ${profileData.location}
**Phone:** ${profileData.phone}

**Connect on Social Media:**
${profileData.socialLinks
  .map((link) => `• ${link.platform}: ${link.url}`)
  .join("\n")}

**Resume:** ${profileData.resume}

Feel free to reach out for opportunities or collaborations!`;
  }

  // Skills
  if (lowerQuestion.includes("skill") || lowerQuestion.includes("tech")) {
    return `🛠️ **vansh's Technical Skills**

${skillCategories
  .map(
    (cat) => `**${cat.title}:**
${cat.skills.join(" • ")}`
  )
  .join("\n\n")}

Want to know more about specific technologies or project implementations?`;
  }

  // Projects
  if (
    lowerQuestion.includes("project") ||
    lowerQuestion.includes("portfolio")
  ) {
    return `💼 **vansh's Projects**

${projects
  .slice(0, 4)
  .map(
    (p) => `**${p.title}** (${p.type})
${p.description}
*Tech:* ${p.technologies.join(", ")}`
  )
  .join("\n\n")}

...and ${
      projects.length - 3
    } more projects! Ask about specific projects or technologies.`;
  }

  // Experience
  if (
    lowerQuestion.includes("experience") ||
    lowerQuestion.includes("work") ||
    lowerQuestion.includes("job")
  ) {
    return `💼 **vansh's Professional Experience**

${experiences
  .slice(0, 2)
  .map(
    (exp) => `**${exp.role}** at **${exp.company}**
${exp.duration}
${exp.description}
*Technologies:* ${exp.technologies?.join(", ") || "Various"}`
  )
  .join("\n\n")}

Want details about specific roles or achievements?`;
  }

  // Generic fallback
  return `👋 Hi! I'm vansh's AI assistant. I can help you learn about:

• **Professional Experience** - ${experiences.length}+ roles at top companies
• **Projects** - ${projects.length}+ innovative applications
• **Skills** - Expertise across ${skillCategories.length} technical domains
• **Contact Info** - How to reach vansh

What would you like to know?`;
}

function createJsonResponse(data: ApiResponse, status = 200): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    if (!openai || !qdrantClient) {
      return createJsonResponse(
        {
          id: generateId(),
          content: "Server configuration error. Please contact support.",
          role: "assistant",
        },
        500
      );
    }

    let requestBody: RequestBody;
    try {
      requestBody = (await req.json()) as RequestBody;
    } catch (error) {
      return createJsonResponse(
        {
          id: generateId(),
          content: "Invalid request format.",
          role: "assistant",
        },
        400
      );
    }

    const { messages } = requestBody;

    if (!Array.isArray(messages) || messages.length === 0) {
      return createJsonResponse({
        id: generateId(),
        content: getSmartFallback("hello"),
        role: "assistant",
      });
    }

    const latestMessage = messages[messages.length - 1]?.content ?? "";

    if (!latestMessage.trim()) {
      return createJsonResponse({
        id: generateId(),
        content: getSmartFallback("hello"),
        role: "assistant",
      });
    }

    let docContext = "";

    // Get context from Qdrant or local data
    try {
      if (!openai) {
        throw new Error("OpenAI client not initialized");
      }

      await waitForRateLimit();

      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: latestMessage,
      });
      const queryVector = embeddingResponse.data[0].embedding;

      if (!qdrantClient) {
        throw new Error("Qdrant client not initialized");
      }

      const searchResult = await qdrantClient.search("vansh_portfolio", {
        vector: queryVector,
        limit: 5,
        with_payload: true,
      });

      if (searchResult.length > 0) {
        docContext = searchResult
          .map((result) => (result.payload as { text: string })?.text || "")
          .filter((text) => text.trim())
          .join("\n\n");
      }
    } catch (error) {
      console.log("Using local data fallback:", error);
    }

    if (!docContext.trim()) {
      docContext = prepareLocalData();
    }

    const conversationHistory = messages
      .slice(-5)
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    const systemPrompt = `You are vansh AI, an intelligent assistant representing Vansh Mundhra's professional portfolio. Your goal is to provide accurate, helpful answers based ONLY on the provided data.

PORTFOLIO DATA:
${docContext}

INSTRUCTIONS:
1. Answer the user's question using ONLY information from the PORTFOLIO DATA above
2. Be conversational, friendly, and professional
3. If the data contains relevant information, provide specific details (numbers, technologies, achievements)
4. If the question is about something NOT in the portfolio data, politely say you don't have that information and suggest related topics you CAN help with
5. Use emojis sparingly (1-2 per response) for a friendly tone
6. Keep responses concise but informative (2-4 paragraphs max)
7. If asked general questions like "tell me about vansh" or "what can you do", give a brief overview highlighting key strengths`;

    try {
      await waitForRateLimit();

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using GPT-4o-mini for cost-effectiveness
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-5).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
      });

      const responseText = completion.choices[0]?.message?.content || "";

      // Basic validation - check if response is too short or generic
      if (responseText.length < 50) {
        return createJsonResponse({
          id: generateId(),
          content: getSmartFallback(latestMessage),
          role: "assistant",
        });
      }

      return createJsonResponse({
        id: generateId(),
        content: responseText,
        role: "assistant",
      });
    } catch (aiError) {
      const error = aiError as Error;
      console.error("AI generation failed:", error.message);

      // Rate limit handling
      if (error.message.includes("429") || error.message.includes("quota")) {
        return createJsonResponse({
          id: generateId(),
          content: `⏰ I'm experiencing high demand. While you wait, here's what I can tell you:\n\n${getSmartFallback(
            latestMessage
          )}\n\nPlease try again in a moment for a detailed response.`,
          role: "assistant",
        });
      }

      // Use smart fallback for other errors
      return createJsonResponse({
        id: generateId(),
        content: getSmartFallback(latestMessage),
        role: "assistant",
      });
    }
  } catch (error) {
    console.error("Unexpected API Error:", error);
    return createJsonResponse(
      {
        id: generateId(),
        content:
          "I'm experiencing technical difficulties. Please try again in a moment.",
        role: "assistant",
      },
      500
    );
  }
}

// Initialize collection on server startup
if (typeof window === "undefined") {
  initializeQdrantCollection().catch(console.error);
}
