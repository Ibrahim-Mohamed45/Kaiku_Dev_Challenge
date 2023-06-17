import { useState } from 'react'
import './App.css'
import startupsData from '../kaiku_data.json';

const App = () => {
  const [startups, setStartups] = useState(startupsData);
  const [acceptedStartups, setAcceptedStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);

  const openModal = (startup) => {
    setSelectedStartup(startup);
  };

  const closeModal = () => {
    setSelectedStartup(null);
  };

  const acceptStartup = (startupId) => {
    const selectedStartup = startups.find((startup) => startup.id === startupId);
    if (selectedStartup) {
      setStartups((prevStartups) => prevStartups.filter((startup) => startup.id !== startupId));
      setAcceptedStartups((prevAcceptedStartups) => [...prevAcceptedStartups, selectedStartup]);
    }
    closeModal();
  };

  const discardStartup = (startupId) => {
    setStartups((prevStartups) => prevStartups.filter((startup) => startup.id !== startupId));
    closeModal();
  };

  return (
    <div>
      <h1>Startup Signups</h1>
      <h2>Incoming Startups</h2>
      <ul>
        {startups.map((startup) => (
          <li key={startup.id}>
            <h3>{startup.name}</h3>
            <p>{startup.oneLiner}</p>
            <button onClick={() => acceptStartup(startup.id)}>Accept</button>
            <button onClick={() => discardStartup(startup.id)}>Discard</button>
            <button onClick={() => openModal(startup)}>More Info</button>
          </li>
        ))}
      </ul>

      <h2>Accepted Startups</h2>
      <ul>
        {acceptedStartups.map((startup) => (
          <li key={startup.id}>
            <h3>{startup.name}</h3>
            <p>{startup.oneLiner}</p>
            <button onClick={() => discardStartup(startup.id)}>Discard</button>
            <button onClick={() => openModal(startup)}>More Info</button>
          </li>
        ))}
      </ul>

      {selectedStartup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedStartup.name}</h2>
            <p>Industry: {selectedStartup.industry}</p>
            <p>Stage: {selectedStartup.stage}</p>
            {/* Add more details as needed */}
            <div>
              {startups.some((startup) => startup.id === selectedStartup.id) && (
                <>
                  <button onClick={() => acceptStartup(selectedStartup.id)}>Accept</button>
                  <button onClick={() => discardStartup(selectedStartup.id)}>Discard</button>
                </>
              )}
              {acceptedStartups.some((startup) => startup.id === selectedStartup.id) && (
                <button onClick={() => discardStartup(selectedStartup.id)}>Discard</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App

