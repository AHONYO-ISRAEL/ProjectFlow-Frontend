import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const projectDevs = [
  {
    id: 1,
    uuid: "a3ce300e-145b-4fcf-8c5a-645d6de85116",
    username: "Devdev",
    email: "devdev@gmail.com",
    password: "$2b$10$4uRIiEhBNafvl3TnBB3RlOqhv2Zv1WBIgRuEfdETzQnovNVvsITL2",
    createdAt: "2023-07-26T15:36:35.000Z",
    updatedAt: "2023-07-26T15:36:35.000Z",
    roleId: 1
  },
  {
    id: 2,
    uuid: "c9fc3349-f6da-46bc-91c2-63c40260c918",
    username: "John Doe",
    email: "admin@gmail.com",
    password: "$2b$10$HOQahYECeqjMQRFJ/6lQgOTJpgAqT0hV3p/VsL/gtpjb.J.piJgI6",
    createdAt: "2023-07-26T15:37:25.000Z",
    updatedAt: "2023-07-26T15:37:25.000Z",
    roleId: 2
  }
];

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
];

const DevTable = () => {

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
               
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projectDevs.map((dev) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={dev.id}>
                <TableCell align="center">
                  {dev.username}
                </TableCell>
                <TableCell align="center">
                  {dev.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DevTable;
