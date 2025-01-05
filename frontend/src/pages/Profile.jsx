import {useEffect,useState}  from 'react'
import axios from 'axios';

const ProfilePage = ({userId}) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [userId]);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            {user.profile_picture ? (
                <img src={`http://localhost:8081${user.profile_picture}`} alt="Profile" />
            ) : (
                <p>No profile picture set</p>
            )}
        </div>
    );
};

export default ProfilePage