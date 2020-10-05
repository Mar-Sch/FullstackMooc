import React from 'react';

const Courses = ({ courses }) => {
    return (
        <div>
            {courses.map((x, id) =>
                <Course key={id} course={x} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    const parts = course.parts.concat()
    return (
        <div>
            {parts.map((x, id) =>
                < Part key={id} part={x} />
            )}
        </div>
    )
}

const Total = ({ course }) => {
    const parts = course.parts.concat()
    const totalNumberOfExercises = parts.reduce((sum, x) => sum + x.exercises, 0)
    return (
        <p><b>Number of exercises {totalNumberOfExercises}</b></p>
    )
}

export default Courses