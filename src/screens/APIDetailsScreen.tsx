import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface APIDetails {
  info: {
    title: string;
    description: string;
    version: string;
    contact?: {
      name: string;
      email: string;
      url?: string;
    };
    x_apisguru_categories?: string[];
    x_logo?: {
      url: string;
    };
    x_origin?: {
      format: string;
      url: string;
    }[];
  };
  swaggerUrl?: string;
  swaggerYamlUrl?: string;
}

const APIDetails: React.FC = () => {
  const { provider, apiName } = useParams<{ provider: string; apiName: string }>();
  const [details, setDetails] = useState<APIDetails | null>(null);

  useEffect(() => {
    axios.get(`https://api.apis.guru/v2/specs/${provider}/${apiName}/openapi.json`)
      .then(response => {
        setDetails(response.data); // Load detailed API information
      })
      .catch(error => {
        console.error('Error fetching API details', error);
      });
  }, [provider, apiName]);

  return details ? (
    <div>
      {details.info.x_logo && (
        <img
          src={details.info.x_logo.url}
          alt={`${details.info.title} logo`}
          width={100}
          style={{ marginBottom: '10px' }}
        />
      )}
      <h3>{details.info.title}</h3>
      <p>{details.info.description}</p>
      <p>Version: {details.info.version}</p>

      {details.info.x_apisguru_categories && (
        <p>Categories: {details.info.x_apisguru_categories.join(', ')}</p>
      )}

      {details.info.contact && (
        <p>
          Contact: {details.info.contact.name} -{' '}
          {details.info.contact.email}
        </p>
      )}

      {details.swaggerUrl && (
        <p>
          <a href={details.swaggerUrl} target="_blank" rel="noopener noreferrer">
            OpenAPI JSON
          </a>
        </p>
      )}

      {details.swaggerYamlUrl && (
        <p>
          <a href={details.swaggerYamlUrl} target="_blank" rel="noopener noreferrer">
            OpenAPI YAML
          </a>
        </p>
      )}
    </div>
  ) : (
    <div>Loading API details...</div>
  );
};

export default APIDetails;
