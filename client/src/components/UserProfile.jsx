import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure the userId is valid
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    // Fetch user data from the API
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // Display loading status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle errors if the fetch fails
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure user data is loaded
  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <h1>{user.username}&apos;s Profile</h1>
      <p>Points: {user.points}</p>
    </div>
  );
}

export default UserProfile;
