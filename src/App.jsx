import { useState } from 'react'
import './App.css'
import startupsData from '../kaiku_data.json';

const App = () => {
  const [startups, setStartups] = useState(startupsData);
  const [acceptedStartups, setAcceptedStartups] = useState([]);

  const acceptStartup = (id) => {
    const startup = startups.find((startup) => startup.id === id);
    setAcceptedStartups((prevAcceptedStartups) => [...prevAcceptedStartups, startup]);
    setStartups((prevStartups) => prevStartups.filter((startup) => startup.id !== id));
  };

  const discardStartup = (id) => {
    setStartups((prevStartups) => prevStartups.filter((startup) => startup.id !== id));
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
          </li>
        ))}
      </ul>

      <h2>Accepted Startups</h2>
      <ul>
        {acceptedStartups.map((startup) => (
          <li key={startup.id}>
            <h3>{startup.name}</h3>
            <p>{startup.oneLiner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App

