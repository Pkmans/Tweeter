import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import Switch from 'react-switch';

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState('dark');

  function toggleTheme() {
    setTheme(prevValue => prevValue === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <AuthProvider>
          <Router>
            <Container>
              <MenuBar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<AuthRoute />}>
                  <Route exact path="/login" element={<Login />} />
                </Route>
                <Route exact path="/register" element={<AuthRoute />}>
                  <Route exact path="/register" element={<Register />} />
                </Route>
                <Route exact path="/posts/:postId" element={<SinglePost />} />
                <Route exact path="/profiles/:profileId" element={<Profile />} />
              </Routes>
              <Switch onChange={toggleTheme} checked={theme === 'dark' ? true : false}
                uncheckedIcon={false} checkedIcon={false}
              />
            </Container>
          </Router>
        </AuthProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
