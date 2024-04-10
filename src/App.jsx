import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListEventComponent from './components/ListEventComponent';
import CreateEventComponent from './components/CreateEventComponent';
import ViewEventComponent from './components/ViewEventComponent';

function App() {
  return (
    <div>
      
        <Router>
          <div>
          <Routes>
            <Route path="/" element={<ListEventComponent />} />
            <Route path="/create" element={<CreateEventComponent />} />
            <Route path="/create/:id" element={<CreateEventComponent />} />
            <Route path="/:id" element={<ViewEventComponent />} />
          </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
