import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './shared/Navbar';
import UserContextProvider from './contexts/UserContext';
import '../App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = () => {
  return (

    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <UserContextProvider> */}
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/profile/me'>
            <Profile />
          </Route>
        </Switch>
        <ReactQueryDevtools />
        {/* </UserContextProvider> */}
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
