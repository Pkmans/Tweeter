// import {createContext, useState} from 'react';

// const ThemeContext = createContext('dark');

// function ThemeProvider(props) {
//     const [theme, setTheme] = useState('dark');

//     function toggleTheme() {
//         setTheme(prevValue => prevValue === 'light' ? 'dark' : 'light');
//     }

//     return (

//         <ThemeContext.Provider 
//             value={{theme, toggleTheme}} 
//             {...props}
//         />
//     )
// }

// export {ThemeContext, ThemeProvider}