import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TbLoader3 } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/Redux/userSlice";
import MyOrder from "./MyOrder";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    city: user?.city,
    state: user?.state,
    pincode: user?.pincode,
    profilePicture: user?.profilePicture,
    role: user?.role,
  });

  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

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
        dispatch(setUser(res.data.user));
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to Update Profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">
      <Navbar />
      <div className="pt-20 pb-10 w-full">
        <Tabs defaultValue="profile" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-col lg:flex-row gap-7">
          {" "}
          <TabsList className="bg-slate-900 border border-slate-700 p-1 ">
            <TabsTrigger
              className="text-slate-300 hover:text-gray-300 cursor-pointer data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-900 rounded-lg font-medium"
              value="profile"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              className="text-slate-300 hover:text-gray-300 cursor-pointer data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-900 rounded-lg font-medium"
              value="order"
            >
              Order
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl mb-10 text-white">
                  Update Profile
                </h1>
                <div className="w-full flex flex-col lg:flex-row justify-evenly items-start md:px-6 max-w-5xl">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center w-full mb-6 lg:mb-0">
                    <img
                      src={updateUser?.profilePicture || "/user.jpg"}
                      alt="profile"
                      className="w-36 h-36 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
                    />
                    <Label
                      className="mt-4 cursor-pointer bg-slate-900 border border-slate-700 text-white px-5 py-2 rounded-xl hover:border-cyan-400 transition-all duration-300"
                    >
                      Change Picture
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </Label>
                  </div>
                  {/* Profle Form */}
                   <form
                    onSubmit={handleUpdate}
                    className="space-y-5 shadow-2xl p-6 md:p-8 mb-20 rounded-2xl bg-slate-900 border border-slate-800 w-full"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium text-slate-300">
                          First Name
                        </Label>
                        <input
                          type="text"
                          name="firstName"
                          value={updateUser.firstName}
                          onChange={handleChange}
                          placeholder="Enter Your First Name"
                          className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-slate-300">
                          Last Name
                        </Label>
                        <input
                          type="text"
                          name="lastName"
                          value={updateUser.lastName}
                          onChange={handleChange}
                          placeholder="Enter Your Last Name"
                          className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-slate-300">
                        Email
                      </Label>
                      <input
                        type="email"
                        name="email"
                        value={updateUser.email}
                        onChange={handleChange}
                        disabled
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mt-1 text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-slate-300">
                        Phone No
                      </Label>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        minLength={10}
                        maxLength={10}
                        value={updateUser.phone}
                        onChange={handleChange}
                        placeholder="Enter 10 digit no."
                        name="phone"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-slate-300">
                        Address
                      </Label>
                      <input
                        type="text"
                        placeholder="Enter Your Full Address"
                        name="address"
                        value={updateUser.address}
                        onChange={handleChange}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-slate-300">
                        City
                      </Label>
                      <input
                        type="text"
                        placeholder="Enter City"
                        value={updateUser.city}
                        onChange={handleChange}
                        name="city"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-slate-300">
                        State
                      </Label>
                      <Select
                        name="state"
                        value={updateUser.state}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        onValueChange={(value) =>
                          setUpdateUser((prev) => ({ ...prev, state: value }))
                        }
                      >
                        <SelectTrigger className="w-full bg-[#0f172a] border border-slate-700 text-white">
                          <SelectValue placeholder="Select State / UT" />
                        </SelectTrigger>

                        <SelectContent className="bg-[#0f172a] text-white border border-gray-700">
                          <SelectGroup className="focus:bg-slate-700 focus:text-cyan-300">
                            <SelectLabel>States</SelectLabel>

                            <SelectItem value="Andhra Pradesh">
                              Andhra Pradesh
                            </SelectItem>
                            <SelectItem value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </SelectItem>
                            <SelectItem value="Assam">Assam</SelectItem>
                            <SelectItem value="Bihar">Bihar</SelectItem>
                            <SelectItem value="Chhattisgarh">
                              Chhattisgarh
                            </SelectItem>
                            <SelectItem value="Goa">Goa</SelectItem>
                            <SelectItem value="Gujarat">Gujarat</SelectItem>
                            <SelectItem value="Haryana">Haryana</SelectItem>
                            <SelectItem value="Himachal Pradesh">
                              Himachal Pradesh
                            </SelectItem>
                            <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                            <SelectItem value="Kerala">Kerala</SelectItem>
                            <SelectItem value="Madhya Pradesh">
                              Madhya Pradesh
                            </SelectItem>
                            <SelectItem value="Maharashtra">
                              Maharashtra
                            </SelectItem>
                            <SelectItem value="Manipur">Manipur</SelectItem>
                            <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                            <SelectItem value="Mizoram">Mizoram</SelectItem>
                            <SelectItem value="Nagaland">Nagaland</SelectItem>
                            <SelectItem value="Odisha">Odisha</SelectItem>
                            <SelectItem value="Punjab">Punjab</SelectItem>
                            <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="Sikkim">Sikkim</SelectItem>
                            <SelectItem value="Tamil Nadu">
                              Tamil Nadu
                            </SelectItem>
                            <SelectItem value="Telangana">Telangana</SelectItem>
                            <SelectItem value="Tripura">Tripura</SelectItem>
                            <SelectItem value="Uttar Pradesh">
                              Uttar Pradesh
                            </SelectItem>
                            <SelectItem value="Uttarakhand">
                              Uttarakhand
                            </SelectItem>
                            <SelectItem value="West Bengal">
                              West Bengal
                            </SelectItem>
                          </SelectGroup>

                          <SelectGroup>
                            <SelectLabel>Union Territories</SelectLabel>

                            <SelectItem value="Andaman and Nicobar Islands">
                              Andaman and Nicobar Islands
                            </SelectItem>
                            <SelectItem value="Chandigarh">
                              Chandigarh
                            </SelectItem>
                            <SelectItem value="Dadra and Nagar Haveli and Daman and Diu">
                              Dadra and Nagar Haveli and Daman and Diu
                            </SelectItem>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Jammu and Kashmir">
                              Jammu and Kashmir
                            </SelectItem>
                            <SelectItem value="Ladakh">Ladakh</SelectItem>
                            <SelectItem value="Lakshadweep">
                              Lakshadweep
                            </SelectItem>
                            <SelectItem value="Puducherry">
                              Puducherry
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-slate-300">
                        Zip Code
                      </Label>
                      <input
                        type="tel"
                        pattern="[0-9]{6}"
                        minLength={6}
                        maxLength={6}
                        value={updateUser.pincode}
                        onChange={handleChange}
                        placeholder="Enter your Zip Code"
                        name="pincode"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 px-6 py-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <TbLoader3 className="animate-spin transition-transform duration-3000" />
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
          </TabsContent>


          
          <TabsContent value="order">
            <MyOrder />
          </TabsContent>
        </Tabs>{" "}
      </div>
    </div>
  );
};

export default Profile;
