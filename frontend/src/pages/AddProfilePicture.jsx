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
        
        console.log('file:', file);
        console.log('user.id:', user.id);
        console.log('formData:', formData);

        try {
            await axios.post('http://localhost:8081/api/update-profile-picture', formData, {
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}` // Adaugă header-ul de autorizare
                }
            });
            alert('Profile picture updated successfully!');
            console.log('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert(`Error uploading profile picture: ${error.response?.status} ${error.response?.statusText}`);
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