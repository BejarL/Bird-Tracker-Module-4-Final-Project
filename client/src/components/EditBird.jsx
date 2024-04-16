import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBird() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState('');
  const [seenAt, setSeenAt] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/birds/${id}`)
      .then(response => response.json())
      .then(data => {
        setSpecies(data.species);
        setLocation(data.location);
        setSeenAt(data.seen_at);
      })
      .catch(err => console.error('Error fetching bird details:', err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/birds/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ species, location, seen_at: seenAt }),
    })
    .then(response => response.json())
    .then(() => {
      alert('Bird updated successfully!');
      navigate('/');
    })
    .catch(err => {
      alert('Error updating bird');
      console.error('Error:', err);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Bird Sighting</h1>
      <input
        type="text"
        placeholder="Species"
        value={species}
        onChange={e => setSpecies(e.target.value)}
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="input input-bordered input-primary w-full max-w-xs mt-2"
      />
      <input
        type="date"
        value={seenAt}
        onChange={e => setSeenAt(e.target.value)}
        className="input input-bordered input-primary w-full max-w-xs mt-2"
      />
      <button type="submit" className="btn btn-primary mt-4">Update</button>
    </form>
  );
}

export default EditBird;