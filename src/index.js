import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import {
  BrowserRouter,
  // createBrowserRouter,
  // createRoutesFromElements,
  // RouterProvider,
} from 'react-router-dom';
import './index.css';

// const router = createBrowserRouter(createRoutesFromElements(<App />));

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/react-hw-05-movies/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
