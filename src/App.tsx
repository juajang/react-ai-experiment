import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, EditPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
