import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'

const AdminElement = ({children})=>{
    const authData =  useSelector(state=>state.auth)
    const CURRENT_USER_ROLE =  authData.role
if (CURRENT_USER_ROLE === 'admin'){
    return(
        <>
        {children}
        </>
    )
}else{
    return  <h1>404</h1>
}

}

AdminElement.propTypes ={
    children : PropTypes.node
}


export default  AdminElement