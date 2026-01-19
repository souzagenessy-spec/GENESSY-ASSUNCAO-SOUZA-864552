import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
EOF# 7. Crie src/App.tsx
cat > src/App.tsx << 'EOF'
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pet Manager App</h1>
      <p>Frontend created successfully!</p>
    </div>
  );
}

export default App;
