
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function CourseView(){
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    api.get(`/courses/${id}`)
    .then(res=> setCourse(res.data))
    .catch(err=> setError(err))
  },[id])
  if(!course) return <div>Loading...</div>
  return (
    <div className='bg-white p-6 rounded shadow'>
      <h1 className='text-2xl font-bold'>{course.title}</h1>
      <p className='mt-2'>{course.description}</p>
      <div className='mt-4'>
        <h3 className='font-semibold'>Lessons</h3>
      </div>
    </div>
  )
}
