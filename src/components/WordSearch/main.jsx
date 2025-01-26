import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

function WordSearch() {
  return (
    <StrictMode>
      <App />
      
    </StrictMode>
    
  );
}

// Render the application
const root = createRoot(document.getElementById('root'));
root.render(<WordSearch />);

export default WordSearch;