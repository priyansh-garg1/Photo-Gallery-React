// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const querySnapshot = await getDocs(collection(db, "photos"));
      const photosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPhotos(photosData);
      console.log(photosData);
      
    };

    fetchPhotos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {photos.map((photo) => (
        <div key={photo.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Link to={`/photo/${photo.id}`}>
            <img
              src={photo.photoURL}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />
          </Link>
          <div className="p-4">
            <h3 className="text-lg font-bold">{photo.title}</h3>
            <p className="text-sm">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
