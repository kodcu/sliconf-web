import styled from 'styled-components';

export const LoginButton = styled.button`
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border-radius: 3px;

	/* Color the border and text with theme.main */
	color: ${props => props.theme.main};
	background: ${props => props.theme.buttonBackground};
	border: 2px solid ${props => props.theme.main};
`;


export const HugeButton = styled.button`
	font-size: 5em;
	margin: 1em;
	padding: 0.25em 1em;
	border-radius: 3px;

	/* Color the border and text with theme.main */
	color: ${props => props.theme.main};
	border: 2px solid ${props => props.theme.main};
`;
