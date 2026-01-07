const API_BASE_URL = "http://localhost:3001";

export async function fetchReviews() {
  const response = await fetch(`${API_BASE_URL}/api/reviews`);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
}
