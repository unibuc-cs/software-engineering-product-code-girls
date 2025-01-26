import { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const UpdateProfilePicture = () => {
    const { user } = useUser(); 
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('userId', user.id);

        try {
            await axios.post('http://localhost:8081/api/update-profile-picture', formData, {
                headers: {
                    'Authorization': `Bearer ${user.token}` 
                }
            });
            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert(`Error uploading profile picture: ${error.response?.status} ${error.response?.statusText}`);
        }
    };

    return (
        <div className="login-container">
            <h1>Update Profile Picture</h1>
            <form className="login-form">
                <input type="file" onChange={handleFileChange} />
                <div className="l_button" onClick={handleUpload}>
                    Upload
                </div>
            </form>
        </div>
    );
};

export default UpdateProfilePicture;
