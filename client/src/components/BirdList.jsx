import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BirdList() {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/birds')
      .then(response => response.json())
      .then(data => setBirds(data))
      .catch(err => console.error('Error fetching birds:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Bird Sightings</h1>
      <ul>
        {birds.map(bird => (
          <li key={bird.id} className="mt-2">
            {bird.species} - Seen at {bird.seen_at} in {bird.location}
            <Link to={`/edit/${bird.id}`} className="btn btn-secondary ml-4">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BirdList;