// import React from 'react'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const LatestJobCards = ({job}) => {
//     const navigate = useNavigate();
//     return (
//         <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer'>
//             <div>
//                 <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
//                 <p className='text-sm text-gray-500'>India</p>
//             </div>
//             <div>
//                 <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
//                 <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
//                 <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
//             </div>

//         </div>
//     )
// }

// export default LatestJobCards

import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="flex flex-col gap-2 p-5 px-4 transition-all duration-200 bg-white border border-gray-200 shadow-md cursor-pointer rounded-xl hover:shadow-lg sm:px-6 lg:px-10"
    >
      {/* Company Info */}
      <div >
        <h1 className="text-lg font-bold">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="text-lg font-bold">{job?.title}</h1>

        {/* Mobile-friendly truncate */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Badge variant="ghost" className="font-semibold text-blue-700">
          {job?.position} Positions
        </Badge>

        <Badge variant="ghost" className="text-[#F83002] font-semibold">
          {job?.jobType}
        </Badge>

        <Badge variant="ghost" className="text-[#7209b7] font-semibold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
