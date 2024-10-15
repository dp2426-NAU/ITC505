// Display Last Modified Date in Footer
document.getElementById('lastModified').textContent = document.lastModified;

// Fixed array of integers
let array = [170, 45, 75, 90, 802, 24, 2, 66];

// Function to get the digit at a specific place value
function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// Function to determine the number of digits in a number
function digitCount(num) {
    return num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1;
}

// Function to get the maximum number of digits in the array
function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}

// Radix Sort function
async function radixSort(arr) {
    let maxDigitCount = mostDigits(arr);
    for (let k = 0; k < maxDigitCount; k++) {
        // Create buckets for each digit (0-9)
        let digitBuckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < arr.length; i++) {
            let digit = getDigit(arr[i], k);
            digitBuckets[digit].push(arr[i]);
        }
        // Reassemble the array from the buckets
        arr = [].concat(...digitBuckets);
        // Update the array display after each iteration
        document.getElementById('result').textContent = "Sorting Step " + (k + 1) + ": [" + arr.join(", ") + "]";
        // Add delay to visualize the sorting step by step
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return arr;
}

// Event listener for button click to sort array using Radix Sort
document.getElementById('sortButton').addEventListener('click', async () => {
    const sortedArray = await radixSort(array.slice());  // Sort a copy of the array
    document.getElementById('result').textContent = "Sorted Array: [" + sortedArray.join(", ") + "]";
});
