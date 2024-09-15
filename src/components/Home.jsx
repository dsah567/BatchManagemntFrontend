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
    <div className="container mx-auto p-4">
  <div className="flex flex-col-reverse md:flex-row items-center md:items-start">
    {/* Text Section */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8 w-full md:w-1/2">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">
        Welcome, {user?.fullName}!
      </h1>
      <p className="text-lg md:text-xl mb-2">Email: {user?.email}</p>
      <p className="text-lg md:text-xl mb-2">Phone No: {user?.phoneno}</p>
      <p className="text-lg md:text-xl mb-2">Age: {user?.age}</p>
      <p className="text-lg md:text-xl">Gender: {user?.gender}</p>
    </div>

    {/* Image Section */}
    {imageSrc && (
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <img
          src={imageSrc}
          alt="User profile"
          className="w-full h-48 rounded-lg object-cover"
        />
      </div>
    )}
  </div>
</div>

  );
};

export default Home;
