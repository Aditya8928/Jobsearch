// import React from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "../ui/button";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { LogOut, User2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };
//   return (
//     <div className="bg-white">
//       <div className="flex items-center justify-between h-16 mx-auto max-w-7xl">
//         <div>
//           <h1 className="font-bold text-md lg:text-2xl">
//             Job<span className="text-[#F83002]">Portal</span>
//           </h1>
//         </div>
//         <div className="flex items-center gap-12">
//           <ul className="flex items-center gap-5 font-medium">
//             {user && user.role === "recruiter" ? (
//               <>
//                 <li>
//                   <Link to="/admin/companies">Companies</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/jobs">Jobs</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/jobs">Jobs</Link>
//                 </li>
//                 <li>
//                   <Link to="/browse">Browse</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {!user ? (
//             <div className="flex items-center gap-2">
//               <Link to="/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={user?.profile?.profilePhoto}
//                     alt="@shadcn"
//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className="">
//                   <div className="flex gap-2 space-y-2">
//                     <Avatar className="cursor-pointer">
//                       <AvatarImage
//                         src={user?.profile?.profilePhoto}
//                         alt="@shadcn"
//                       />
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">{user?.fullname}</h4>
//                       <p className="text-sm text-muted-foreground">
//                         {user?.profile?.bio}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col my-2 text-gray-600">
//                     {user && user.role === "student" && (
//                       <div className="flex items-center gap-2 cursor-pointer w-fit">
//                         <User2 />
//                         <Button variant="link">
//                           {" "}
//                           <Link to="/profile">View Profile</Link>
//                         </Button>
//                       </div>
//                     )}

//                     <div className="flex items-center gap-2 cursor-pointer w-fit">
//                       <LogOut />
//                       <Button onClick={logoutHandler} variant="link">
//                         Logout
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Mobile Hamburger

  // Logout Handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl lg:h-16">

        {/* Logo */}
        <h1 className="text-2xl font-bold ">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-10 md:flex">

          {/* Desktop Links */}
          <ul className="flex items-center gap-6 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Desktop Login/Signup OR Avatar */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 mb-3">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-gray-700">
                    {user.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer w-fit">
                        <User2 />
                        <Link to="/profile">
                          <Button variant="link">View Profile</Button>
                        </Link>
                      </div>
                    )}

                    <div className="flex items-center gap-2 cursor-pointer w-fit">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="p-4 space-y-4 bg-white shadow-md md:hidden">

          {/* Links */}
          <ul className="flex flex-col gap-4 text-[17px] font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Login / Signup OR Avatar Options */}
          {!user ? (
            <div className="flex flex-col gap-3">
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] w-full hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">

              {user.role === "student" && (
                <Link to="/profile">
                  <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
              )}

              <Button onClick={logoutHandler} variant="outline" className="w-full">
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
