import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { TodoList } from './TodoList';

function App() {
  return <CookiesProvider>
    <TodoList />
  </CookiesProvider>;
}

export default App;
