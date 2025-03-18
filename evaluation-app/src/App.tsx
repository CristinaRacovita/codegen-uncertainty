import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import EvaluationPage from './pages/evaluation-page/EvaluatioPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/no-hints" replace />} />
          <Route path="/hints" element={<MainPage />} />
          <Route path="/no-hints" element={<MainPage />} />
          <Route path="/evaluation" element={<EvaluationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
