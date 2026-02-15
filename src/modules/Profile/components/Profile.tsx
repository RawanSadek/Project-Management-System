import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import noPP from "../../../assets/Images/noPP.png";

const Profile = () => {
  const { loginData } = useContext(AuthContext);
  console.log(loginData);
  if (!loginData) {
    return (
      <div className="flex flex-col items-center justify-center !min-h-[300px]">
        <h2 className="text-xl font-bold text-gray-700">No user data found</h2>
      </div>
    );
  }
  return (
    <div className="!max-w-2xl !mx-auto bg-white rounded-2xl shadow-lg !p-8 !mt-10">
      <div className="flex flex-col items-center gap-4">
        <img
          src={loginData.profilePicture ? loginData.profilePicture : noPP}
          alt="Profile"
          className="!w-32 !h-32 rounded-full object-cover border-4 border-[#EF9B28]"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          {loginData.userName}
        </h2>

        <div className="rounded-2xl bg-[#009247] !w-fit !py-1 !px-4 text-white font-light">
          {loginData.userGroup}
        </div>
      </div>
      <div className="!mt-8 space-y-4 text-gray-700">
        <div>
          <span className="font-semibold">Email:</span> {loginData.userEmail}
        </div>
        <div>
          <span className="font-semibold">User Group:</span>{" "}
          {loginData.userGroup}
        </div>
        <div>
          <span className="font-semibold">User ID:</span> {loginData.userId}
        </div>
      </div>
    </div>
  );
};

export default Profile;
