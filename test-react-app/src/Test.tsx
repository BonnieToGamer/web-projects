export interface Tester {
	test: string,
}

export default function Test(props: Tester): JSX.Element {
	const test = 'asd';

	const clicked = () => {
		alert('clicked!');
	}

	return (
		<div style = {{
			position: 'absolute',
			top: '50%',
  			left: '50%',
			transform: 'translate(-50%, -50%)',
			color: 'white',
			fontSize: '5rem'
		}}>
			<p>
				This test is {test}, i have a {props.test}
			</p>

			<button onClick={clicked}>click me!</button>
		</div>
	)
}