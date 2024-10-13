import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat location={{ search: '' }} />} />
      </Routes>
    </Router>
  );
}

export default App;
