import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import RecipeContext from "../context/RecipeContext.jsx";

const ProfilePage = () => {
  const { profile, setProfile } = useContext(AuthContext);
  const {savedRecipes} = useContext(RecipeContext);
  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    name: profile?.name ,
    email: profile?.email ,
    profileImage: profile?.profileImage ,
  });

  //console.log(userData);
  const [previewImage, setPreviewImage] = useState(userData.profileImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle profile image update
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !profile?._id) return;

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Show preview
  };

  // Save the updated profile (image first, then name & email)
  const handleSave = async () => {
    if (!profile?._id) return;

    setLoading(true);
    const userId = profile._id;
    try {
      let updatedProfileImage = userData.profileImage;

      // Step 1: Upload the image if it's changed
      if (selectedImage) {
        const formData = new FormData();
        formData.append("profileImage", selectedImage);

        const imageRes = await axios.put(
          `http://localhost:5000/api/users/${userId}/profile-image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (imageRes.data.success) {
          updatedProfileImage = imageRes.data.profileImage;
          setProfile((prev) => ({
            ...prev,
            profileImage: updatedProfileImage,
          }));
          toast.success("Profile image updated successfully!");
        } else {
          toast.error("Image upload failed: " + imageRes.data.message);
          setLoading(false);
          return;
        }
      }

      // Step 2: Update name & email after the image is successfully uploaded
      const userRes = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        {
          name: userData.name,
          email: userData.email,
        }
      );

      if (userRes.data.success) {
        setProfile(userRes.data.user);
        toast.success("Profile updated successfully!");

        // Clear input state after successful update
        setUserData({
          name: userRes.data.user.name,
          email: userRes.data.user.email,
          profileImage: userRes.data.user.profileImage,
        });
        setSelectedImage(null);
        setEditMode(false);
      } else {
        toast.error("Profile update failed: " + userRes.data.message);
      }
    } catch (error) {
      toast.error(
        "Error updating profile: " + (error.response?.data || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 py-10 bg-[#fce3fe]">
      <div className="w-[320px] bg-white flex flex-col items-center gap-4 rounded-md shadow-lg p-8">
        {/* Profile Image Upload */}
        <label htmlFor="profileImageInput" className="cursor-pointer">
          <img
            src={previewImage || profile?.profileImage || "/default-profile.png"}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-2 p-1 border-[#ff4141]"
          />
        </label>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Profile Information */}
        <div className="flex flex-col items-start w-full gap-3">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter Name"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter Email"
              />
            </>
          ) : (
            <>
              <p className="uppercase text-sm font-light text-black">
                Name : {profile?.name || "No Name"}
              </p>
              <p className="uppercase text-sm font-light text-black">
                Email : {profile?.email || "No Email"}
              </p>
            </>
          )}

          <div className="flex items-center gap-2">
            <Link
              to={`/profile/added-recipes`}
              className="uppercase text-xs font-light text-black hover:text-[#ff4141]"
            >
              {profile?.addedRecipes?.length ?? 0} recipes added
            </Link>
            <span className="w-0.5 h-6 bg-black"></span>
            <Link
              to={`/profile/saved-recipes`}
              className="uppercase text-xs font-light text-black hover:text-[#ff4141]"
            >
              {savedRecipes?.length ?? 0} recipes saved
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        {editMode ? (
          <div className="flex gap-2 w-full">
            <button
              onClick={handleSave}
              disabled={loading}
              className={`w-1/2 text-white bg-[#ff4141] px-4 py-2 text-xs rounded hover:bg-[#cc3434] transition-all duration-300 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="w-1/2 text-[#ff4141] border border-[#ff4141] px-4 py-2 text-xs rounded hover:bg-[#ff4141] hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="w-full text-[#ff4141] border border-[#ff4141] px-6 py-2 text-xs hover:bg-[#ff4141] hover:text-white transition-all duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
