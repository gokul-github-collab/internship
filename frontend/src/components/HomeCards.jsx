import { Link } from 'react-router-dom'
import React from 'react'
import Card from './Card'
const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <Card>
            <h2 className="text-2xl font-bold">For UG's and PG's</h2>
            <p className="mt-2 mb-4">
            Browse our graduate programs or postgraduate degrees.
            </p>
            <Link
              to="/courses"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Programs
            </Link>
            </Card>
          <Card bg='bg-indigo-100' >
          <h2 className="text-2xl font-bold">For Admin's</h2>
            <p className="mt-2 mb-4">
            New programs for excellence
            </p>
            <Link
              to="/add-course"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Programs
            </Link>
          </Card>
        </div>
      </div>
    </section>  )
}

export default HomeCards