import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App2 from './App.jsx';

function MemoryGame() {
  return (
    <StrictMode>
      <App2 />
      
    </StrictMode>
    
  );
}

// Render the application
const root = createRoot(document.getElementById('root'));
root.render(<MemoryGame />);

export default MemoryGame;