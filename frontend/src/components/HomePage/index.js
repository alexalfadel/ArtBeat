import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/"
import './HomePage.css'

function HomePage() {
    const history = useHistory()
    const user = useSelector((state) => state.session.user)


    if (user) history.push('/shows')

    return (
        <div className='home-page-component'>
            <h1>Welcome to <span id='home-page-artbeat'>ARTBEAT</span></h1>
            <p>Sign up to check out local shows near you.</p>
        </div>
    )
}

export default HomePage