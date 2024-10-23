import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SidebarProps {
    providers:  Record<string, any>;
 selectedProvider : Record<string, any>;

  onProviderClick: (providers: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onProviderClick }) => {
  const [providers, setProviders] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    axios.get('https://api.apis.guru/v2/providers.json')
      .then(response => {
        setProviders(response.data);
      })
      .catch(error => {
        console.error('Error fetching providers', error);
      });
  }, []);

  return (
    <div>
      <h3>API Providers</h3>
      <ul>
        {Object.keys(providers).map(provider => (
          <li key={provider} onClick={() => onProviderClick(provider)}>
            {provider}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
