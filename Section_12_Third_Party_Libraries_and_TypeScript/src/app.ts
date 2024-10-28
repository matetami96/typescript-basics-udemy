// import _ from "lodash";
// console.log(_.shuffle([1, 2, 3]));
import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { Product } from "./product.model";

const products = [
	{ title: "A Game", price: 40.99 },
	{ title: "A PC", price: 160.99 },
];

const newProduct = new Product("", -5.99);
validate(newProduct).then((errors) => {
	if (errors.length > 0) {
		console.log("VALIDATION ERRORS", errors);
	} else {
		console.log(newProduct.getInformation());
	}
});

// const p1 = new Product("A Game", 4.99);

/* const loadedProducts = products.map((product) => {
	return new Product(product.title, product.price);
}); */

const loadedProducts = plainToInstance(Product, products);

for (const product of loadedProducts) {
	console.log(product.getInformation());
}
