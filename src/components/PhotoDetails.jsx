// src/components/PhotoDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PhotoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      const docRef = doc(db, "photos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPhoto(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (!photo) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <img
        src={photo.photoURL}
        alt={photo.title}
        className="w-full h-auto rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
      <p className="text-sm mb-4">{photo.description}</p>
      <button
        onClick={() => navigate('/gallery')}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Back to Gallery
      </button>
    </div>
  );
};

export default PhotoDetails;
