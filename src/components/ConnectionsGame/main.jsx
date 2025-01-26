import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App3 from './App.jsx';

function ConnectionsGame() {
  return (
    <StrictMode>
      <App3 />
      
    </StrictMode>
    
  );
}

// Render the application
const root = createRoot(document.getElementById('root'));
root.render(<ConnectionsGame />);

export default ConnectionsGame;