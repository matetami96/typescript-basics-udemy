// namspaces do not exist in Vanilla JS
/* namespace App {
	export interface Draggable {
		dragStartHandler(event: DragEvent): void;
		dragEndHandler(event: DragEvent): void;
	}

	export interface DragTarget {
		// the thing you are dragging over is a valid target
		// we need to tell this to JS and the Browser
		// basically check if the item is draggable
		dragOverHandler(event: DragEvent): void;
		// if dragOverHandler permits it then
		// dropHandler will handle the actual drop
		// update data and UI here
		dropHandler(event: DragEvent): void;
		// giving visual feedback to the user
		// when they drag something over the box
		// example => change background color
		// or if the drag event is cancelled we
		// use the dragLeaveHandler to revert the visual update
		dragLeaveHandler(event: DragEvent): void;
	}
} */

export interface Draggable {
	dragStartHandler(event: DragEvent): void;
	dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
	// the thing you are dragging over is a valid target
	// we need to tell this to JS and the Browser
	// basically check if the item is draggable
	dragOverHandler(event: DragEvent): void;
	// if dragOverHandler permits it then
	// dropHandler will handle the actual drop
	// update data and UI here
	dropHandler(event: DragEvent): void;
	// giving visual feedback to the user
	// when they drag something over the box
	// example => change background color
	// or if the drag event is cancelled we
	// use the dragLeaveHandler to revert the visual update
	dragLeaveHandler(event: DragEvent): void;
}
