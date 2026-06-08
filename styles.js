import { createGlobalStyle } from "styled-components";
import { Inter } from "@next/font/google";
import { Fauna_One } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
const fauna = Fauna_One({ subsets: ["latin"], weight: "400" });

export default createGlobalStyle`

/** CSS Reset https://piccalil.li/blog/a-more-modern-css-reset/ */
*,::after,::before{box-sizing:border-box}html{-moz-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin-block-end:0}ol[role=list],ul[role=list]{list-style:none}body{min-height:100vh;line-height:1.5}button,h1,h2,h3,h4,input,label{line-height:1.1}h1,h2,h3,h4{text-wrap:balance}a:not([class]){text-decoration-skip-ink:auto;color:currentColor}img,picture{max-width:100%;display:block}button,input,select,textarea{font-family:inherit;font-size:inherit}textarea:not([rows]){min-height:10em}:target{scroll-margin-block:5ex}
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

	--app-background: #fcf6ee;

	--main-100: hsl(52.1, 92.2%, 89.8%);
	--main-200: hsl(52.1, 92.2%, 79.8%);
	--main-300: hsl(52.1, 92.2%, 69.8%);
	--main-400: hsl(52.1, 92.2%, 59.8%); 
	--main-500: hsl(52.1, 92.2%, 49.8%);
	--main-600: hsl(52.1, 92.2%, 39.8%);
	--main-700: hsl(52.1, 92.2%, 29.8%);
	--main-800: hsl(52.1, 92.2%, 19.8%);
	--main-900: hsl(52.1, 92.2%, 9.8%);

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

	--bookmark-button-color1:hsl(208, 100%, 95%);
	--bookmark-button-color2:hsl(208, 100%, 85%);

	font-size:14px;

	--text-font-family: ${inter.style.fontFamily};
	--text-font-size-normal:1rem;
	--text-font-size-small:10px;
	--text-font-size-xsmall: 10px; /* for tags */
	--text-line-height:1.5em;

	--headline-font-family: ${inter.style.fontFamily};
	--headline-font-size-1:1.75rem;
	--headline-font-size-2:1.25rem;
	--headline-line-height:1.3em;
	--headline-letter-spacing:0.02em;

	--accent-font-family: ${fauna.style.fontFamily};

	--box-shadow-color:var(--gray-400);
	--box-shadow-normal:0px 0px 5px 0px var(--box-shadow-color);
	--box-shadow-large:0px 0px 10px 0px var(--box-shadow-color);

	--spacing-select-option:0.25rem;
	--spacing-small:0.5rem;
	--spacing-normal:1rem;
	--spacing-large:2rem;

	/* design parser spacing grid rule */
	--eight-grid__halfstep: 4px;
	--eight-grid__s: 8px;
	--eight-grid__normal: 16px;
	--eight-grid__l: 24px;
	--eight-grid__xl: 32px;
	--eight-grid__xxl: 40px;




	--spacing-local-small:0.5em;
	--spacing-local-normal:1em;
	--spacing-local-large:2em;

	--border-radius-small:5px;
	--border-radius-normal:10px;
	--border-radius-large:20px;
	--border-radius-rounded:9999px;

	--border-width-small:1px;
	--border-width-normal:2px;
	--border-color:var(--gray-900);

	--border-small:var(--border-width-small) solid var(--border-color);
	--border-normal:var(--border-width-normal) solid var(--border-color);

	--card-image-height:144px;
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

html.dark:not(.system) {
		--box-shadow-color:var(--gray-600);
		--border-color:var(--gray-100);
		--detail-headline-background-color:#242424BB;
}

body {
	margin: 0;
	width: 100%;
	display:flex;
	flex-direction:column;

	font-family:var(--text-font-family);
	font-size:var(--text-font-size-normal);
	line-height: var(--text-line-height);
	color:var(--main-900);
	background-color: var(--app-background);

	@media (prefers-color-scheme: dark) {
		color: var(--gray-100);
		background-color: var(--gray-900);
	}
	html.dark:not(.system) & {
		color: var(--gray-100);
		background-color: var(--gray-900);
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
	
	padding: var(--eight-grid__normal);
}

main {
	display:flex;
	flex-direction:column;
    flex-grow: 1;

	/* checkered background */ 
  	inset: 0;
  	height: 100%;
  	width: 100%;
  	background-image: linear-gradient(to right, #80808012 1px, transparent 1px),
    linear-gradient(to bottom, #80808012 1px, transparent 1px);
  	background-size: 16px 16px;
}

input[type="text"], input[type="password"], input[type="url"], textarea {
	all:unset;
	color:inherit;
	box-shadow: none;
	padding: var(--eight-grid__s) var(--eight-grid__s);
	border-radius: var(--border-radius-normal);
	border: var(--border-small);
	width:100%;
    box-sizing: border-box;
    max-width: 75ch;


    background-color: var(--gray-200);

	&:focus,
	&:hover {
    	background-color: var(--gray-300);
	}
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
	html.dark:not(.system) & {
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


input[type="text"], input[type="url"], input[type="password"], textarea, select, option {
	@media (prefers-color-scheme: dark) {
    	background-color: var(--gray-800);
	}
	html.dark:not(.system) & {
    	background-color: var(--gray-800);
	}
}

input[type="checkbox"] {
	width:1.5rem;
	height:1.5rem;
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
