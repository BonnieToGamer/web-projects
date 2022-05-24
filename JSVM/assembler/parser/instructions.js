import A from 'arcsecond';
import {
	litReg,
	regLit,
	regReg,
	regMem,
	memReg,
	litMem,
	regPrtReg,
	litOffReg,
	noArgs,
	singleReg,
	singleLit
} from './formats.js';

export const mov = A.choice([
	regReg('mov', 'MOV_REG_REG'),
	litReg('mov', 'MOV_LIT_REG'),
	memReg('mov', 'MOV_MEM_REG'),
	regMem('mov', 'MOV_REG_MEM'),
	litMem('mov', 'MOV_LIT_MEM'),
	regPrtReg('mov', 'MOV_REG_PTR_REG'),
	litOffReg('mov', 'MOV_LIT_OFF_REG'),
]);

export const add = A.choice([
	regReg('add', 'ADD_REG_REG'),
	litReg('add', 'ADD_LIT_REG'),
	regLit('add', 'ADD_REG_LIT')
]);

export const sub = A.choice([
	regReg('sub', 'SUB_REG_REG'),
	litReg('sub', 'SUB_LIT_REG')
]);

export const mul = A.choice([
	regReg('mul', 'MUL_REG_REG'),
	litReg('mul', 'MUL_LIT_REG')
]);

export const lsf = A.choice([
	regReg('lsf', 'LSF_REG_REG'),
	regLit('lsf', 'LSF_LIT_REG')
]);

export const rsf = A.choice([
	regReg('rsf', 'RSF_REG_REG'),
	regLit('rsf', 'RSF_LIT_REG')
]);

export const and = A.choice([
	regReg('and', 'AND_REG_REG'),
	litReg('and', 'AND_LIT_REG')
]);

export const or = A.choice([
	regReg('or', 'OR_REG_REG'),
	litReg('or', 'OR_LIT_REG')
]);

export const xor = A.choice([
	regReg('xor', 'XOR_REG_REG'),
	litReg('xor', 'XOR_LIT_REG')
]);

export const inc = singleReg('inc', 'INC_REG');
export const dec = singleReg('dec', 'DEC_REG');
export const not = singleReg('not', 'NOT');

export const jeq = A.choice([
	regMem('jeq', 'JEQ_REG'),
	litMem('jeq', 'JEQ_LIT'),
]);

export const jne = A.choice([
	regMem('jne', 'JNE_REG'),
	litMem('jne', 'JNE_LIT'),
]);

export const jlt = A.choice([
	regMem('jlt', 'JLT_REG'),
	litMem('jlt', 'JLT_LIT'),
]);

export const jgt = A.choice([
	regMem('jgt', 'JGT_REG'),
	litMem('jgt', 'JGT_LIT'),
]);

export const jle = A.choice([
	regMem('jle', 'JLE_REG'),
	litMem('jle', 'JLE_LIT'),
]);

export const jge = A.choice([
	regMem('jge', 'JGE_REG'),
	litMem('jge', 'JGE_LIT'),
]);

export const psh = A.choice([
	singleLit('psh', 'PSH_LIT'),
	singleReg('psh', 'PSH_REG'),
]);

export const pop = singleReg('pop', 'POP_REG');

export const cal = A.choice([
	singleLit('cal', 'CAL_LIT'),
	singleReg('cal', 'CAL_REG'),
]);

export const ret = noArgs('ret', 'RET');
export const hlt = noArgs('hlt', 'HLT');

export default A.choice([
	mov,
	add,
	sub,
	inc,
	dec,
	mul,
	lsf,
	rsf,
	and,
	or,
	xor,
	not,
	jne,
	jeq,
	jlt,
	jgt,
	jle,
	jge,
	psh,
	pop,
	cal,
	ret,
	hlt
]);