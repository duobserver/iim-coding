// Arrays are indexed tables where you can insert any kind of value
// array.push(elements): add at the end or count elements without value
// check mdn or w3s for more

let prenoms = ["Heddi", "Alexis", "Nicolas"];
console.log(prenoms);

// adding two elements at the end of 'prenoms'
prenoms.push("Juan", "Freddy");
console.log(prenoms);

// delete one element starting from index 1 (included)
prenoms.splice(1, 1);
console.log(prenoms);

// number of elements in 'prenoms'
console.log(prenoms.push());

// adding an element at index 1
prenoms.splice(1, 0, "Bonnie");
console.log(prenoms);
