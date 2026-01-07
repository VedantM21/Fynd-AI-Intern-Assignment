import { useEffect, useState } from "react";
import { fetchReviews } from "../api/reviews";

export default function ReviewsTable() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading reviews...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 font-medium">
        {error}
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Rating</th>
                <th className="py-2">Review</th>
                <th className="py-2">AI Summary</th>
                <th className="py-2">Action</th>
                <th className="py-2">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id} className="border-b last:border-none">
                  <td className="py-3 font-medium">{r.rating}★</td>
                  <td className="py-3">{r.review_text}</td>
                  <td className="py-3">{r.ai_summary}</td>
                  <td className="py-3">{r.ai_recommended_action}</td>
                  <td className="py-3">
                    {r.confidence ? Math.round(r.confidence * 100) + "%" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
