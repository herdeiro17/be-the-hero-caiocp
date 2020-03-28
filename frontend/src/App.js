import React from 'react'; // o useState precisa ser iniciado para poder fazer alterações no código
import './global.css';

import Routes from './routes';//não precisa colocar tb /index pq ele já puxa automático esse arquivo

function App() {
  return ( 
    <div> 
      <Routes />
    </div>//essa estrutura div abaixo precisa ser utilizada para agrupar mais de uma TAG
  );
}

export default App;
