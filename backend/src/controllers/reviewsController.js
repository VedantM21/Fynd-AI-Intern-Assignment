import { analyzeReview } from "../services/llm.js";
import { supabase } from "../config/supabase.js";

/**
 * POST /api/reviews
 * User-facing endpoint
 * - Accepts rating + review
 * - Runs LLM
 * - Stores data
 * - Returns AI response to user
 */
export async function createReview(req, res) {
  try {
    const { review_text, rating } = req.body;

    // Input validation
    if (!review_text || typeof review_text !== "string") {
      return res.status(400).json({
        error: "review_text is required and must be a string"
      });
    }

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        error: "rating must be an integer between 1 and 5"
      });
    }

    // Call LLM (server-side only)
    const analysis = await analyzeReview(review_text);

    // Defensive validation
    if (
      !analysis ||
      typeof analysis.confidence !== "number" ||
      !analysis.summary ||
      !analysis.recommended_action
    ) {
      throw new Error(
        `Invalid LLM response: ${JSON.stringify(analysis)}`
      );
    }

    // Persist to Supabase (aligned with existing schema)
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          review_text,
          rating,
          confidence: analysis.confidence,
          ai_summary: analysis.summary,
          ai_recommended_action: analysis.recommended_action
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // User-facing response (MANDATORY per Task 2)
    return res.status(201).json({
      message: "Review submitted successfully",
      ai_response: analysis.recommended_action
    });

  } catch (err) {
    console.error("POST /api/reviews ERROR:", err);
    return res.status(500).json({
      error: "Failed to process review",
      details: err.message
    });
  }
}

/**
 * GET /api/reviews
 * Admin-facing endpoint
 * - Returns all submissions
 */
export async function getAllReviews(req, res) {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    console.error("GET /api/reviews ERROR:", err);
    return res.status(500).json({
      error: "Failed to fetch reviews",
      details: err.message
    });
  }
}
