import React, { useEffect, useState } from 'react'
import { java, mern, node } from '../utils/stacks'
import TopicsButton from './TopicsButton';

const Topics = ({techStack}) => {
    
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        if(techStack == "java") {
            setTopics([...java]);
        }
        else if(techStack == "mern") {
            setTopics([...mern]);
        }
        else if(techStack == "node") {
            setTopics([...node]);
        }
        else {
            setTopics([]);
        }
    },[techStack])

    return (
    <div className='w-3/4'>
        <p className='mb-4'>Choose Topics </p>

        <div>
            { topics.length>0&&topics.map((ele,index) => {
                return (<TopicsButton title={ele} />)
            })  }
        </div>
    </div>
  )
}

export default Topics