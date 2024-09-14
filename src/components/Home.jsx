import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [imageSrc, setImageSrc] = useState(null); 

  const arrayBufferToBase64 =  (buffer) => {
    let binary = '';
    const bytes =  new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  useEffect( () => {
    if (user && user.photo && user.photo.data) {
      // Convert buffer to base64 string
      const base64Image = arrayBufferToBase64(user.photo.data);

      // Create image src with appropriate content type (assuming JPEG for example)
      const imageSrc =  `data:image/jpeg;base64,${base64Image}`;

      // Set the image source in state
      setImageSrc(imageSrc);
    }
  }, [user]);

  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      <p>Email: {user?.email}</p>
      <p>phoneno: {user?.phoneno}</p>
      <p>age: {user?.age}</p>
      <img src={imageSrc} alt="User profile" style={{ width: '200px', height: '200px' }}/>
      <p>User ID: {user?._id}</p>
    </div>
  );
};

export default Home;
