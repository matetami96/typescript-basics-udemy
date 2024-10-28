//  type aliases
type Combineable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

// 'union' types type1 | type2 | ...
function combine(
	input1: Combineable, // type alias 'Combineable'
	input2: Combineable, // type alias 'Combineable'
	// 'union' type combined with 'literal' types (as you tell the exact value and type)
	resultConversion: ConversionDescriptor // type alias 'ConversionDescriptor'
) {
	// type alias 'Combineable'
	let result: Combineable;
	if (
		(typeof input1 === "number" && typeof input2 === "number") ||
		resultConversion === "as-number"
	) {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}
	return result;
	/* if (resultConversion === "as-number") {
		return +result;
	} else {
		return result.toString();
	} */
}

const combinedAges = combine(30, 26, "as-number");
console.log(`combinedAges: ${combinedAges}`);

const combinedStringAges = combine("30", "26", "as-number");
console.log(`combinedStringAges: ${combinedStringAges}`);

const combinedNames = combine("Tomi ", "Emochi", "as-text");
console.log(`combinedNames: ${combinedNames}`);
