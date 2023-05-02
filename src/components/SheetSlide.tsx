import React, { useState, useRef, useEffect } from 'react'
// import { styled } from '@mui/system';
import { useSwipeable } from 'react-swipeable';

// const DrawerStyle = styled('div')(({theme}) => ({
// 	'&::after': {
// 		content: '""',
// 		backgroundColor: theme.palette.background.default,
// 		position: 'absolute',
// 		width: '100%',
// 		height: '1000px',
// 	},
// }));
// const Shadow = styled('div')(({theme}) => ({
// 	position: 'fixed',
// 	top: '0',
// 	left: '0',
// 	width: '100vw',
// 	height: '100vh',
// 	backgroundColor: 'rgba(123, 123, 123, 0.15)',
// 	zIndex: 0
// }));

type Props = {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (value: boolean) => void;
	onClose?: Function;
	minSize?: string;
	fit?: boolean;
	color?: string;
	size?: string;
};

let lastPos = 0;
let move = false;
function SheetSlide(props: Props) {
	const [open, setOpen] = useState(false);
	const [translateY, setTranslateY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	function onClose() {
		lastPos = 0;
		setTranslateY(0);
		setOpen(false);
		props.onOpenChange(false);
		if (props.onClose)
			props.onClose();
	}

	function calcDist() {
		let dist = '100vh';
		if (open)
			dist = `calc(100vh - ${props.size ? props.size : '85vh'} + ${translateY}px)`;
		else if (props.minSize)
			dist = `calc(100vh - ${props.minSize} + ${translateY}px)`
		return dist;
	}

  const handlers = useSwipeable({
    onSwiping: (event) => {
			move = true;
      if (event.dir === 'Down' || event.dir === 'Up')
				setTranslateY(event.deltaY + lastPos);
    },
    onSwipedDown: () => {
			if (!open)
				setTranslateY(0);
			else {
				lastPos = translateY;
			}
      if (translateY > 50)
				onClose();
    },
    onSwipedUp: () => {
			let hideContent = 0;
			if (sheetRef.current)
				hideContent = sheetRef.current.clientHeight - window.innerHeight + window.innerHeight * 0.15;
			if (!open)
				setTranslateY(0);
			else if (hideContent > 0 && translateY < -hideContent) {
				setTranslateY(-hideContent);
				lastPos = -hideContent;
			}
			else if (hideContent > 0) {
				lastPos = translateY;
			}
			else {
				setTranslateY(0);
				lastPos = 0;
			}
      if (translateY < -50 && !open) {
				setOpen(true);
				props.onOpenChange(true);
			}
    },
		onSwiped: () => {
			move = false;
		},
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
    delta: 10,
  });

  return (
		<>
		<div onClick={onClose} style={{display: open ? 'block' : 'none'}}/>
    <div
			style={{
				position: 'fixed',
				top: calcDist(),
				transition: move ? '' : 'top 0.3s ease'
			}}
      {...handlers}
    >
			<div
				ref={sheetRef}
				style={props.fit ? {} : {width: '100vw'}}
			>
				{props.children}
			</div>
    </div>
		</>
  );
};

export default SheetSlide;
