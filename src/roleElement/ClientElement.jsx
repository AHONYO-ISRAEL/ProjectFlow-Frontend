import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'

const ClientElement= ({children})=>{
    const authData =  useSelector(state=>state.auth)
    const CURRENT_USER_ROLE =  authData.role
if (CURRENT_USER_ROLE === 'client') {
    return(
    <>
    {children}
    </>
)}
}

ClientElement.propTypes ={
    children : PropTypes.node
}


export default  ClientElement