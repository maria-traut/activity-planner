import { createGlobalStyle } from "styled-components";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default createGlobalStyle`

/** CSS Reset https://piccalil.li/blog/a-more-modern-css-reset/ */

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Prevent font size inflation */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

/* Remove default margin in favour of better control in authored CSS */
body, h1, h2, h3, h4, p,
figure, blockquote, dl, dd {
  margin-block-end: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  line-height: 1.5;
}

/* Set shorter line heights on headings and interactive elements */
h1, h2, h3, h4,
button, input, label {
  line-height: 1.1;
}

/* Balance text wrapping on headings */
h1, h2,
h3, h4 {
  text-wrap: balance;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input, button,
textarea, select {
  font-family: inherit;
  font-size: inherit;
}

/* Make sure textareas without a rows attribute are not tiny */
textarea:not([rows]) {
  min-height: 10em;
}

/* Anything that has been anchored to should have extra scroll margin */
:target {
  scroll-margin-block: 5ex;
}

/** end of CSS Reset */


:root {
	--gray-100: #F5F5F5;
	--gray-200: #E6E6E6;
	--gray-300: #D4D4D4;
	--gray-400: #A3A3A3;
	--gray-500: #737373;
	--gray-600: #575757;
	--gray-700: #444444;
	--gray-800: #333333;
	--gray-900: #242424;

	--accent-link-100: hsl(240, 85%, 90%);
	--accent-link-300: hsl(240, 85%, 70%);
	--accent-link-500: hsl(240, 85%, 50%);
	--accent-link-800: hsl(240, 15%, 20%);
	--accent-success-100: hsl(120, 70%, 90%);
	--accent-success-300: hsl(120, 70%, 70%);
	--accent-success-500: hsl(120, 70%, 40%);
	--accent-success-800: hsl(120, 70%, 20%);
	--accent-error-100: hsl(0, 85%, 95%);
	--accent-error-300: hsl(0, 85%, 70%);
	--accent-error-500: hsl(0, 85%, 60%);
	--accent-error-800: hsl(0, 15%, 20%);
	--accent-warning-100: hsl(45, 85%, 90%);
	--accent-warning-300: hsl(45, 85%, 70%);
	--accent-warning-500: hsl(45, 85%, 50%);
	--accent-warning-800: hsl(45, 15%, 20%);

	--text-font-family: ${inter.style.fontFamily};
	--text-font-size-normal:16px;
	--text-font-size-small:13px;
	--text-line-height:1.5em;

	--headline-font-family: ${inter.style.fontFamily};
	--headline-font-size-1:1.75rem;
	--headline-font-size-2:1.25rem;
	--headline-line-height:1.3em;
	--headline-letter-spacing:0.04em;

	--box-shadow-color:var(--gray-400);
	--box-shadow-normal:0px 0px 5px 0px var(--box-shadow-color);
	--box-shadow-large:0px 0px 10px 0px var(--box-shadow-color);

	--spacing-select-option:0.25rem;
	--spacing-small:0.5rem;
	--spacing-normal:1rem;
	--spacing-large:2rem;

	--spacing-local-small:0.5em;
	--spacing-local-normal:1em;
	--spacing-local-large:2em;

	--border-radius-small:5px;
	--border-radius-normal:10px;
	--border-radius-large:20px;

	--border-width-small:1px;
	--border-width-normal:2px;
	--border-color:var(--gray-900);

	--border-small:var(--border-width-small) solid var(--border-color);

	--card-image-height:200px;
	--detail-image-height:400px;

	--detail-headline-background-color:#F5F5F5BB;
	--detail-headline-box-shadow-large:0px 0px 10px 0px var(--detail-headline-background-color);
}

@media (prefers-color-scheme: dark) {
	:root {

		--box-shadow-color:var(--gray-600);
		--border-color:var(--gray-100);
		--detail-headline-background-color:#242424BB;
	}
}

body {
	margin: 0;
	width: 100%;
	display:flex;
	flex-direction:column;

	font-family:var(--text-font-family);
	font-size:var(--text-font-size-normal);
	line-height: var(--text-line-height);
	color:var(--gray-900);
	background-color:var(--gray-100);

	@media (prefers-color-scheme: dark) {
		color:var(--gray-100);
		background-color:var(--gray-900);
	}

}

h1, h2, h3, h4,
button, input, label {
  line-height: inherit;
}

h1, h2 {
	font-family:var(--headline-font-family);
	line-height:var(--headline-line-height);
	letter-spacing: var(--headline-letter-spacing);
	word-break: break-word;
}

h1 {
	font-size:var(--headline-font-size-1);
}

h2 {
	font-size:var(--headline-font-size-2);
}

p {
	max-width:75ch;
}

header {
	box-shadow: var(--box-shadow-large);
	padding: var(--spacing-normal);
}

main {
	display:flex;
	flex-direction:column;
	gap:var(--spacing-large);
	padding: var(--spacing-large) 0;
}

input[type="text"], input[type="password"], textarea {
	all:unset;
	color:inherit;
	box-shadow: none;
	padding: var(--spacing-small) var(--spacing-normal);
	border-radius: var(--border-radius-normal);
	border: var(--border-small);
	width:100%;
    box-sizing: border-box;
    max-width: 75ch;


    background-color: var(--gray-200);
}

textarea {
	resize: vertical;
	min-height:4rem;
	max-height:12rem;
}

select {
	color:inherit;
	box-shadow: none;
	padding: var(--spacing-small) var(--spacing-normal);
	border-radius: var(--border-radius-normal);
	border: var(--border-small);
	background-color: inherit;
	width:100%;
    max-width: 75ch;

    background-color: var(--gray-200);
}

select[multiple] {
	padding: var(--spacing-select-option) 0rem;
	width:100%;

	option:checked {
		background-color:var(--gray-400);
	}

	option:not(:checked):hover {
		background-color:var(--gray-300);
	}

	@media (prefers-color-scheme: dark) {
		option:checked {
			background-color:var(--gray-600);
		}

		option:not(:checked):hover {
			background-color:var(--gray-700);
		}
	}
}

option {
	color:inherit;
	padding: var(--spacing-select-option) var(--spacing-normal);
    background-color: var(--gray-200);
}


input[type="text"], input[type="password"], textarea, select, option {
	@media (prefers-color-scheme: dark) {
    background-color: var(--gray-800);
	}
}


button,
label {
	cursor:pointer;
}

a {
	text-decoration:none;
}

button {
	color:inherit;
	background-color:inherit;

    &:disabled {
        cursor: not-allowed;
    }
}

`;
