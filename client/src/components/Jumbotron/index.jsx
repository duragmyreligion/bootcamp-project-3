import React from 'react';

/**
 * Jumbotron component renders a styled container for content.
 * @param {Object} children - Content to be displayed inside the Jumbotron.
 */
function Jumbotron({ children }) {
  return (
    <div style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}>
      {children}
    </div>
  );
}

export default Jumbotron;
