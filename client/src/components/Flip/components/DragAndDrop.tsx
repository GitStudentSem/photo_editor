import { ReactNode, useState } from "react";

interface IDragAndDrop {
	children: ReactNode;
	childrenState: any;
	func: (content) => void
}

const DragAndDrop = ({ children, childrenState, func }: IDragAndDrop) => {
	const [drag, setDrag] = useState(false);
	const [childrenContent, setChildrenContent] = useState(childrenState);

	function dragStartHandler(e) {
		e.preventDefault();
		setDrag(true);
		// console.log(drag);
	}

	function dragLeaveHandler(e) {
		e.preventDefault();
		setDrag(false);
		// console.log(drag);
	}

	function onDropHandler(e) {
		e.preventDefault();
		setDrag(false);
		// console.log(drag);
		func(e.dataTransfer.files);
	}

	return (
		<div
			onDragStart={e => dragStartHandler(e)}
			onDragLeave={e => dragLeaveHandler(e)}
			onDrop={onDropHandler}
		>
			{children}
		</div>
	);
};

export default DragAndDrop;