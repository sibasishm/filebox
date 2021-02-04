import React from 'react';
import { render } from 'react-dom';
import { GlobalStyles } from 'twin.macro';
import { App } from './app';

render(
	<>
		<GlobalStyles />
		<App />
	</>,
	document.getElementById('root')
);
