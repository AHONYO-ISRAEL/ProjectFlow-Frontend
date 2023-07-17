import PropTypes from 'prop-types';

const PublicElement= ({children})=>{

return(

    <>
    {children}
    </>
)
}

PublicElement.propTypes ={
    children : PropTypes.node
}


export default  PublicElement