// Create a new AudioContext instance to handle audio operations.
// Re-using audio contexts is recommended due to browser limitations on the number of concurrent audio contexts.
let audioContext = new AudioContext();

// Function to generate a beep sound.
// Parameters:
// - vol: Volume of the beep sound (0 to 100).
// - freq: Frequency of the beep sound in Hertz.
// - duration: Duration of the beep sound in milliseconds.
// - waveform: Optional parameter to specify the waveform type (e.g., "sine", "square", "sawtooth", "triangle").
function beep(vol, freq, duration, waveform = "triangle") {
    console.log({ vol, freq, duration, waveform }); // Log the parameters for debugging purposes.

    // Create an oscillator node to generate the audio signal.
    let oscillator = audioContext.createOscillator();

    // Create a gain node to control the volume of the audio signal.
    let gainNode = audioContext.createGain();

    // Connect the oscillator node to the gain node.
    oscillator.connect(gainNode);

    // Set the frequency of the oscillator node to the specified frequency.
    oscillator.frequency.value = freq;

    // Set the waveform type of the oscillator node.
    oscillator.type = waveform;

    // Connect the gain node to the destination, typically the speakers or headphones.
    gainNode.connect(audioContext.destination);

    // Set the gain (volume) value of the gain node.
    // The value is normalized to a range between 0 and 1, hence multiplying by 0.01.
    gainNode.gain.value = vol * 0.01;

    // Schedule the start and stop times of the oscillator node to generate the beep sound.
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration * 0.001); // Convert duration from milliseconds to seconds.

    // Note: The beep sound will be automatically stopped after the specified duration.
}
