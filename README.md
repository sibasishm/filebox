[](#table-of-contents)

## Table of contents

- [Getting started](#getting-started)
  - [Install the dependencies](#install-the-dependencies)
  - [Add the babel config](#add-the-babel-config)
  - [Complete the TypeScript setup](#complete-the-typescript-setup)

[](#getting-started)

## Getting started

### Install the dependencies

_Important_ Mac users need to change the script defined in the package.json file
from `SET NODE_ENV` to `NODE_ENV` and remove the `&` between two commands.

React and Babel

```shell
npm install react react-dom @babel/core @emotion/babel-plugin-jsx-pragmatic babel-plugin-macros
```

Twin and Emotion

```shell
npm install twin.macro @emotion/react @emotion/styled
```

<details>
  <summary>Install with Yarn</summary>

React and Babel

```shell
yarn add react react-dom @babel/core @emotion/babel-plugin-jsx-pragmatic babel-plugin-macros
```

Twin and Emotion

```shell
yarn add twin.macro @emotion/react @emotion/styled
```

</details>

### Add the babel config

To use the `tw` and `css` props, emotion must first extend jsx with a
[jsx pragma](https://emotion.sh/docs/css-prop#jsx-pragma).

The newest version looks like this and sits at the top of your files:

```js
/** @jsxImportSource @emotion/react */
```

**a) Auto inject the pragma:**

You can avoid adding the pragma yourself with the following babel config:

```js
// .babelrc
{
  "plugins": [
    "babel-plugin-macros",
    [
      "@emotion/babel-plugin-jsx-pragmatic",
      {
        "export": "jsx",
        "import": "__cssprop",
        "module": "@emotion/react"
      }
    ],
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "__cssprop",
        "pragmaFrag": "React.Fragment"
      }
    ]
  ]
}
```

**b) Or manually specify the jsx pragma in each file:**

First add these babel plugins:

```js
// .babelrc
{
  "plugins": [
    "babel-plugin-macros",
    ["@babel/plugin-transform-react-jsx", { "runtime": "automatic" }]
  ]
}
```

Then when styling with the tw or css prop, add the pragma at the top of your
file. This also replaces the react import:

```js
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const Input = () => <input tw="bg-black" />;
// or
const Input = () => <input css={tw`bg-black`} />;
```

> Note: After build, if you’re seeing "process is not defined" then npm install
> and add `"babel-plugin-transform-inline-environment-variables"` to .babelrc

### Complete the TypeScript setup

If you’re using TypeScript, you’ll need to add the remaining types for your
chosen css-in-js framework.

<details>
  <summary>Setup instructions</summary>

First up, you’ll need to install some types for React:

```bash
npm install -D @types/react
// or
yarn add @types/react -D
```

Then twin needs some type declarations added for your chosen css-in-js library,
otherwise you’ll see errors like this:

```js
Module '"../node_modules/twin.macro/types"' has no exported member 'styled'.
// or
Module '"../node_modules/twin.macro/types"' has no exported member 'css'.
// or
Property 'css' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.
```

To fix this, create a `twin.d.ts` file in your project root (`src/twin.d.ts`
with create-react-app) and add these declarations:

```typescript
// twin.d.ts
import 'twin.macro';
import styledImport from '@emotion/styled';
import { css as cssImport } from '@emotion/react';

// The css prop
// https://emotion.sh/docs/typescript#css-prop
import {} from '@emotion/react/types/css-prop';

declare module 'twin.macro' {
	// The styled and css imports
	const styled: typeof styledImport;
	const css: typeof cssImport;
}

// The 'as' prop on styled components
declare global {
	namespace JSX {
		interface IntrinsicAttributes<T> extends DOMAttributes<T> {
			as?: string;
		}
	}
}
```

Then add the following in `tsconfig.json`:

```typescript
// tsconfig.json
{
  "files": ["twin.d.ts"],
  // or
  // "include": ["twin.d.ts"],
}
```

Now that you’ve added the definitions, you can use these imports:

```typescript
import tw, { css, styled, theme } from 'twin.macro';
```

And these props:

```typescript
<div tw="">
<div css={}>
```

</details>
