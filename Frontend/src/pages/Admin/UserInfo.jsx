import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { TbLoader3 } from "react-icons/tb";

const UserInfo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    role: "",
    profilePicture: "",
  });
  const [file, setFile] = useState(null);
  // const {user} = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.id;

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePicture: URL.createObjectURL(selectedFile),
    }); // Preview Only
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(updateUser);
    console.log("PHONE:", updateUser.phone);
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    try {
      // use FormData for text and File
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("state", updateUser.state);
      formData.append("pincode", updateUser.pincode);
      formData.append("phone", updateUser.phone);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file); // image file for backend multer
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to Update Profile");
    } finally {
      setLoading(false);
    }
  };

  const getuserDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/get-user/${userId}`,
      );
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getuserDetails();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-6 md:p-8">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col items-center justify-center gap-4">

      {/* Header */}
      <div className="flex justify-between items-center gap-4 sm:gap-10 w-full max-w-3xl">
        <button
          className="bg-slate-800 border-2 border-cyan-400 text-cyan-300 p-2 hover:bg-slate-700 rounded-xl flex-shrink-0"
          onClick={() => navigate(-1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">Update Profile</h1>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 justify-evenly items-center lg:items-start">

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-2 lg:mb-0">
          <img
            src={updateUser?.profilePicture || "/user.jpg"}
            alt="profile"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-cyan-400"
          />
          <Label className="mt-4 inline-flex items-center justify-center whitespace-nowrap bg-slate-800 border-2 border-cyan-400 text-cyan-300 px-5 py-2 rounded-xl hover:bg-slate-700 transition-all cursor-pointer text-sm sm:text-base">
            Update Picture
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </Label>
        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="w-full max-w-3xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-4 mb-10 sm:mb-20"
        >
          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-slate-300">First Name</Label>
              <input
                type="text"
                name="firstName"
                value={updateUser?.firstName}
                onChange={handleChange}
                placeholder="Enter Your First Name"
                className="w-full h-11 bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl px-3 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-slate-300">Last Name</Label>
              <input
                type="text"
                name="lastName"
                value={updateUser?.lastName}
                onChange={handleChange}
                placeholder="Enter Your Last Name"
                className="w-full h-11 bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl px-3 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label className="block text-sm font-medium text-slate-300">Email</Label>
            <input
              type="email"
              name="email"
              value={updateUser?.email}
              onChange={handleChange}
              disabled
              className="w-full h-11 bg-slate-800 border-2 border-cyan-400 text-slate-400 rounded-xl px-3 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <Label className="block text-sm font-medium text-slate-300">Phone No</Label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              minLength={10}
              maxLength={10}
              value={updateUser?.phone}
              onChange={handleChange}
              placeholder="Enter 10 digit no."
              name="phone"
              className="w-full h-11 bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl px-3 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <Label className="block text-sm font-medium text-slate-300">Address</Label>
            <input
              type="text"
              placeholder="Enter Your Full Address"
              name="address"
              value={updateUser?.address}
              onChange={handleChange}
              className="w-full h-11 bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl px-3 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* City */}
          <div>
            <Label className="block text-sm font-medium text-slate-300">City</Label>
            <input
              type="text"
              placeholder="Enter City"
              value={updateUser?.city}
              onChange={handleChange}
              name="city"
              className="w-full h-11 bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl px-3 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* State */}
          <div>
            <Label className="block text-sm font-medium text-slate-300">State</Label>
            <Select
              name="state"
              value={updateUser?.state}
              onValueChange={(value) => setUpdateUser((prev) => ({ ...prev, state: value }))}
            >
              <SelectTrigger className="w-full h-11 bg-slate-900 border-2 border-cyan-400 text-white rounded-xl">
                <SelectValue placeholder="Select State / UT" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-2 border-cyan-400 text-white rounded-xl max-h-60 overflow-y-auto">
                <SelectGroup>
                  <SelectLabel className="text-cyan-300 font-semibold">States</SelectLabel>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                  <SelectItem value="Assam">Assam</SelectItem>
                  <SelectItem value="Bihar">Bihar</SelectItem>
                  <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                  <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Manipur">Manipur</SelectItem>
                  <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                  <SelectItem value="Mizoram">Mizoram</SelectItem>
                  <SelectItem value="Nagaland">Nagaland</SelectItem>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Sikkim">Sikkim</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                  <SelectItem value="Tripura">Tripura</SelectItem>
                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-cyan-300 font-semibold">Union Territories</SelectLabel>
                  <SelectItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</SelectItem>
                  <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                  <SelectItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Jammu and Kashmir">Jammu and Kashmir</SelectItem>
                  <SelectItem value="Ladakh">Ladakh</SelectItem>
                  <SelectItem value="Lakshadweep">Lakshadweep</SelectItem>
                  <SelectItem value="Puducherry">Puducherry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Zip Code */}
          <div>
            <Label className="block text-sm font-medium text-slate-300">Zip Code</Label>
            <input
              type="tel"
              pattern="[0-9]{6}"
              minLength={6}
              maxLength={6}
              value={updateUser?.pincode}
              onChange={handleChange}
              placeholder="Enter your Zip Code"
              name="pincode"
              className="w-full h-11 bg-slate-900 border-2 border-cyan-400 text-white placeholder:text-slate-400 rounded-xl px-3 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Role */}
          <div className="flex flex-wrap gap-3 items-center">
            <Label className="block text-sm font-medium text-slate-300">Role:</Label>
            <RadioGroup
              value={updateUser?.role}
              onValueChange={(value) => setUpdateUser({ ...updateUser, role: value })}
              className="flex gap-6 text-cyan-300"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="user"
                  id="user"
                  className="border-2 border-cyan-400 text-cyan-400 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                />
                <Label htmlFor="user">User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="admin"
                  id="admin"
                  className="border-2 border-cyan-400 text-cyan-400 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl px-6 py-2 transition-all disabled:opacity-60 w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <TbLoader3 className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>

      </div>
    </div>
  </div>
</div>
  );
};

export default UserInfo;
