import React, { useState, useRef, useEffect } from 'react'
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

type Props = {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (value: boolean) => void;
	onClose?: Function;
	minSize?: string;
	fit?: boolean;
	color?: string;
	size?: string;
	side?: string;
	threshold?: number;
	shadow?: boolean;
	rounded?: boolean;
	backgroundShadow?: boolean;
	style?: React.CSSProperties;
};

let lastPos = 0;
let move = false;
function SheetSlide(initProps: Props) {
	const props = {
		fit: false,
		color: 'white',
		side: 'bottom',
		threshold: 50,
		minSize: '0px',
		size: '85vh',
		backgroundShadow: true,
		shadow: false,
		rounded: false,
		...initProps
	};
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
		let dist = `calc(100vh - ${props.minSize} + ${translateY}px)`;
		if (open)
			dist = `calc(100vh - ${props.size} + ${translateY}px)`;
		else if (props.minSize === '0px')
			dist = `calc(100vh - ${props.minSize} - 10px + ${translateY}px)`
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
      if (translateY > props.threshold)
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
      if (translateY < -props.threshold && !open) {
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
		{props.backgroundShadow && <div onClick={onClose} style={{
			display: open ? 'block' : 'none',
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100vw',
			height: '100vh',
			backgroundColor: 'rgba(123, 123, 123, 0.15)',
			zIndex: 0,
 		}}/>}
    <div
			className='sheet-slide'
			style={{
				position: 'fixed',
				top: props.side === 'bottom' ? calcDist() : '',
				bottom: props.side === 'top' ? calcDist() : '',
				transition: move ? '' : 'all 0.3s ease',
				paddingTop: props.side === 'bottom' && props.minSize === '0px' ? '10px' : '',
				paddingBottom: props.side === 'top' && props.minSize === '0px' ? '10px' : '',
			}}
      {...handlers}
    >
			<div
				ref={sheetRef}
				style={{
					width: props.fit ? 'auto' : '100vw',
					backgroundColor: 'transparent',
					borderRadius: props.rounded ? props.side === 'bottom' ? '10px 10px 0 0' : '0 0 10px 10px' : '',
					boxShadow: props.shadow ? props.side === 'bottom' ? '0 -5px 10px rgba(0, 0, 0, 0.15)' : '0 5px 10px rgba(0, 0, 0, 0.15)' : '',
					...props.style
				}}
			>
				{props.children}
			</div>
    </div>
		<style>
			{`.sheet-slide::after {
				content: "";
				background-color: ${props.color};
				position: absolute;
				width: 100%;
				height: 1000px;
			}`}
		</style>
		</>
  );
};

export default SheetSlide;
