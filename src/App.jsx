import { useState } from 'react';
import './App.css';
import startupsData from '../kaiku_data.json';
import { Modal, Typography, Sheet, ModalClose } from '@mui/joy';

const App = () => {
  const [startups, setStartups] = useState(startupsData);
  const [acceptedStartups, setAcceptedStartups] = useState([]);
  const [discardedStartups, setDiscardedStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showDiscardedStartups, setShowDiscardedStartups] = useState(false);

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
    const selectedStartup = acceptedStartups.find((startup) => startup.id === startupId);
    if (selectedStartup) {
      setAcceptedStartups((prevAcceptedStartups) =>
        prevAcceptedStartups.filter((startup) => startup.id !== startupId)
      );
      setDiscardedStartups((prevDiscardedStartups) => [...prevDiscardedStartups, selectedStartup]);
    } else {
      const selectedStartup = startups.find((startup) => startup.id === startupId);
      if (selectedStartup) {
        setStartups((prevStartups) => prevStartups.filter((startup) => startup.id !== startupId));
        setDiscardedStartups((prevDiscardedStartups) => [...prevDiscardedStartups, selectedStartup]);
      }
    }
    closeModal();
  };

  const toggleDiscardedStartups = () => {
    setShowDiscardedStartups((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg p-6 shadow-lg my-8 ml-8">
            <h2 className="text-3xl font-bold mb-6">Incoming Startups</h2>
              <ul className="mb-4">
                {startups.map((startup) => (
                  <li key={startup.id} className="mb-4">
                    <h3 className="text-xl font-bold">{startup.name}</h3>
                    <p>{startup.oneLiner}</p>
                    <div className="space-x-2 mt-2">
                      <button
                        onClick={() => acceptStartup(startup.id)}
                        className="bg-green-500 hover:bg-green-600 hover:border-green-700 !text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => discardStartup(startup.id)}
                        className="bg-red-500 hover:bg-red-600 hover:border-red-700 text-white"
                      >
                        Discard
                      </button>
                      <button
                        onClick={() => openModal(startup)}
                        className="bg-blue-500 hover:bg-blue-600 hover:border-blue-700 text-white"
                      >
                        More Info
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg p-6 shadow-lg my-8 mr-8">
              <h2 className="text-3xl font-bold mb-6">Accepted Startups</h2>
              <ul className="mb-4">
                {acceptedStartups.map((startup) => (
                  <li key={startup.id} className="mb-4">
                    <h3 className="text-xl font-bold">{startup.name}</h3>
                    <p>{startup.oneLiner}</p>
                    <div className="space-x-2 mt-2">
                      <button
                        onClick={() => discardStartup(startup.id)}
                        className="bg-red-500 hover:bg-red-600 hover:border-red-700 text-white"
                      >
                        Discard
                      </button>
                      <button
                        onClick={() => openModal(startup)}
                        className="bg-blue-500 hover:bg-blue-600 hover:border-blue-700 text-white"
                      >
                        More Info
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

        <button
          onClick={toggleDiscardedStartups}
          className="bg-gray-500 hover:bg-gray-600 hover:border-gray-700 text-white mb-4 ml-8"
        >
          {showDiscardedStartups ? 'Hide Discarded Startups' : 'Show Discarded Startups'}
        </button>

      {showDiscardedStartups && (
        <div className="w-full">
          <div className="bg-white rounded-lg p-6 shadow-lg my-8 mx-8">
            <h2 className="text-3xl font-bold mb-6">Discarded Startups</h2>
            <ul className="mb-4">
              {discardedStartups.map((startup) => (
                <li key={startup.id} className="mb-4">
                  <h3 className="text-xl font-bold">{startup.name}</h3>
                  <p>{startup.oneLiner}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Modal open={!!selectedStartup} onClose={closeModal} className="flex items-center justify-center h-screen">
        <Sheet variant="outlined" className="rounded-md p-6 shadow-lg">
        <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
            onClick={closeModal}
          />
          <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
            {selectedStartup?.name}
          </Typography>
          <Typography id="modal-desc" textColor="text-tertiary">
            Industry: {selectedStartup?.industry}
          </Typography>
          <Typography id="modal-desc" textColor="text-tertiary">
            Stage: {selectedStartup?.stage}
          </Typography>
          <div className="mt-4">
            {startups.some((startup) => startup.id === selectedStartup?.id) && (
              <>
                <button
                  onClick={() => acceptStartup(selectedStartup?.id)}
                  className="bg-green-500 hover:bg-green-600 hover:border-green-700 text-white mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => discardStartup(selectedStartup?.id)}
                  className="bg-red-500 hover:bg-red-600 hover:border-red-700 text-white"
                >
                  Discard
                </button>
              </>
            )}
            {acceptedStartups.some((startup) => startup.id === selectedStartup?.id) && (
              <button
                onClick={() => discardStartup(selectedStartup?.id)}
                className="bg-red-500 hover:bg-red-600 hover:border-red-700 text-white"
              >
                Discard
              </button>
            )}
          </div>
        </Sheet>
      </Modal>
        
    </div>
  );
};

export default App;



