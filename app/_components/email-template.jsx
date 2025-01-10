import * as React from 'react';

// EmailTemplate component that takes `firstName` as a prop and renders a welcome message
export const EmailTemplate = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
