import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useUser(); // Obține întregul obiect user din context
    const [userData, setUser] = useState(null);

    console.log('Your id is ' + user.id);

    useEffect(() => {
        if (!user.id) return;

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/member/${user.id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [user]);

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <h1>Welcome, {user.name}!</h1>
            {user.profile_picture ? (
                <img
                    src={`http://localhost:8081${user.profile_picture}`}
                    alt="Profile"
                    className="profile-picture"
                />
            ) : (
                <p>No profile picture set</p>
            )}
             <button>
                    <Link to={`/picture`}>Update Picture</Link>
                </button>
            <div className="buttons-container">
                <button>
                    <Link to={`/toread`}>To-read books</Link>
                </button>
                <button>
                    <Link to={`/read`}>Read books</Link>
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
