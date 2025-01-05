import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';  



const UpdateProfilePicture = ({ user_id }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('userId', user_id);

        try {
            await axios.post('http://localhost:8081/update-profile-picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <div>
            <h1>Update Profile Picture</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UpdateProfilePicture;
