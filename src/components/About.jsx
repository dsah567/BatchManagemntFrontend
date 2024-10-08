const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">About Our Batch Management</h1>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to our Batch Management System, a dedicated platform that simplifies student management for teachers.
          Our system enables teachers to sign up, log in, and efficiently manage their student records. Teachers can 
          maintain a detailed list of students, add new students, edit student details, and delete students as necessary. 
          Each student is assigned a unique UID (User Identification Number) to ensure every record remains distinct and secure.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features:</h2>
        <ul className="list-disc pl-5 mb-6 text-lg text-gray-700 leading-relaxed">
          <li><strong>Teacher Sign Up and Log In:</strong> Teachers can securely create accounts and access the system using their credentials.</li>
          <li><strong>Student Management:</strong> Add, edit, and delete student records with essential details like name, age, gender, mobile number, and subject batch.</li>
          <li><strong>Unique Student UID:</strong> Every student is assigned a unique identification number (UID) to maintain uniqueness and prevent duplicate entries.</li>
          <li><strong>Batch Assignments:</strong> Teachers can assign students to specific subject batches and update their details when needed.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission:</h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Our mission is to provide an intuitive and easy-to-use platform for teachers to manage their student data effortlessly.
          With a focus on simplicity and accuracy, we aim to streamline the student management process and help teachers keep track of their batches with minimal effort.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack:</h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Our system is built using the MERN stack (MongoDB, Express.js, React, Node.js) and utilizes Mongoose for database modeling.
          We use React for building the user interface, allowing seamless and interactive experiences. The backend, powered by Node.js
          and Express.js, ensures secure and efficient management of data. MongoDB provides a flexible, scalable database solution where all student records are stored.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security:</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Security is our top priority. All teacher and student information is stored securely, and passwords are encrypted to protect sensitive data. Our unique
          UID system prevents duplication, ensuring that each student has a distinct identity in the system.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
