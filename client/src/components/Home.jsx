import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import BirdMap from "./BirdMap";

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/birds")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch birds");
        }
        return response.json();
      })
      .then((data) => {
        setBirds(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to load birds");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const UserProfile = () => {
    // Navigate to the profile edit page
    navigate("/profile");
  };

  return (
    <main className="bg-green-500 min-h-screen">
      <nav className="flex justify-between p-4">
        <button
          onClick={() => navigate("/birds")}
          className="btn btn-primary mr-2"
        >
          View Birds
        </button>
        <button
          onClick={() => navigate("/add")}
          className="btn btn-secondary mr-2"
        >
          Add Bird Sighting
        </button>
        <button onClick={UserProfile} className="btn btn-info">
          Profile
        </button>
        <button onClick={handleLogout} className="btn btn-error mr-2">
          Logout
        </button>
      </nav>
      <h1 className="text-3xl font-bold underline my-4 text-center">
        Welcome to the Bird Tracker
      </h1>
      {auth.currentUser ? (
        <div>
          <p className="text-xl">
            Hello, {auth.currentUser.username}! Explore the bird sighting data
            or manage your account.
          </p>
          <BirdMap birds={birds} />
        </div>
      ) : (
        <div>
          <p className="text-xl">
            You are not logged in. Please log in to continue.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;
