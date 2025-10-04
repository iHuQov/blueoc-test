function harvestSeason(arr) {
    let maxSum = -Infinity;
    let bestLenght = 0;
    let currentSum = 0;
    let currentLength = 0;

    for (let v of arr) {
        if (currentSum + v > v) {
            currentSum += v;
            currentLength++
        } else {
            currentSum = v
            currentLength = 1;
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            bestLenght = currentLength;
        }
    }
    return bestLenght;
}

console.log(harvestSeason([-2, 1, -3, 4, -1])); 
console.log(harvestSeason([-1, 2, 3, -2, 5, -3])); 
console.log(harvestSeason([-5, -2, -3])); 