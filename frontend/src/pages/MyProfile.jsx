import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Myprofile = () => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic || "https://via.placeholder.com/150", // Placeholder image if no profile photo
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
    age: calculateAge("2000-01-20"),
  });

  const [isEdit, setIsEdit] = useState(false);
  const [imageKey, setImageKey] = useState(0); // To force image reload

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      
      // Revoke any previous object URL to avoid memory leaks
      if (userData.image && userData.image.startsWith("blob:")) {
        URL.revokeObjectURL(userData.image);
      }
      
      setUserData((prev) => ({ ...prev, image: imageUrl }));
      setImageKey((prevKey) => prevKey + 1); // Increment to force reload
    }
  };

  const handleDobChange = (e) => {
    const newDob = e.target.value;
    setUserData((prev) => ({
      ...prev,
      dob: newDob,
      age: calculateAge(newDob),
    }));
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <div className="relative w-36 h-36">
        <img
          key={imageKey} // Forces re-render when key changes
          className="w-full h-full rounded object-cover"
          src={userData.image}
          alt="Profile"
        />
        {isEdit && (
          <label className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            Change
          </label>
        )}
      </div>
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div className="grid grid-col-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div>
          <p className="font-medium">Email id:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.email}</p>
          )}
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br />
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              onChange={handleDobChange}
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
          <p className="font-medium">Age:</p>
          <p className="text-gray-400">{userData.age}</p>
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(false)}
          >
            Save information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
