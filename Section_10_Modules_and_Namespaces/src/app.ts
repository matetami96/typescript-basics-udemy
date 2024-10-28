/* // referencing code from different files under the same namespace
/// <reference path='components/project-input.ts'/>
/// <reference path='components/project-list.ts'/>

namespace App {
	new ProjectInput();
	new ProjectList("active");
	new ProjectList("finished");
} */

import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
