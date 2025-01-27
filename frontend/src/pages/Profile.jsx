import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useUser(); 
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

    console.log(userData.profile_picture);
    console.log(`http://localhost:8081${userData.profile_picture}`);

    return (
        <div className="profile-page" style={styles.container}>
            <h1>Welcome, {userData.name}!</h1>
            <div style={styles.profileSection}>
                {userData.profile_picture ? (
                    <img
                        src={`http://localhost:8081${userData.profile_picture}`}
                        alt="Profile"
                        style={styles.profilePicture}
                    />
                ) : (
                    <p>No profile picture set</p>
                )}
                <button style={styles.updateButton}>
                    <Link to={`/picture`} style={styles.link}>
                        Update Picture
                    </Link>
                </button>
            </div>
            <div style={styles.buttonsContainer}>
                <button style={styles.button}>
                    <Link to={`/toread`} style={styles.link}>
                        To-read books
                    </Link>
                </button>
                <button style={styles.button}>
                    <Link to={`/read`} style={styles.link}>
                        Read books
                    </Link>
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
    },
    profileSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profilePicture: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '20px',
    },
    updateButton: {
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    button: {
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
};

export default ProfilePage;
