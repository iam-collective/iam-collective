// DO NOT CHANGE ANYTHING (RENAME)
import React from 'react';
import { FeatureAppDefinition } from '@feature-hub/core';
import { ReactFeatureApp } from '@feature-hub/react';
import App from './App';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const client = new ConvexReactClient(process.env.VITE_CONVEX_URL || 'http://127.0.0.1:3210');

const FeatureHubAppDefinition: FeatureAppDefinition<ReactFeatureApp> = {
  create: ({ config }) => {
    return {
      render: () => (
        <>
          <ConvexProvider client={client}>
            <App config={config} />
          </ConvexProvider>
        </>
      ),
    };
  },
};

export default FeatureHubAppDefinition;
