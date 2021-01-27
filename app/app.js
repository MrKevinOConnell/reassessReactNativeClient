import React, { useState, useEffect } from 'react';
import Routes from './routes';

import {Provider, store} from '../store';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}
