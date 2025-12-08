// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { RadioGroup } from '../ui/radio-group'
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Signup = () => {

//     const [input, setInput] = useState({
//         fullname: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         role: "",
//         file: ""
//     });
//     const {loading,user} = useSelector(store=>store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }
//     const changeFileHandler = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] });
//     }
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();    //formdata object
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("password", input.password);
//         formData.append("role", input.role);
//         if (input.file) {
//             formData.append("file", input.file);
//         }

//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: { 'Content-Type': "multipart/form-data" },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//             dispatch(setLoading(false));
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     },[])
//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center mx-auto max-w-7xl'>
//                 <form onSubmit={submitHandler} className='w-1/2 p-4 my-10 border border-gray-200 rounded-md'>
//                     <h1 className='mb-5 text-xl font-bold'>Sign Up</h1>
//                     <div className='my-2'>
//                         <Label>Full Name</Label>
//                         <Input
//                             type="text"
//                             value={input.fullname}
//                             name="fullname"
//                             onChange={changeEventHandler}
//                             placeholder="Name"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Email</Label>
//                         <Input
//                             type="email"
//                             value={input.email}
//                             name="email"
//                             onChange={changeEventHandler}
//                             placeholder="Email"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Phone Number</Label>
//                         <Input
//                             type="text"
//                             value={input.phoneNumber}
//                             name="phoneNumber"
//                             onChange={changeEventHandler}
//                             placeholder="91+"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Password</Label>
//                         <Input
//                             type="password"
//                             value={input.password}
//                             name="password"
//                             onChange={changeEventHandler}
//                             placeholder="Password"
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex items-center gap-4 my-5">
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="student"
//                                     checked={input.role === 'student'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r1">Student</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="recruiter"
//                                     checked={input.role === 'recruiter'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r2">Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                         <div className='flex items-center gap-2'>
//                             <Label>Profile</Label>
//                             <Input
//                                 accept="image/*"
//                                 type="file"
//                                 onChange={changeFileHandler}
//                                 className="cursor-pointer"
//                             />
//                         </div>
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
//                     }
//                     <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup

import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, [])

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center px-4 mx-auto max-w-7xl">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-md p-6 my-10 bg-white border border-gray-200 rounded-md shadow-sm sm:max-w-lg md:w-3/4 lg:w-1/2"
                >
                    <h1 className="mb-5 text-2xl font-bold text-center">Sign Up</h1>

                    {/* Full Name */}
                    <div className="my-3">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Name"
                        />
                    </div>

                    {/* Email */}
                    <div className="my-3">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Email"
                        />
                    </div>

                    {/* Phone */}
                    <div className="my-3">
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="91+"
                        />
                    </div>

                    {/* Password */}
                    <div className="my-3">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                        />
                    </div>

                    {/* Role + File Upload */}
                    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:justify-between sm:items-center">

                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Student</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex flex-col gap-1">
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button className="w-full my-5">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-5">Signup</Button>
                    )}

                    <p className="text-sm text-center">
                        Already have an account? 
                        <Link to="/login" className="text-blue-600"> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
