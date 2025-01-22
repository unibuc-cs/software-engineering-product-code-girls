import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crearea contextului pentru utilizator
const UserContext = createContext();

// Hook personalizat pentru a obține și actualiza datele utilizatorului
export const useUser = () => {
    return useContext(UserContext);  // Acesta va returna valorile din context
};

// Componenta care va învălui întreaga aplicație cu contextul
// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState({
//         id: null,
//         name: '',
//         email: '',
//         profile_picture: ''
//     });
    export const UserProvider = ({ children }) => {
    // Inițializează utilizatorul din sessionStorage (dacă există)
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : { id: null, name: '', email: '', profile_picture: '' };
    });

    // Salvează utilizatorul în sessionStorage la fiecare actualizare
    useEffect(() => {
        if (user && user.id) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user'); // Șterge datele dacă utilizatorul nu este autentificat
        }
    }, [user]);

    UserProvider.propTypes = {
        children: PropTypes.node.isRequired, // 'children' este de tip 'node' și este necesar
      };

    // Actualizează datele utilizatorului
    const updateUser = (userData) => {
        setUser(prev => ({
            ...prev,
            ...userData
        }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );

   
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' este de tip 'node' și este necesar
};
