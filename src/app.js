import * as React from 'react';
import tw from 'twin.macro';

const App = () => (
	<div>
		<div
			css={[
				tw`flex flex-col items-center justify-center h-screen`,
				tw`bg-gradient-to-b from-blue-300 to-green-500`,
			]}
		>
			<main tw="flex flex-col justify-center h-full space-y-5 text-center">
				<h1 tw="text-white font-black text-6xl">Hello React</h1>
				<p tw="text-3xl">Developing apps with react is so easy!</p>
			</main>
		</div>
	</div>
);

export {App}
