import { useState } from "react";

const API_BASE_URL = "http://localhost:3001";

export default function UserDashboard() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_text: review, rating }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setAiResponse(data.ai_response);
      setReview("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Share Your Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Rating
          </label>
          <select
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Review
          </label>
          <textarea
            rows="4"
            value={review}
            onChange={e => setReview(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {aiResponse && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium mb-1">AI Response</h3>
          <p className="text-sm text-gray-700">{aiResponse}</p>
        </div>
      )}

      {error && (
        <p className="text-red-600 mt-4 text-sm">{error}</p>
      )}
    </div>
  );
}
