import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Components/redux/store'; // Importa el store de Redux

import App from './App';

ReactDOM.render(
  <Provider store={store}> {/* Pasa el store como prop al componente Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
