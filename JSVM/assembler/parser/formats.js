import A from 'arcsecond';
import T from './types.js';
import { register, hexLiteral, upperOrLowerStr, address } from './common.js';
import { squareBracketExpr } from './expressions.js';

export const litReg = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const arg1 = yield A.choice([
        hexLiteral,
        squareBracketExpr
    ]);

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const arg2 = yield register;
    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [arg1, arg2]
    });
});

export const regLit = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const r1 = yield register;

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const lit = yield A.choice([
        hexLiteral,
        squareBracketExpr
    ]);
    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [r1, lit]
    });
});

export const regReg = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const r1 = yield register;

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const r2 = yield register;
    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [r1, r2]
    });
});

export const regMem = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const r1 = yield register;

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const addr = yield A.choice([
        address,
        A.char('&').chain(() => squareBracketExpr)
    ]);

    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [r1, addr]
    });
});

export const memReg = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
	yield A.whitespace;
	
	const addr = yield A.choice([
		address,
		A.char('&').chain(() => squareBracketExpr)
	]);

	yield A.optionalWhitespace;
	yield A.char(',');
	yield A.optionalWhitespace;

	const r1 = yield register; 

	yield A.optionalWhitespace;

	return T.instruction({
		instruction: type,
		args: [addr, r1],
	});
});

export const litMem = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const lit = yield A.choice([
        hexLiteral,
        squareBracketExpr
    ]);

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const addr = yield A.choice([
        address,
        A.char('&').chain(() => squareBracketExpr)
    ]);

    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [lit, addr]
    });
});

export const regPtrReg = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const r1 = yield A.char('&').chain(() => register);

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const r2 = yield register;

    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [r1, r2]
    });
});

export const litOffReg = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const lit = yield A.choice([
        hexLiteral,
        squareBracketExpr
    ]);

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const r1 = yield A.char('&').chain(() => register);

    yield A.optionalWhitespace;
    yield A.char(',');
    yield A.optionalWhitespace;

    const r2 = yield register;

    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [lit, r1, r2]
    });
});

export const noArgs = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: []
    });
});

export const singleReg = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const r1 = yield register;
    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [r1]
    });
});

export const singleLit = (mnemonic, type) => A.coroutine(function*() {
    yield upperOrLowerStr(mnemonic);
    yield A.whitespace;

    const lit = yield A.choice([
        hexLiteral,
        squareBracketExpr
    ]);

    yield A.optionalWhitespace;

    return T.instruction({
        instruction: type,
        args: [lit]
    });
});

export default {
    litReg,
	regReg,
	regLit,
	regMem,
	memReg,
	litMem,
	regPtrReg,
	litOffReg,
	noArgs,
	singleReg,
	singleLit,
}