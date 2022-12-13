import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
	<BrowserRouter>
		<ColorModeScript />
		<App />
		<ToastContainer />
	</BrowserRouter>
);