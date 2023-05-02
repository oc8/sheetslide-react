import { useState } from 'react'
import SheetSlide from 'components/SheetSlide'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
			<div>
				Hello
			</div>
			<SheetSlide open={open} onOpenChange={setOpen} minSize='74px'>
				<div
					style={{
						backgroundColor: 'grey',
						height: '100vh',
						textAlign: 'center',
					}}
				>
					World
				</div>
			</SheetSlide>
    </>
  )
}

export default App
