import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import TokenProvider from "./components/store/TokenProvider";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </TokenProvider>
);
