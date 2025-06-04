import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { motion } from "framer-motion";

const Courses = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageChange = (e) => setImage(URL.createObjectURL(e.target.files[0]));
  const handleVideoChange = (e) => setVideo(e.target.files[0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h3>Create Course</h3>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        <TextField label="Course Title" fullWidth />
        <TextField label="Instructor" fullWidth />
        <Button variant="contained" component="label">
          Upload Thumbnail
          <input hidden accept="image/*" type="file" onChange={handleImageChange} />
        </Button>
        {image && <img src={image} alt="preview" width="100%" style={{ maxHeight: 200 }} />}
        <Button variant="contained" component="label">
          Upload Video
          <input hidden accept="video/*" type="file" onChange={handleVideoChange} />
        </Button>
        <Button variant="contained" color="primary">Create Course</Button>
      </Box>
    </motion.div>
  );
};

export default Courses;
