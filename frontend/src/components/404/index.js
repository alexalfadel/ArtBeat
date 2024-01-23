import { Link } from "react-router-dom"

function DoesNotExist() {
    return (
        <div>
            <h1>Uh oh! This page doesn't exist.</h1>
            <Link to='/shows'>Let's go back home.</Link>
        </div>
    )
}

export default DoesNotExist