import DeveloperElement from '../roleElement/DeveloperElement'
import { Routes, Route } from 'react-router-dom'
import HomeBody from '../components/devComponents/devBodies/HomeBody'
import ProjectsBody from '../components/devComponents/devBodies/ProjectsBody'
import SelectedProject from '../components/devComponents/devBodies/SelectedProject'
import VerticalNavBar from '../components/layout/devLayout/VerticalNavBar'

const Developer = () => {
  return (
    <Routes>
      <Route path={'/developer/Home'} element={
        <DeveloperElement>
          <VerticalNavBar body={
            <HomeBody />
          } />
        </DeveloperElement>
      } />
      <Route path={'/developer/Projects'} element={
        <DeveloperElement>
          <VerticalNavBar body={
            <ProjectsBody />
          } />
        </DeveloperElement>
      } />
      <Route  path={'/project/:projectId'}    element ={
  <DeveloperElement>
  <VerticalNavBar  body={
    <SelectedProject/>
  } />
  </DeveloperElement>
} />
    </Routes>
  )
}

export default Developer