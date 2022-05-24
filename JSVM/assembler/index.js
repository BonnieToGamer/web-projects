import parser from './parser/index.js';
import instructions from '../instructions/index.js';
import meta, { instructionTypes } from '../instructions/meta.js';
import { register } from './parser/common.js';
const I = instructionTypes;

const registerMap = {
	ip: 0,
	acc: 1,
	r1: 2,
	r2: 3,
	r3: 4,
	r4: 5,
	r5: 6,
	r6: 7,
	r7: 8,
	r8: 9,
    sp: 10,
	fp: 11
};

const exampleProgram = [
	'mov $4200, r1',
	'mov r1, &0060',
	'mov $1300, r1',
	'mov &0060, r2',
	'add r1, r2'
].join('\n');

const parsedOutput = parser.run(exampleProgram);

const machineCode = [];

const encodeLitOrMem = lit => {
	const hexVal = parseInt(lit.value, 16);
	const hightByte = (hexVal & 0xff00) >> 8;
	const lowByte = hexVal & 0x00ff;
	machineCode.push(hightByte, lowByte);
};

const encodeLit8 = lit => {
	const hexVal = paseInt(lit.value, 16);
	const lowByte = hexVal & 0x00ff;
	machineCode.push(lowByte);
};

const encodeReg = reg => {
	const mappedReg = register[reg.value];
	machineCode.push(mappedReg);
};

parsedOutput.result.forEach(instruction => {
	const metadata = instructions[instruction.value.instruction];
	machineCode.push(metadata.opcode);

	if ([I.litReg, I.memReg].includes(metadata.type)) {
		encodeLitOrMem(instruction.value.args[0]);
		encodeReg(instruction.value.args[1]);
	}
	
	if (I.regLit8 === metadata.type) {
		encodeReg(instruction.value.args[0]);
		encodeLit8(instruction.value.args[1]);
	}
	
	if ([I.regLit, I.regMem].includes(metadata.type)) {
		encodeReg(instruction.value.args[0]);
		encodeLitOrMem(instruction.value.args[1]);
	}
	
	if (I.litMem === metadata.type) {
		encodeLitOrMem(instruction.value.args[0]);
		encodeLitOrMem(instruction.value.args[1]);
	}
	
	if ([I.regReg, I.regPtrReg].includes(metadata.type)) {
		encodeReg(instruction.value.args[0]);
		encodeReg(instruction.value.args[1]);
	}
	
	if (I.litOffReg === metadata.type) {
		encodeLitOrMem(instruction.value.args[0]);
		encodeReg(instruction.value.args[1]);
		encodeReg(instruction.value.args[2]);
	}
	
	if (I.singleReg === metadata.type) {
		encodeReg(instruction.value.args[0]);
	}
	
	if (I.singleLit === metadata.type) {
		encodeLitOrMem(instruction.value.args[0]);
	}
});

console.log(machineCode.join(' '));