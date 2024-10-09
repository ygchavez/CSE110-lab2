import React, { useState, useEffect, useContext } from 'react';import { ThemeContext, themes } from "./themeContext";
export function ClickCounter() {


    
    // // 
    // let count = 0;
    const [count, setCount] = useState(0);
  
    const handleClick = () => {
    //   count += 1;
      setCount(count + 1);
      console.log('Count:', count);
    };

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        //console.log(`Document title updated to: You clicked ${count} times`);
      }, [count]);
     
     const theme = useContext(ThemeContext);
    return (
<div
     style={{
       background: theme.background,
       color: theme.foreground,
       padding: "20px",
     }}
   >
     <p>You clicked {count} times </p>
     <button
       onClick={() => setCount(count + 1)}
       style={{ background: theme.foreground, color: theme.background }}
     >
       Click me
     </button>
   </div>

    );

  }
 
  function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        <ClickCounter />
      </ThemeContext.Provider>
    );
   }
   
   export default ToggleTheme;
   