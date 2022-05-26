import instructionsParser from './instructions.js';
import A from 'arcsecond';
import { label } from './common.js';

export default A.many(A.choice([
	instructionsParser,
	label
]));