import React, { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route 
              index 
              element={
                <HomePage 
                  onSearch={handleSearch} 
                  searchQuery={searchQuery}
                />
              } 
            />
            <Route 
              path="/:category" 
              element={
                <HomePage 
                  onSearch={handleSearch} 
                  searchQuery={searchQuery}
                />
              } 
            />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App