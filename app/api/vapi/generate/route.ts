import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { isJSONArray } from "@/lib/validators"; // You'll need to implement this

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount, userid } =
      await request.json();

    // Validate required fields
    if (!type || !role || !level || !techstack || !amount || !userid) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate interview questions
    const generationStart = Date.now();
    const { text: rawQuestions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Generate ${amount} interview questions for a ${level} ${role} position.
        Tech stack: ${techstack}.
        Focus: ${type} questions.
        Format as: ["Question 1", "Question 2"]
        Avoid special characters that might interfere with TTS systems.`,
    });
    console.log(`Question generation took ${Date.now() - generationStart}ms`);

    // Validate and parse questions
    if (!isJSONArray(rawQuestions)) {
      return Response.json(
        { success: false, error: "Invalid question format from AI" },
        { status: 500 }
      );
    }
    const questions = JSON.parse(rawQuestions);

    // Create interview document
    const interviewData = {
      role: role.trim(),
      type: type.toLowerCase(),
      level: level.trim(),
      techstack: techstack.split(",").map((t) => t.trim()),
      questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
      status: "generated",
    };

    // Save to Firestore
    const docRef = await db.collection("interviews").add(interviewData);
    console.log(`Interview created with ID: ${docRef.id}`);

    return Response.json(
      { success: true, interviewId: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating interview:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    { success: true, message: "Interview generator endpoint" },
    { status: 200 }
  );
}
