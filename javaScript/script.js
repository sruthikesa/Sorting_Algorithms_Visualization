// Define an array to store bar elements
let bars = [];

// Define colors for bars
const defaultColor = "#008000";
const changeColor = "red";
const finishedColor = "#8ef511";
const selectedColor = "yellow";

// Function to execute when the window is loaded
window.onload = setup();

// Function to set up the initial state
async function setup() {
    // Get the number of bars and delay input elements
    let b = document.getElementById("bars");
    let d = document.getElementById("delay");
    
    // Set text to display the number of bars and delay
    document.getElementById("b").innerText = b.value;
    document.getElementById("d").innerText = d.value + "ms";

    // Generate bars if the number of bars has changed
    if (bars.length !== parseInt(b.value)) {
        generateBars(parseInt(b.value));
    }
}

// Function to reset the page
function reset() {
    location.reload();
}

// Function to disable input elements
function disableInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
    return parseInt(document.getElementById("delay").value);
}

// Function to indicate finished sorting
function finishedSorting() {
    // Change the background color of all bars to indicate sorting is finished
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = finishedColor;
    }
    // Enable input elements
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }
}

// Function to generate random bars
function generateBars(n = -1) {
    bars = [];
    let container = document.getElementById("container");
    // If number of bars is not provided, generate a random number of bars
    n = n < 0 ? Math.floor(Math.random() * 20) : n;
    for (let i = 0; i < n; i++) {
        // Generate random height for each bar
        let height = Math.floor(2 + Math.random() * 98);
        // Create a new bar element
        let barElement = document.createElement("div");
        // Add class and ID attributes to the bar element
        barElement.classList.add("bar");
        barElement.setAttribute("id", i);
        // Set the height and background color of the bar
        barElement.style.height = height + "%";
        barElement.style.backgroundColor = defaultColor;
        // Add the bar element to the bars array
        bars.push(barElement);
    }
    // Clear previous bars and append new bars to the container
    container.innerHTML = "";
    bars.forEach(bar => {
        container.appendChild(bar);
    });
}

// Function to asynchronously sleep for a specified duration
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to map a value from one range to another range
function mapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//=============================== Sorting Algorithms ==================================//


// 1
// SELECTION SORT

// SelectionSort() : Implementation of selection sort algorithm. O(n^2) 
async function SelectionSort() {
    // Get delay value for visualizing sorting
    let delay = disableInputs();

    // Get the container element where bars are displayed
    let container = document.getElementById("container");

    // Loop through each bar
    for (let i = 0; i < bars.length; i++) {
        // Initialize minIndex as the current index
        let minIndex = i;
        // Get the ID of the current bar
        let currentId = bars[i].getAttribute("id");
        // Highlight the current bar
        bars[i].style.backgroundColor = selectedColor;
        // Calculate sound frequency based on the height of the current bar
        let sound = mapRange(parseFloat(bars[i].style.height), 2, 100, 500, 1000);
        // Play sound
        beep(100, sound, delay);

        // Loop through the remaining bars to find the minimum
        for (let j = i + 1; j < bars.length; j++) {
            // Highlight the compared bar
            bars[j].style.backgroundColor = changeColor;
            // Get the heights of the current minimum and the compared bar
            let a = parseFloat(bars[minIndex].style.height);
            let b = parseFloat(bars[j].style.height);
            // Update minIndex if the compared bar is smaller
            if (a > b) minIndex = j;
            // Wait for a short delay to visualize the comparison
            await sleep(delay / 5.0);
            // Reset the color of the compared bar
            bars[j].style.backgroundColor = defaultColor;
        }

        // Highlight the minimum bar found
        bars[minIndex].style.backgroundColor = selectedColor;
        // Wait for a short delay to visualize the selection
        await sleep(2 * delay / 5.0);

        // Swap the current bar with the minimum bar
        let tmp = bars[minIndex];
        bars[minIndex] = bars[i];
        bars[i] = tmp;

        // Update the display by clearing and re-appending bars
        container.innerHTML = ""; // Clear previous bars
        bars.forEach(bar => {
            container.appendChild(bar);
        });

        // Wait for a short delay to visualize the swap
        await sleep(2 * delay / 5.0);
        // Reset the color of the swapped bars
        bars[i].style.backgroundColor = defaultColor;
        bars[minIndex].style.backgroundColor = defaultColor;
    }
    // Indicate that sorting is finished
    finishedSorting();
}





// 2
// BUBBLE SORT

