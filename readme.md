# SheetSlide Swipeable

SheetSlide is a Node package for React that allows you to add a swipeable, sliding sheet to your web application. With this component, you can easily add a sheet that can be moved vertically by swiping up or down.

## Demo
<img src="preview.gif" alt="Demo" width="300" height="auto" />


## Installation
Install the package using npm:

```bash
npm install sheetslide-react
```

## Usage
Here's an example of using SheetSlide in your React application:

```tsx
import React, { useState } from 'react';
import SheetSlide from 'sheetslide-react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle SheetSlide</button>
      <SheetSlide
        open={open}
        onOpenChange={(value) => setOpen(value)}
        minSize="20vh"
        color="white"
        size="85vh"
	side="top"
      >
        <div>Your sheet content</div>
      </SheetSlide>
    </div>
  );
}

export default App;
```

## Props
SheetSlide accepts the following props:

- `children` (React.ReactNode) : The child elements to be displayed within the sheet.
- `open` (boolean) : Indicates whether the sheet is open or closed.
- `onOpenChange` (Function) : Callback called when the open state of the sheet changes.
- `onClose` (Function, optional) : Callback called when the sheet closes.
- `minSize` (string, optional) : The minimum size of the sheet when closed (e.g., '20vh').
- `fit` (boolean, optional) : If true, the sheet adjusts to the size of its content.
- `color` (string, optional) : The background color of the sheet.
- `size` (string, optional) : The size of the sheet when open (e.g., '85vh').
- `side` (string, optional) : The side of the screen where the sheet will appear. Accepts "top", or "bottom" (default is "bottom").
- `threshold` (number, optional) : The minimum swipe distance required to trigger actions (e.g., 50).
- `shadow` (boolean, optional) : If true, a shadow effect will be applied to the sheet.
- `rounded` (boolean, optional) : If true, the sheet will have rounded corners.
- `backgroundShadow` (boolean, optional) : If true, a background shadow will be displayed when the sheet is open.
- `style` (React.CSSProperties, optional) : Custom CSS styles to be applied to the sheet.

## License
This project is licensed under the MIT License.
