import './App.scss';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';

import { CharacterPage } from './components/CharacterPage/CharacterPage';
import {Header} from './components/Header/Header';
import { Episodes } from './Pages/Episodes/Episodes';
import {Location} from './Pages/Location/Location';


function App() {

  return (
<>
<HashRouter>
  <Header />

  <Routes>
    <Route path = "/" element = {<CharacterPage />} />
    <Route path = "/episodes" element = {<Episodes />} />
    <Route path = "/location" element = {<Location />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</HashRouter>
</>
  )
}

export default App
