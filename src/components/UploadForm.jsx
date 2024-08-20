import React, { useState } from "react";
import {getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage'
import app, { db } from "../../firebaseConfig";
import { addDoc, collection, setDoc } from "firebase/firestore";

const UploadForm = () => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return;
    setUploading(true);
    try {
      const storage = getStorage(app);
      const name = new Date().getTime() + photo.name
      const storageRef = ref(storage,name);
      await uploadBytes(storageRef, photo);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);
      const photoCollectionsRef = collection(db,"photo");
      const res = await addDoc(photoCollectionsRef,{
        photo: downloadUrl,
        title,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: Date.now()
      })
      console.log(res.id);
      
      setPhoto(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter description"
          required
        />
      </div>
      <button
      disabled={uploading}
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        {!uploading ? "Upload" : "Uploading..."}
      </button>
    </form>
  );
};

export default UploadForm;
