import { useState } from 'react';

const characters = [
  { id: 'dobby', name: 'Dobby The Elf' },
  { id: 'harry', name: 'Harry Potter' },
  { id: 'hermione', name: 'Hermione Granger' },
  { id: 'snape', name: 'Severus Snape' },
  { id: 'ron', name: 'Ronald Weasely' },
  { id: 'voldemort', name: 'Lord Voldemort' },
  { id: 'hagrid', name: 'Rubeus Hagrid' },
  { id: 'dumbledore', name: 'Albus Dumbledore' },
  { id: 'malfoy', name: 'Draco Malfoy' },
];

const topics = [
  { id: 'adventure', name: 'Adventure' },
  { id: 'magic', name: 'Magic' },
  { id: 'friendship', name: 'Friendship' },
  { id: 'dark-arts', name: 'Dark Arts' },
  { id: 'school-life', name: 'School Life' },
  { id: 'potions', name: 'Potions' },
  { id: 'spiders', name: 'Spiders' },
  { id: 'quidditch', name: 'Quidditch' },
  { id: 'house-elves', name: 'House Elves' },
  { id: 'voldemort', name: 'Voldemort' },
  { id: 'spells', name: 'Spells' },
];

function App() {
  const [charId, setCharId] = useState(characters[0].id);
  const [topicId, setTopicId] = useState(topics[0].id);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(null); // State for modal message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://wizard-mcpai-be.onrender.com/ai-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ charId, topicId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      const { message } = await res.json(); // Extract the message (draft)
      setModalMessage(`${message}`); // Set modal message
    } catch (err) {
      console.error('Error:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        backgroundColor: '#1e1e2f',
        height: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: '2rem auto',
          fontFamily: 'Georgia, serif',
          backgroundColor: '#2c2c54',
          color: '#f5f5f5',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontFamily: 'Luminari, fantasy', fontSize: '2.5rem', color: '#ffcc00' }}>
          Wizardry Influencers AI
        </h1>
        <p
          style={{
            fontFamily: 'Cursive, fantasy',
            fontSize: '1.2rem',
            color: '#d4af37',
            marginBottom: '2rem',
          }}
        >
          Select your favorite wizard or witch and a magical topic to generate a post onto the
          Facebook page here:{' '}
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=61576151313496"
            rel="noopener noreferrer"
            style={{ color: '#ffcc00', textDecoration: 'underline' }}
          >
            Wizardy Influencers AI
          </a>
          . Let the magic begin!
        </p>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Choose a character:</span>
            <select
              value={charId}
              onChange={(e) => setCharId(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                margin: '0.5rem 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            >
              {characters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Choose a topic:</span>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                margin: '0.5rem 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#ffcc00',
              color: '#2c2c54',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            {loading ? '…sending' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalMessage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#2c2c54', // Dark blue background for the modal
              padding: '2rem',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth
              border: '2px solid #ffcc00', // Golden border
            }}
          >
            {/* Header */}
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#ffcc00', // Golden text color
                fontFamily: 'Luminari, fantasy',
              }}
            >
              Congrats!
            </h2>

            {/* Body */}
            <p
              style={{
                fontSize: '1rem',
                marginBottom: '1rem',
                color: '#f5f5f5', // Light text color
                fontFamily: 'Georgia, serif',
              }}
            >
              {modalMessage.split(' ').slice(0, 50).join(' ')}...
            </p>

            {/* Footer */}
            <p
              style={{
                fontSize: '0.9rem',
                color: '#d4af37', // Golden text color for the footer
                fontFamily: 'Georgia, serif',
              }}
            >
              Visit Facebook page here to see post:{' '}
              <a
                href="https://www.facebook.com/profile.php?id=61576151313496"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffcc00', textDecoration: 'underline' }}
              >
                Wizardry Influencers AI
              </a>
            </p>

            {/* Close Button */}
            <button
              onClick={() => setModalMessage(null)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#ffcc00', // Golden button background
                color: '#2c2c54', // Dark blue text color
                border: 'none',
                borderRadius: '5px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for the button
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
