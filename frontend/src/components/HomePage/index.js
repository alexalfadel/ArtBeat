import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/"

function HomePage() {
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    console.log(user)

    if (user) history.push('/shows')

    return (
        <div>
            <h1>Welcome to ARTBEAT</h1>
            <p>Sign up to check out local shows near you.</p>
        </div>
    )
}

export default HomePage