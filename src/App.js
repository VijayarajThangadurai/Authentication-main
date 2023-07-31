import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import TokenContext from './components/store/token-context';
// import TokenProvider from './components/store/TokenProvider';
function App() {
  const tokenCtx = useContext(TokenContext);
  // if (tokenCtx.isLoggedIn){}
  return (
 
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        {!tokenCtx.isLoggedIn && (
 <Route path='/auth'>
 <AuthPage />
</Route>
        )}
        <Route path="/profile">
          {tokenCtx.isLoggedIn && <UserProfile/>}
          {!tokenCtx.isLoggedIn && <Redirect to="/auth"/>}
        </Route>
       <Route path="*">
        <Redirect to="/"/>
       </Route>
       
       </Switch>
        </Layout>
  );
}

export default App;
