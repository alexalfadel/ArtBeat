import { Link } from "react-router-dom"
import './404.css'

function DoesNotExist() {
    return (
        <div className="no-component-box">
            <h1>Uh oh! This page doesn't exist.</h1>
            <Link id='back-home-link' to='/shows'>Let's go back home.</Link>
        </div>
    )
}

export default DoesNotExist