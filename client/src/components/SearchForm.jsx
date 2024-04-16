import { useState } from 'react';

function SearchForm({ onSearch }) {
    const [species, setSpecies] = useState('');
    const [location, setLocation] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch({ species, location, dateStart, dateEnd });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Species" value={species} onChange={e => setSpecies(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} />
            <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;