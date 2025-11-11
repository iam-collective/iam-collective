// DO NOT CHANGE ANYTHING (RENAME)
import React from 'react';
import { FeatureAppDefinition } from '@feature-hub/core';
import { ReactFeatureApp } from '@feature-hub/react';
import App from './App';
import reportWebVitals from '../report-web-vitals';
import { Metric } from 'web-vitals';

const FeatureHubAppDefinition: FeatureAppDefinition<ReactFeatureApp> = {
  create: ({ config }) => {
    

    return {
      render: () => (
        <>
          <App config={config} />
        </>
      ),
    };
  },
};


export default FeatureHubAppDefinition;
