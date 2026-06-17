const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

const CATEGORY_LABELS = {
  welcomeDrink: "Welcome Drink",
  farsan: "Farsan",
  sabji: "Sabji",
  roti: "Roti",
  rice: "Rice",
  dal: "Dal",
  sweet: "Sweet",
  staffBehaviour: "Staff Behaviour"
};

exports.generateReview = onCall({ secrets: [GEMINI_API_KEY] }, async (request) => {
  const { ratings, recommend, name } = request.data || {};

  if (!ratings || typeof ratings !== "object") {
    throw new HttpsError("invalid-argument", "Ratings are required.");
  }

  const ratingLines = Object.entries(ratings)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => `${CATEGORY_LABELS[key] || key}: ${value}/5`)
    .join("\n");

  if (!ratingLines) {
    throw new HttpsError("invalid-argument", "At least one rating is required.");
  }

  const prompt = `You are writing a short, natural customer review for an Indian thali restaurant called "Maharana Thal", based on a guest's star ratings below. Write 2-3 sentences in first person, the way a real guest would write on Google or Zomato. Match the tone to the ratings: warm and positive for high stars, and gently note room for improvement if any category is 3 stars or below. Do not mention the numeric ratings directly, and avoid generic filler like "overall" or "in conclusion".

Guest ratings:
${ratingLines}
${recommend ? `Would recommend to friends/family: ${recommend === "yes" ? "Yes" : "No"}` : ""}
${name ? `Guest name (do not repeat it back unnaturally): ${name}` : ""}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY.value()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 150 }
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini API error:", errText);
    throw new HttpsError("internal", "Couldn't reach the AI service right now.");
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new HttpsError("internal", "Couldn't generate a review right now.");
  }

  return { review: text.trim() };
});