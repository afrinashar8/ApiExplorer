import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import APIList from './components/APIList';
import APIDetails from './screens/APIDetailsScreen';
import { AppContainer, Button, SidebarContainer } from './styles';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleProviderClick = (provider: string) => {
    navigate(`/provider/${provider}`);
    setSidebarOpen(false); // Close the sidebar
  };

  return (
    <AppContainer>
      <Button onClick={() => setSidebarOpen(true)}>Open Sidebar</Button>
      {isSidebarOpen && (
        <SidebarContainer>
          <Sidebar onProviderClick={handleProviderClick} />
        </SidebarContainer>
      )}
      <Routes>
        <Route path="/" element={<div>Select a provider from the sidebar</div>} />
        <Route path="/provider/:provider" element={<APIList />} />
        <Route path="/api/:provider/:apiName" element={<APIDetails />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
