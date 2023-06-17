import { useState } from 'react'
import './App.css'
import startupsData from '../kaiku_data.json';
import { Modal, Button, Typography, Sheet, ModalClose } from '@mui/joy';

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
            <Button onClick={() => acceptStartup(startup.id)}>Accept</Button>
            <Button onClick={() => discardStartup(startup.id)}>Discard</Button>
            <Button onClick={() => openModal(startup)}>More Info</Button>
          </li>
        ))}
      </ul>

      <h2>Accepted Startups</h2>
      <ul>
        {acceptedStartups.map((startup) => (
          <li key={startup.id}>
            <h3>{startup.name}</h3>
            <p>{startup.oneLiner}</p>
            <Button onClick={() => discardStartup(startup.id)}>Discard</Button>
            <Button onClick={() => openModal(startup)}>More Info</Button>
          </li>
        ))}
      </ul>

      <Modal open={!!selectedStartup} onClose={closeModal}>
        <Sheet variant="outlined" sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
            onClick={closeModal}
          />
          <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
            {selectedStartup?.name}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Industry: {selectedStartup?.industry}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Stage: {selectedStartup?.stage}
          </Typography>
          <div>
            {startups.some((startup) => startup.id === selectedStartup?.id) && (
              <>
                <Button onClick={() => acceptStartup(selectedStartup?.id)}>Accept</Button>
                <Button onClick={() => discardStartup(selectedStartup?.id)}>Discard</Button>
              </>
            )}
            {acceptedStartups.some((startup) => startup.id === selectedStartup?.id) && (
              <Button onClick={() => discardStartup(selectedStartup?.id)}>Discard</Button>
            )}
            <Button onClick={closeModal}>Close</Button>
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};

export default App;