// BubbleSort() : Implementation of bubble sort algorithm. O(n^2)
async function BubbleSort() {
    // Get delay value for visualizing sorting
    let delay = disableInputs();
    // Get the container element where bars are displayed
    let container = document.getElementById("container");

    // Outer loop for each pass through the array
    for (let i = 0; i < bars.length - 1; i++) {
        // Flag to track if any swaps were made in this pass
        let hasSwap = false;
        // Inner loop for comparing adjacent elements and swapping if necessary
        for (let j = 0; j < bars.length - i - 1; j++) {
            // Get IDs of the current and next bars
            let currId = bars[j].getAttribute("id");
            let nextId = bars[j + 1].getAttribute("id");

            // Highlight the current bar
            bars[j].style.backgroundColor = selectedColor;
            // Calculate sound frequency based on the height of the current bar and play sound
            let sound = mapRange(parseFloat(bars[j].style.height), 2, 100, 500, 1000);
            beep(100, sound, delay);
            // Highlight the next bar
            bars[j + 1].style.backgroundColor = changeColor;
            // Wait for a short delay to visualize the comparison
            await sleep(delay / 2);

            // Get the heights of the current and next bars
            let a = parseFloat(bars[j].style.height);
            let b = parseFloat(bars[j + 1].style.height);
            // If the current bar is taller than the next one, swap them
            if (a > b) {
                hasSwap = true;

                // Swap the bars
                let temp = bars[j];
                bars[j] = bars[j + 1];
                bars[j + 1] = temp;

                // Update the display by clearing and re-appending bars
                container.innerHTML = ""; // Clear previous bars
                bars.forEach(bar => {
                    container.appendChild(bar);
                });
            }

            // Reset the color of the current and next bars
            bars[j].style.backgroundColor = selectedColor;
            bars[j + 1].style.backgroundColor = changeColor;
            // Wait for a short delay to visualize the swap
            await sleep(delay / 2);
            // Reset the color of the current and next bars
            bars[j].style.backgroundColor = defaultColor;
            bars[j + 1].style.backgroundColor = defaultColor;
        }
        // If no swaps were made in this pass, the array is already sorted
        if (!hasSwap) break;
    }
    // Indicate that sorting is finished
    finishedSorting();
}






// 3
// INSERTION SORT

// InsertionSort() : Implementation of insertion sort algorithm. O(n^2) 
async function InsertionSort() {
    // Get delay value for visualizing sorting
    let delay = disableInputs();
    // Get the container element where bars are displayed
    let container = document.getElementById("container");
    
    // Iterate through each element starting from the second one
    for (let i = 1; i < bars.length; i++) {
        // Initialize variable j to the index before the current element
        let j = i - 1;
        // Store the current key element
        let key = bars[i];
        // Get the IDs of the current and previous bars
        let currentId = key.getAttribute("id");
        let nextId = bars[j].getAttribute("id");
        // Highlight the current bar
        bars[i].style.backgroundColor = selectedColor;
        // Calculate sound frequency based on the height of the current bar and play sound
        let sound = mapRange(parseFloat(bars[i].style.height), 2, 100, 500, 1000);
        beep(100, sound, delay);
        
        // Move elements of bars[0..i-1], that are greater than key, to one position ahead of their current position
        while (j >= 0 && parseFloat(bars[j].style.height) > parseFloat(key.style.height)) {
            // Reset color of the previous bar
            bars[j].style.backgroundColor = defaultColor;
            // Shift the current bar to the right
            bars[j + 1] = bars[j];
            // Decrement j
            j--;

            // If j is still within bounds, highlight the next bar
            if (j >= 0) {
                nextId = bars[j].getAttribute("id");
                bars[j].style.backgroundColor = changeColor;
                // Wait for a short delay to visualize the comparison
                await sleep(delay);
                // Reset the color of the previous bar
                bars[j].style.backgroundColor = defaultColor;
            }
        }

        // Place the key element at its correct position
        bars[j + 1] = key;
        // Update the display by clearing and re-appending bars
        container.innerHTML = ""; // Clear previous bars
        bars.forEach(bar => {
            container.appendChild(bar);
        });

        // Reset color of the current and previous bars
        bars[i].style.backgroundColor = selectedColor;
        bars[j + 1].style.backgroundColor = changeColor;
        // Wait for a short delay to visualize the swap
        await sleep(delay * 3.0 / 5);
        // Reset color of the current and previous bars
        bars[i].style.backgroundColor = defaultColor;
        bars[j + 1].style.backgroundColor = defaultColor;
    }
    // Indicate that sorting is finished
    finishedSorting();
}



// 4
// MERGE SORT

// Slide_down() : Places bars[r] at lth position by sliding other bars to the right.
// This function is used in the merge step of the merge sort algorithm.
function slideDown(l, r) {
    let temp = bars[r];
    for (let i = r - 1; i >= l; i--) {
        bars[i + 1] = bars[i];
    }
    bars[l] = temp;
}

