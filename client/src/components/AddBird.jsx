import { useState } from 'react';

function AddBird() {
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState('');
  const [seenAt, setSeenAt] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/birds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ species, seen_at: seenAt, location }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Bird added successfully!');
      setSpecies('');
      setLocation('');
      setSeenAt('');
    })
    .catch(err => {
      alert('Error adding bird');
      console.error('Error:', err);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Bird Sighting</h1>
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
      <button type="submit" className="btn btn-primary mt-4">Submit</button>
    </form>
  );
}

export default AddBird;