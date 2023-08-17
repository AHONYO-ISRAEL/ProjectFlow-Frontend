import { List, ListItem, ListItemText } from '@mui/material';
import {useState} from 'react'
 import PropTypes from 'prop-types'
 import axios from 'axios'

const DeveloperList = () => {
    const [developers, setDevelopers]=useState([])
const getDevelopers = async()=>{
  try{
const devResponse = await axios.get('http://localhost:3000/api/admin/dev/get/project')
if(devResponse.status===200){
setDevelopers(devResponse.data)
console.log(devResponse.data)
}
  }catch(error){
    console.log(error)
  }
}

  return (
    <List>
      {developers.map((developer) => (
        <ListItem key={developer.id}>
          <ListItemText primary={developer.user.username} />
          <List>
            {developer.projects.map((project) => (
              <ListItem key={project.id}>
                <ListItemText primary={project.name} />
                <List>
                  {project.sections.map((section) => (
                    <ListItem key={section.id}>
                      <ListItemText primary={section.name} />
                      <List>
                        {section.tasks.map((task) => (
                          <ListItem key={task.id}>
                            <ListItemText primary={task.name} />
                          </ListItem>
                        ))}
                      </List>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
};

DeveloperList.propTypes={
    developers: PropTypes.array
}

export default DeveloperList;
