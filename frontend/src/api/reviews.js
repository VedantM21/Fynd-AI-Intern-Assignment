const API_BASE_URL = "https://fynd-backend-nm96.onrender.com";

export async function fetchReviews() {
  const res = await fetch(`${API_BASE_URL}/api/reviews`);

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}