// merge() : Merges two sorted subarrays [l...m] and [m+1...r] into a single sorted array.
// This function is a part of the merge sort algorithm.
async function merge(l, m, r, d) {
    let y = l;
    let i = l;
    let j = m + 1;

    // Iterate through both subarrays and merge them into a single sorted array
    while (i < j && j <= r && bars[j] && bars[i]) {
        let a = parseInt(bars[j].style.height);
        let b = parseInt(bars[i].style.height);

        // Compare heights of elements at indices j and i
        if (a > b) {
            i++; // Move to the next element in the left subarray
        } else {
            // If element at j is smaller than element at i, slide down elements and insert element at j to correct position
            slideDown(i, j);
            i++;
            j++;
        }

        // Get IDs of current and next elements
        let curr_id = bars[j] ? bars[j].getAttribute('id') : null;
        let nxt_ele = bars[i] ? bars[i].getAttribute('id') : null;

        // If current and next elements exist, perform visualization and sorting steps
        if (curr_id && nxt_ele) {
            bars[j].style.backgroundColor = selectedColor;
            bars[i].style.backgroundColor = changeColor;

            await sleep(d / 2.0);
            container.innerHTML = ""; // Clear previous bars
            bars.forEach(bar => {
                container.appendChild(bar);
            });

            bars[j].style.backgroundColor = selectedColor;
            bars[i].style.backgroundColor = changeColor;

            let sound = mapRange(parseInt(bars[j].style.height.split('%')[0]), 2, 100, 500, 1000);
            beep(100, sound, d);

            await sleep(d / 2.0);
            bars[i].style.backgroundColor = defaultColor;
            bars[j].style.backgroundColor = defaultColor;

            sound = mapRange(parseInt(bars[j].style.height.split('%')[0]), 2, 100, 500, 1000);
            beep(100, sound, d);
        }
    }
}

// mergeSort() : Implements the merge sort algorithm to sort the array of bars.
// It recursively divides the array into two halves, sorts them, and then merges the sorted halves.
// Time complexity: O(n log n), where n is the number of elements in the array.
async function mergeSort(l, r, d) {
    if (l < r) {
        let m = parseInt(l + (r - l) / 2);
        await mergeSort(l, m, d); // Sort the left half
        await mergeSort(m + 1, r, d); // Sort the right half
        await merge(l, m, r, d); // Merge the sorted halves
    }
}

// MergeSort() : Initiates the merge sort process by disabling inputs, performing the sorting, and enabling inputs after sorting.
async function MergeSort() {
    let delay = disableInputs();
    await mergeSort(0, bars.length - 1, delay); // Call mergeSort function to sort the entire array
    finishedSorting(); // Indicate that sorting is finished
}



// 5
// QUICK SORT

// Partition(): Places the (r)th bar at the correct position
// This function selects a pivot element, arranges elements such that elements less than the pivot are on its left,
// and elements greater than the pivot are on its right.
// Time complexity: O(n), where n is the number of elements in the subarray.
async function partition(l, r, delay) {
    let i = l - 1; // Index of smaller element
    let j = l; // Index of current element being processed
    let pivotId = bars[r].getAttribute("id"); // ID of the pivot element
    document.getElementById(pivotId).style.backgroundColor = selectedColor; // Highlight the pivot element

    // Iterate through the subarray from l to r
    for (j = l; j < r; j++) {
        let a = parseInt(bars[j].style.height); // Height of the current element
        let b = parseInt(bars[r].style.height); // Height of the pivot element

        // If current element is smaller than the pivot element
        if (a < b) {
            // Increment index of smaller element
            i++;

            // Swap elements at indices i and j
            let currentId = bars[i].getAttribute("id");
            let nextId = bars[j].getAttribute("id");
            bars[i].style.backgroundColor = changeColor; // Highlight the current element being moved to the left
            bars[j].style.backgroundColor = changeColor; // Highlight the element being moved to the right

            // Swap the elements
            let temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;

            // Visualize the swapping
            await sleep(delay / 3.0);
            container.innerHTML = ""; // Clear previous bars
            bars.forEach(bar => {
                container.appendChild(bar);
            });
            bars[i].style.backgroundColor = changeColor; // Highlight the swapped element on the left
            bars[j].style.backgroundColor = changeColor; // Highlight the swapped element on the right
            document.getElementById(pivotId).style.backgroundColor = selectedColor; // Highlight the pivot element

            // Play sound effect
            let sound = mapRange(parseFloat(bars[i].style.height), 2, 100, 500, 1000);
            beep(100, sound, delay);
            await sleep(delay / 3.0);

            // Reset background colors after swapping
            bars[i].style.backgroundColor = defaultColor;
            bars[j].style.backgroundColor = defaultColor;
        }
    }

    // Swap the pivot element with the element at index i+1
    let temp = bars[i + 1];
    bars[i + 1] = bars[r];
    bars[r] = temp;

    // Visualize the final position of the pivot element
    container.innerHTML = ""; // Clear previous bars
    bars.forEach(bar => {
        container.appendChild(bar);
    });
    document.getElementById(pivotId).style.backgroundColor = selectedColor; // Highlight the pivot element
    await sleep(delay / 3.0);
    document.getElementById(pivotId).style.backgroundColor = defaultColor; // Reset background color of the pivot element

    // Return the index of the pivot element
    return i + 1;
}

