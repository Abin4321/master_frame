import { Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Dashboard = () => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <Grid container spacing={3}>
      {["Total Users", "Courses", "Enrollments"].map((label, i) => (
        <Grid item xs={12} sm={4} key={i}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">{label}</Typography>
            <Typography variant="h4">{Math.floor(Math.random() * 200)}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </motion.div>
);

export default Dashboard;
