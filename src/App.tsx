import { useState } from 'react'
import SheetSlide from 'components/SheetSlide'

function App() {
  const [open, setOpen] = useState(false);
	const words = [];
	for (let i = 0; i < 100; i++) {
		words.push(<div
			style={{
				textAlign: 'center',
				paddingTop: '5px',
			}}
			key={i}
		>
			World !
		</div>)
	}

  return (
    <>
			<div style={{
				height: 'calc(100vh - 70px)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: '30px',
			}}>
				Hello
			</div>
			<SheetSlide
				open={open}
				onOpenChange={setOpen}
				color='white'
				shadow
				rounded
				minSize='70px'
			>
				{words}
			</SheetSlide>
    </>
  )
}

export default App
