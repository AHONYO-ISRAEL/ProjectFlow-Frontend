import {  Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import PropTypes from 'prop-types'
const DevProjectTable = ({data})=>{
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Developer ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Project Name</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.projects.developers?.map((developer) => (
            <TableRow key={developer.id}>
              <TableCell>{developer.id}</TableCell>
              <TableCell>{developer.user.username}</TableCell>
              <TableCell>{data.projects.name}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
}


DevProjectTable.propTypes = {
    data : PropTypes.object,
}
export default DevProjectTable