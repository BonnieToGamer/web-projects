class Emulator {
	private memory: number[];
	private V: number[];
	private PC: number;
	private I: number;
	private opcode: Function;
	private arg_x: Function;
	private arg_y: Function;
	private arg_xnnn: Function;
	private arg_xxnn: Function;
	private arg_xxxn: Function;

	constructor() {
		const dropZone = document.getElementById("file-upload");
		dropZone?.addEventListener("change", this.loadRom);

		this.memory = new Array(4096).fill(0);
		this.V = new Array(16).fill(0);
		this.PC = 0;
		this.I = 0;

		this.opcode = (): number => (this.memory[this.PC] << 8) | this.memory[this.PC + 1];

		// instructions
		this.arg_x = (): number => (this.opcode() & 0x0f00) >> 8;
		this.arg_y = (): number => (this.opcode() & 0x00f0) >> 4;
		this.arg_xnnn = (): number => this.opcode() & 0xfff;
		this.arg_xxnn = (): number => this.opcode() & 0x00ff;
		this.arg_xxxn = (): number => this.opcode() & 0x000f;

		this.V[this.arg_x()] = this.V[this.arg_y()];
	}

	loadRom(ev: Event): void {
		const file = (<HTMLInputElement>ev.target).files?.[0];
		if (file?.type !== '') {
			console.log("not binary");
			return;
		}

		const reader = new FileReader();

		reader.onload = (ev: ProgressEvent<FileReader>) => {
			const result = reader.result as ArrayBuffer;
			const byteArray = Array.from(new Uint8Array(result));
			console.log(byteArray.map(x => '0x' + x.toString(16)));

			for (let i = 0; i < byteArray.length; i++) {
				this.memory[0x200 + i] = byteArray[0];
			}
		}

		reader.readAsArrayBuffer(file);
	}

	runRom(): void {
		// fetch
		this.PC++;

		// decode
		const instruction = this.opcode() & 0x0;
		const arg1 = this.opcode() & 0x1;
		const arg2 = this.opcode() & 0x2;

		// execute


		requestAnimationFrame(this.runRom);
	}
}

new Emulator();