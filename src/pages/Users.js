import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import deleteIcon from '../assets/img/delete.png'
import UserModal from "../components/UserModal"
import { getAllUsers } from "../db/db-services"
import { motion, AnimatePresence } from 'framer-motion'

function Users() {

    const { users, currentUserRole, dispatch } = useContext(UserContext)
    const [create, setCreate] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers()
            dispatch({ type: 'SET_USERS', users })
        };

        if (users.length === 0) fetchUsers()
    })

    const handleCreate = () => {
        dispatch({ type: 'TOGGLE_TRANSPARENT' })
        setCreate(!create)
    }


    return (
        <div className='users'>
            <h4 className="heading-primary mg-b-medium">Users</h4>
            <div className="card users__inner mg-b-small">
                <div className="users__inner-table">
                    <div className="row row-header mg-b-medium">
                        <div className="col-bg">Email</div>
                        <div className="col">Name</div>
                        <div className="col">Role</div>
                        <div className="col">Created</div>
                        {/* <div className="col-sm"></div> */}
                    </div>

                    {users.length > 0 && users.map((el) => {
                        const date = new Date(el.created_at.seconds * 1000);
                        const day = date.getDate();
                        const month = date.getMonth() + 1;
                        const year = date.getFullYear();
                        const formattedDate = `${day}/${month}/${year}`;

                        return (
                            <div className="row  mg-b-medium" key={el.email}>
                                <div className="col-bg"> {el.email} </div>
                                <div className="col">{el.name}</div>
                                <div className="col">{el.role}</div>
                                <div className="col">{formattedDate}</div>
                                {/* <div className="col-sm">
                                    <img className="delete-icon" src={deleteIcon} alt=""  />
                                </div> */}
                            </div>

                        )

                    }
                    )}

                </div>

            </div>
            <div className="addUser centered mg-t-medium">
                {currentUserRole === 'admin' && (
                    <button className="addUser__inner" onClick={handleCreate}>
                        +
                    </button>
                )}
            </div>

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} >
                    {create && (
                        <UserModal handleCreate={handleCreate} />
                    )}
                </motion.div>
            </AnimatePresence>


        </div>
    )
}

export default Users