var input = document.getElementById('input');
var output = document.getElementById('output');
var outputText = document.getElementById()

var div = document.getElementById('div');

div.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON') {
    console.log("test");
    let loader = document.createElement('div');
    loader.className += " loader"
    output.parentNode.insertBefore(loader, output);
  }
});

// Brainfuck operators
const bfChars = [
  '>', '<', '+', '-',
  '[', ']', ',', '.'
];

// Ook! Operators
const okChars = [
  'Ook. Ook?', 'Ook? Ook.', 'Ook. Ook.', 'Ook! Ook!',
  'Ook! Ook?', 'Ook? Ook!', 'Ook. Ook!', 'Ook! Ook.'
];

// Brainfuck functions
const bfFunc = [
  // >
  () => { if (currentPointerAddress + 1 > max){
            throw 'Memory error: over ' + max;
          } else {
            currentPointerAddress++;
          } },
  // <
  () => { if (currentPointerAddress - 1 < 0){
            throw 'Memory error: under 0';
          } else {
            currentPointerAddress--;
          } },
  // +
  () => { memory[currentPointerAddress] += 1; },
  // -
  () => { memory[currentPointerAddress] -= 1; },
  // [
  () => { loopPos.push(currentPosition); },
  // ]
  ifCheck,
  // ,
  getInput,
  // .
  () => { output.value += String.fromCharCode(currentPointer); } 
];

var memory = [];                                    // Brainfuck's memory
var currentPointerAddress = 0;                      // The current pointer address inside memory
var currentPointer = memory[currentPointerAddress]; // The current pointer in memory
var currentPosition = 0;                            // The current position inside the input
var text;                                           // Input text
var num;                                            // the functions number inside the brainfuck operator array
var loopPos = [];                                   // Begining position of loop
var stopPos;
var prevPointerAdd = currentPointerAddress;
var max = 30000;

function fromBrainFuck(startValue = 0, txt = null) {
  text = txt || input.value;
  currentPointerAddress = prevPointerAdd;
  currentPosition = startValue;

  // fill array with junk data
  for (let i = 0; i < max; i++) {
    memory.push(0);
  }

  try {
    // Start parsing
    for(currentPosition = startValue; currentPosition < text.length; currentPosition++) {
      currentPointer = memory[currentPointerAddress];

      // Check if the current character is inside the brainfucks operator list
      if (bfChars.includes(text[currentPosition])) {
        let char = text[currentPosition]; // Get the current character
        num = bfChars.indexOf(char);      // Get the position of the character inside the brainfuck operators array
        
        // Run the function
        bfFunc[num]();
      }
    }
  } catch (err) {
    output.value = err;
  }

  // save the current pointer address for future reference
  prevPointerAdd = currentPointerAddress;
};


function ifCheck() {
  // If the currentpointer is 0, set the current position to itself otherwise to the loop position
  if (currentPointer == 0) {
    currentPosition = currentPosition;
    loopPos.pop();
  } else {
    currentPosition = loopPos[loopPos.length - 1];
  }
}

function getInput() {
  // Set the stop position and change the current position to max to stop the for loop
  stopPos = currentPosition;
  currentPosition = text.length;

  // Create the input element
  let input = document.createElement('input');
  let br = document.createElement('br');

  input.maxLength = 1;
  input.style.marginBottom = "1.5%";
  
  input.addEventListener('input', (e) => {
    // Change the current memory address to the pressed key
    memory[currentPointerAddress] = e.target.value.charCodeAt(0);

    // Remove the elements
    input.remove();
    br.remove();

    // Start the parsing again
    fromBrainFuck(stopPos + 1);
  });

  // Add the elements
  output.parentNode.insertBefore(input, output);
  output.parentNode.insertBefore(br, output);

  input.focus();
}

function fromOok() {
  let inputValue = input.value.replace(/(\r\n|\n|\r)/gm, " ").split(' ');
  let brainfuckString = "";

  for (let i = 0; i < inputValue.length; i += 2) {
    let combined = inputValue[i] + " " + inputValue[i + 1];

    if (okChars.includes(combined)) {
      num = okChars.indexOf(combined);
      brainfuckString += bfChars[num];
    }
  }
  fromBrainFuck(0, brainfuckString);
}