// quickSort(): Implements the quick sort algorithm to sort the array of bars.
// It recursively divides the array into two subarrays, sorts them, and combines them.
// Time complexity: O(n log n) average case, O(n^2) worst case, where n is the number of elements in the array.
async function quickSort(l, r, delay) {
    if (l < r) {
        let pivot = await partition(l, r, delay); // Partition the array and get the pivot index
        await quickSort(l, pivot - 1, delay); // Sort the left subarray
        await quickSort(pivot + 1, r, delay); // Sort the right subarray
    }
}

// QuickSort(): Initiates the quick sort process by disabling inputs, performing the sorting, and enabling inputs after sorting.
async function QuickSort() {
    let delay = disableInputs();
    await quickSort(0, bars.length - 1, delay); // Call quickSort function to sort the entire array
    finishedSorting(); // Indicate that sorting is finished
}





// 6
// HEAP SORT

// heapify(): Creates a max heap from a given array.
// It arranges the elements of the array in such a way that the parent node is greater than or equal to its children.
// Time complexity: O(log n), where n is the size of the heap.
async function heapify(n, i, delay) {
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left child
    let r = 2 * i + 2; // right child

    // IDs of the current node and its children
    let currId = bars[i].getAttribute("id");
    let nextIdL = l < n ? bars[l].getAttribute("id") : null;
    let nextIdR = r < n ? bars[r].getAttribute("id") : null;

    // Highlight the current node and its children
    bars[i].style.backgroundColor = selectedColor;
    if (nextIdR) {
        document.getElementById(nextIdR).style.backgroundColor = changeColor;
    }
    if (nextIdL) {
        document.getElementById(nextIdL).style.backgroundColor = changeColor;
    }
    await sleep(delay / 3.0); // Delay for visualization

    // If left child is larger than root
    if (l < n && parseInt(bars[l].style.height) > parseInt(bars[largest].style.height))
        largest = l;

    // If right child is larger than largest so far
    if (r < n && parseInt(bars[r].style.height) > parseInt(bars[largest].style.height))
        largest = r;

    // If largest is not root
    if (largest != i) {
        // Swap the root with the largest child
        let temp = bars[i].style.height;
        bars[i].style.height = bars[largest].style.height;
        bars[largest].style.height = temp;

        // Visualize the swapping
        container.innerHTML = ""; // Clear previous bars
        bars.forEach(bar => {
            container.appendChild(bar);
        });
        bars[i].style.backgroundColor = selectedColor; // Highlight the swapped root
        let sound = mapRange(parseFloat(bars[i].style.height), 2, 100, 500, 1000);
        beep(100, sound, delay); // Play sound effect
        if (nextIdR) {
            document.getElementById(nextIdR).style.backgroundColor = changeColor; // Highlight the swapped child
        }
        if (nextIdL) {
            document.getElementById(nextIdL).style.backgroundColor = changeColor; // Highlight the swapped child
        }
        await sleep(delay / 3.0); // Delay for visualization
        container.innerHTML = ""; // Clear previous bars
        bars.forEach(bar => {
            container.appendChild(bar);
        });

        // Recursively heapify the affected subtree
        await heapify(n, largest, delay);
    }

    // Reset background colors
    container.innerHTML = ""; // Clear previous bars
    bars.forEach(bar => {
        container.appendChild(bar);
    });
}

// heapSort(): Implements the heap sort algorithm to sort the array of bars.
// It first builds a max heap from the array, then repeatedly extracts the maximum element from the heap.
// Time complexity: O(n log n), where n is the number of elements in the array.
async function heapSort() {
    let delay = disableInputs();
    let n = bars.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i, delay);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        let temp = bars[0].style.height;
        bars[0].style.height = bars[i].style.height;
        bars[i].style.height = temp;

        // Visualize the swapping
        container.innerHTML = ""; // Clear previous bars
        bars.forEach(bar => {
            container.appendChild(bar);
        });

        // Heapify the reduced heap
        await heapify(i, 0, delay);
    }

    // Indicate that sorting is finished
    finishedSorting();
}
