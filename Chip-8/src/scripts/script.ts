class CPU {
	private memory: Uint8Array
	private stack: Uint8Array
	private registers: Uint8Array

	private PC: number
	private I: number
	private SP: number
	private DT: number
	private ST: number

	constructor() {
		const dropZone = document.getElementById("file-upload")
		dropZone?.addEventListener("change", this.loadRom)

		this.memory = new Uint8Array(4096)
		this.registers = new Uint8Array(16)
		this.stack = new Uint8Array(16)

		this.PC = 0x200 // memory[PC] will access the address of  the current instruction
		this.I = 0 // index register
		this.SP = -1 // stack pointer

		// timers
		this.DT = 0
		this.ST = 0
	}

	loadRom(ev: Event): void {
		const file = (<HTMLInputElement>ev.target).files?.[0]
		if (file?.type !== '') {
			console.log("not binary")
			return
		}

		const reader = new FileReader()

		reader.onload = (ev: ProgressEvent<FileReader>) => {
			const result = reader.result as ArrayBuffer
			const byteArray = Array.from(new Uint8Array(result))
			console.log(byteArray.map(x => '0x' + x.toString(16)))
			console.log(byteArray)
			for (let i = 0; i < byteArray.length; i++) {
				this.memory[0x200 + i] = byteArray[0]
			}
		}

		reader.readAsArrayBuffer(file)
	}
}