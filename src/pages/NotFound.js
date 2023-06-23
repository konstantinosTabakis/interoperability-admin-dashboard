import { NavLink } from "react-router-dom"
function NotFound() {
    return (
        <div className='notFound'>
            <div className='notFound__inner card'>
                <h4 className='heading-primary mg-b-tuny centered'>404</h4>
                <p className='centered mg-b-medium'>Sorry, page not found</p>
                <div className='centered'>
                    <NavLink to='/'>
                        <button className='btn btn-primary'>Home</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default NotFound