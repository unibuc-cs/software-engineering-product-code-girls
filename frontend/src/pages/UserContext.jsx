import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);  
};

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState({
//         id: null,
//         name: '',
//         email: '',
//         profile_picture: ''
//     });
    export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : { id: null, name: '', email: '', profile_picture: '' };
    });

    useEffect(() => {
        if (user && user.id) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user'); 
        }
    }, [user]);

    UserProvider.propTypes = {
        children: PropTypes.node.isRequired, 
      };

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
    children: PropTypes.node.isRequired, 
};
