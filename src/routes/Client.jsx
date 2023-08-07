import ClientElement from '../roleElement/ClientElement'
import { Routes, Route } from 'react-router-dom'
import HomeBody from '../components/clientComponents/clientBodies/HomeBody'
import ProjectBody from '../components/clientComponents/clientBodies/ProjectBody'
import CollaborateBody from '../components/clientComponents/clientBodies/CollaborateBody'
import VerticalNavBar from '../components/layout/clientLayout/VerticalNavBar'

const Client = () => {
  return (
    <Routes>
      <Route path={'/client/Home'} element={
           <ClientElement>
        <VerticalNavBar body={
       
            <HomeBody />

        } />
                  </ClientElement>
      } />
      <Route      
      path={'/client/Projects'}
      element={
        <ClientElement>
          <VerticalNavBar   body={
            <ProjectBody/>
          } />
        </ClientElement>
      }
      />
      <Route      
      path={'/client/Collaborate'}
      element={
        <ClientElement>
          <VerticalNavBar   body={
            <CollaborateBody/>
          } />
        </ClientElement>
      }
      />
    </Routes>
  )
}

export default Client