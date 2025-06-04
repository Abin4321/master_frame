
import { Table, TableRow, TableHead, TableCell, TableBody, Button } from "@mui/material";
import { motion } from "framer-motion";

const dummyUsers = [
  { id: 1, email: "admin@example.com", role: "admin" },
  { id: 2, email: "student@example.com", role: "user" }
];

const Users = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
    <h3>All Users</h3>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dummyUsers.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Button variant="outlined" size="small">Make Admin</Button>
              <Button variant="outlined" color="error" size="small" style={{ marginLeft: 8 }}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </motion.div>
);

export default Users;
