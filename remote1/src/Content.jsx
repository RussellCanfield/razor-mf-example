import React from "react";

export default () => (
    <div style={{
      backgroundColor: 'green',
      color: 'lightgrey',
      padding: '1rem'
    }}>
      <h2>Remote 1: Content</h2>
      <p>This is the content from remote 1, which will include an image component exposed by remote2. This demonstrates nested federated modules being rendered server-side.</p>
    </div>
  );