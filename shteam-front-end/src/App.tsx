import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import WelcomePage from './pages/WelcomePage';
import UserHome from './pages/user/UserHome';
import DevHome from './pages/dev/DevHome';
import UserLibrary from './pages/user/UserLibrary';
import UserSettings from './pages/user/UserSettings';
import GamesStore from './pages/user/GamesStore';
import DevGames from './pages/dev/DevGames';
import DevSettings from './pages/dev/DevSettings';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<WelcomePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='user'>
              <Route path='home'>
                <Route index element={<Navigate to='library' />} />
                <Route path='library' element={
                  <UserHome
                    appBarTitle='Library'
                    element={<UserLibrary />}
                  />
                } />
                <Route path='settings' element={
                  <UserHome
                    appBarTitle='User Account Settings'
                    element={<UserSettings />}
                  />
                } />
                <Route path='store' element={
                  <UserHome
                    appBarTitle='Store'
                    element={<GamesStore />}
                  />
                } />
                <Route path='*' element={<Navigate to='library' />} />
              </Route>
            </Route>
            <Route path='dev'>
              <Route path='home'>
                <Route index element={<Navigate to='games' />} />
                <Route path='games' element={
                  <DevHome
                    appBarTitle='Published Games'
                    element={<DevGames />}
                  />
                } />
                <Route path='settings' element={
                  <DevHome
                    appBarTitle='Developer Account Settings'
                    element={<DevSettings />}
                  />
                } />
                <Route path='*' element={<Navigate to='games' />} />
              </Route>
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
