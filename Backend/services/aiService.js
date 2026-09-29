import Groq from "groq-sdk";

export const generateMedicalSummary = async (extractedText) => {
  try {
    if (!extractedText || !extractedText.trim()) {
      throw new Error("No medical report text available");
    }

    // Create Groq client after dotenv has loaded
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `
You are a medical report summarization assistant.

Analyze ONLY the medical report text provided below.

Your task is to explain the report in simple language that an ordinary
person can understand.

IMPORTANT RULES:
- Use only information present in the report.
- Do not invent values or information.
- Do not diagnose any disease.
- Do not prescribe medicines.
- Do not recommend starting, stopping, or changing medication.
- Mention values that are outside the reference range when the report
  provides a reference range.
- Explain medical terms in simple language.
- If the report does not provide enough information, clearly say so.
- Do not make assumptions about the patient's condition.

Return the summary using these sections:

### Report Overview
Briefly describe what type of report it is.

### Key Findings
List the important findings and values from the report.

### Values Outside Reference Range
Mention values outside the provided reference range.
If none are clearly outside the provided range, say so.

### Simple Explanation
Explain the important findings in simple, easy-to-understand language.

### Important Note
State that this is an AI-generated summary and should not replace
professional medical advice.

Medical Report:
${extractedText}
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const summary = completion.choices[0]?.message?.content;

    if (!summary || !summary.trim()) {
      throw new Error("Groq returned an empty response");
    }

    return summary.trim();
  } catch (error) {
    console.error(
      "Groq summary generation failed:",
      error.message
    );

    throw new Error("Unable to generate AI summary");
  }
};