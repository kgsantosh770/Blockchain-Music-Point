import ReactDOM from 'react-dom/client';
import App from './App';
import {WalletContextProvider} from "./WalletContext"

import "./scss/base/global.scss"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <WalletContextProvider>
    <App />
  </WalletContextProvider>
);
