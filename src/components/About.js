import React, {useContext} from 'react'
import notecontext from '../context/notes/noteContext'
const About = () => {
    const a = useContext(notecontext)
    return (
        <div>
            This is About {a.name} and he is in class {a.class}
        </div>
    )
}

export default About;