import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import APIList from '../components/APIList';
 const ProvidersScreen: React.FC = () => {
  const [providers, setProviders] = useState<Record<string, any>>({});
  const [selectedProvider, setSelectedProvider] = useState<string>('');

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await axios.get('https://api.apis.guru/v2/providers.json');
      setProviders(response.data);
    };
    fetchProviders();
  }, []);

  return (
    <div>
      <button onClick={() => setSelectedProvider('')}>
        Show Providers
      </button>
      <Sidebar providers={providers} selectedProvider={setSelectedProvider} />
      {selectedProvider && <APIList providerName={selectedProvider} />}
    </div>
  );
};

export default ProvidersScreen;
