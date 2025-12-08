import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 



const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='mx-auto my-20 max-w-7xl'>
            <h1 className='text-3xl font-bold lg:text-4xl'><span className='text-[#6A38C2] px-2'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 gap-4 px-4 my-5 lg:grid-cols-3 md:grid-cols-2'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs