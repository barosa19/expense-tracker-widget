import React from 'react'

export const GlobalContext = React.createContext()

const GlobalProvider = (props) => {
    const [darkMode, setDarkMode] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    return (
         <GlobalContext.Provider 
            value={{
                darkMode,
                setDarkMode,
                showModal,
                setShowModal
             }}>
               {props.children}
         </GlobalContext.Provider>
    )
}
export default GlobalProvider