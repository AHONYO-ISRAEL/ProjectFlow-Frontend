import { useSelector } from 'react-redux'



const Home = ()=>{
    const userInfo = useSelector((state)=>state.auth)

return(
    <>
        <h1>Welcome {userInfo.userName}  </h1>
    </>
)
}
export default Home