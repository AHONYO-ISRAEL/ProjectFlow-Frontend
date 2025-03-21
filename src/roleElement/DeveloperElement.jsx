import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'

const DeveloperElement= ({children})=>{
    const authData =  useSelector(state=>state.auth)
    const CURRENT_USER_ROLE =  authData.role
    if(CURRENT_USER_ROLE === 'developer'){
    return(
    <>
    {children}
    </>
)}
}

DeveloperElement.propTypes ={
    children : PropTypes.node
}


export default  DeveloperElement