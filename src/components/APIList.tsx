import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface APIInfo {
  title: string;
  description: string;
  version: string;
  x_logo?: {
    url: string;
  };
}

interface API {
  info: APIInfo;
}
interface APIListProps {
    providerName: string;
  }
const APIList: React.FC<APIListprops> = ( ) => {
  const { provider } = useParams<{ provider: string }>();
  const [apis, setApis] = useState<{ [key: string]: API }>({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api.apis.guru/v2/${provider}.json`)
      .then(response => {
        setApis(response.data.apis);  // Update with correct data path
      })
      .catch(error => {
        console.error('Error fetching APIs', error);
      });
  }, [provider]);

  const handleAPIClick = (apiName: string) => {
    navigate(`/api/${provider}/${apiName}`);
  };

  return (
    <div>
      <h3>APIs for {provider}</h3>
      <ul>
        {Object.keys(apis).map(apiName => (
          <li key={apiName} onClick={() => handleAPIClick(apiName)}>
            {apis[apiName].info.x_logo && (
              <img
                src={apis[apiName].info.x_logo.url}
                alt={`${apis[apiName].info.title} logo`}
                width={50}
                style={{ marginRight: '10px' }}
              />
            )}
            {apis[apiName].info.title} (v{apis[apiName].info.version})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default APIList;
