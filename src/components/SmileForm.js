

// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   Alert,
// } from "@mui/material";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, push } from "firebase/database";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD4PAGHbHrFZSuXHcZBORTT2_51LHoAKWg",
//   authDomain: "braintumors-69c21.firebaseapp.com",
//   databaseURL: "https://braintumors-69c21-default-rtdb.firebaseio.com",
//   projectId: "braintumors-69c21",
//   storageBucket: "braintumors-69c21.appspot.com",
//   messagingSenderId: "477478144496",
//   appId: "1:477478144496:web:1c264ac7e92bfe0254b535",
//   measurementId: "G-BVNJK2KH2L",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// const SmileForm = () => {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     response: "",
//     taskCategory: "",
//     programmingLanguage: "",
//     promptType: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   const categories = ["Tourism", "Sports", "Games", "Health", "Finance"];
//   const languages = [
//     "Python",
//     "JavaScript",
//     "Java",
//     "C#",
//     "Go",
//     "C++",
//     "C",
//     "TypeScript",
//   ];
//   const promptTypes = [
//     "Code Debugging",
//     "Code Generation",
//     "Code Documentation",
//   ];

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.prompt || formData.prompt.length < 10) {
//       newErrors.prompt = "Prompt must be at least 10 characters long.";
//     }
//     if (!formData.response || formData.response.length < 10) {
//       newErrors.response = "Response must be at least 10 characters long.";
//     }
//     if (!formData.taskCategory) {
//       newErrors.taskCategory = "Task category is required.";
//     }
//     if (!formData.programmingLanguage) {
//       newErrors.programmingLanguage = "Programming language is required.";
//     }
//     if (!formData.promptType) {
//       newErrors.promptType = "Prompt type is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const dbRef = ref(database, "tasks");
//       await push(dbRef, formData);
//       setSuccessMessage("Data submitted successfully!");
//       setFormData({
//         prompt: "",
//         response: "",
//         taskCategory: "",
//         programmingLanguage: "",
//         promptType: "",
//       });
//       setErrors({});
//     } catch (error) {
//       console.error("Error submitting data: ", error);
//       setSuccessMessage("Failed to submit data. Please try again.");
//     }
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         maxWidth: 600,
//         margin: "auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         padding: 3,
//         backgroundColor: "#151515",
//         boxShadow: 3,
//         borderRadius: 2,
//       }}
//       onSubmit={handleSubmit}
//     >
//       <Typography
//         variant="h4"
//         textAlign="center"
//         gutterBottom
//         sx={{ color: "#3de536" }}
//       >
//         Task Submission Form
//       </Typography>

//       {successMessage && (
//         <Alert severity={successMessage.includes("successfully") ? "success" : "error"}>
//           {successMessage}
//         </Alert>
//       )}

//       <TextField
//         name="prompt"
//         label="Prompt"
//         multiline
//         rows={4}
//         value={formData.prompt}
//         onChange={handleChange}
//         error={!!errors.prompt}
//         helperText={errors.prompt}
//         fullWidth
//         required
//         sx={{ backgroundColor: "#ffffff" }}
//       />

//       <TextField
//         name="response"
//         label="Response"
//         multiline
//         rows={4}
//         value={formData.response}
//         onChange={handleChange}
//         error={!!errors.response}
//         helperText={errors.response}
//         fullWidth
//         required
//         sx={{ backgroundColor: "#ffffff" }}
//       />

//       <FormControl fullWidth error={!!errors.taskCategory}>
//         <InputLabel>Task Category</InputLabel>
//         <Select
//           name="taskCategory"
//           value={formData.taskCategory}
//           onChange={handleChange}
//           required
//           sx={{ backgroundColor: "#ffffff" }}
//         >
//           {categories.map((category) => (
//             <MenuItem key={category} value={category}>
//               {category}
//             </MenuItem>
//           ))}
//         </Select>
//         {errors.taskCategory && (
//           <Typography color="error" variant="caption">
//             {errors.taskCategory}
//           </Typography>
//         )}
//       </FormControl>

//       <FormControl fullWidth error={!!errors.programmingLanguage}>
//         <InputLabel>Programming Language</InputLabel>
//         <Select
//           name="programmingLanguage"
//           value={formData.programmingLanguage}
//           onChange={handleChange}
//           required
//           sx={{ backgroundColor: "#ffffff" }}
//         >
//           {languages.map((language) => (
//             <MenuItem key={language} value={language}>
//               {language}
//             </MenuItem>
//           ))}
//         </Select>
//         {errors.programmingLanguage && (
//           <Typography color="error" variant="caption">
//             {errors.programmingLanguage}
//           </Typography>
//         )}
//       </FormControl>

//       <FormControl fullWidth error={!!errors.promptType}>
//         <InputLabel>Prompt Type</InputLabel>
//         <Select
//           name="promptType"
//           value={formData.promptType}
//           onChange={handleChange}
//           required
//           sx={{ backgroundColor: "#ffffff" }}
//         >
//           {promptTypes.map((type) => (
//             <MenuItem key={type} value={type}>
//               {type}
//             </MenuItem>
//           ))}
//         </Select>
//         {errors.promptType && (
//           <Typography color="error" variant="caption">
//             {errors.promptType}
//           </Typography>
//         )}
//       </FormControl>

//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         sx={{
//           padding: 1.5,
//           fontSize: "1rem",
//           backgroundColor: "#3de536",
//           color: "#151515",
//         }}
//       >
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default SmileForm;

import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Avatar,
} from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4PAGHbHrFZSuXHcZBORTT2_51LHoAKWg",
  authDomain: "braintumors-69c21.firebaseapp.com",
  databaseURL: "https://braintumors-69c21-default-rtdb.firebaseio.com",
  projectId: "braintumors-69c21",
  storageBucket: "braintumors-69c21.appspot.com",
  messagingSenderId: "477478144496",
  appId: "1:477478144496:web:1c264ac7e92bfe0254b535",
  measurementId: "G-BVNJK2KH2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const SmileForm = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    response: "",
    taskCategory: "",
    programmingLanguage: "",
    promptType: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const categories = ["Tourism", "Sports", "Games", "Health", "Finance"];
  const languages = [
    "Python",
    "JavaScript",
    "Java",
    "C#",
    "Go",
    "C++",
    "C",
    "TypeScript",
  ];
  const promptTypes = [
    "Code Debugging",
    "Code Generation",
    "Code Documentation",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.prompt || formData.prompt.length < 10) {
      newErrors.prompt = "Prompt must be at least 10 characters long.";
    }
    if (!formData.response || formData.response.length < 10) {
      newErrors.response = "Response must be at least 10 characters long.";
    }
    if (!formData.taskCategory) {
      newErrors.taskCategory = "Task category is required.";
    }
    if (!formData.programmingLanguage) {
      newErrors.programmingLanguage = "Programming language is required.";
    }
    if (!formData.promptType) {
      newErrors.promptType = "Prompt type is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const dbRef = ref(database, "tasks");
      await push(dbRef, formData);
      setSuccessMessage("Data submitted successfully!");
      setFormData({
        prompt: "",
        response: "",
        taskCategory: "",
        programmingLanguage: "",
        promptType: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting data: ", error);
      setSuccessMessage("Failed to submit data. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 800,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 4,
        backgroundColor: "#151515", // Background color
        color: "#ffffff", // Text color
        boxShadow: 4,
        borderRadius: 3,
      }}
      onSubmit={handleSubmit}
    >
      <Avatar
        src="https://framerusercontent.com/images/A6TBbq6XrgpMsgoYU6QNAWHZW1o.png?scale-down-to=512"
        alt="Form Icon"
        sx={{
          width: 500,
          height: 100,
          margin: "0 auto 16px",
        }}
      />
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{ color: "#3de536", fontWeight: "bold" }} // Header color
      >
        Task Submission Form
      </Typography>

      {successMessage && (
        <Alert
          severity={successMessage.includes("successfully") ? "success" : "error"}
          sx={{ backgroundColor: "#3de536", color: "#151515" }}
        >
          {successMessage}
        </Alert>
      )}

      <TextField
        name="prompt"
        label="Prompt"
        multiline
        rows={4}
        value={formData.prompt}
        onChange={handleChange}
        error={!!errors.prompt}
        helperText={errors.prompt}
        fullWidth
        required
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 1,
        }}
      />

      <TextField
        name="response"
        label="Response"
        multiline
        rows={4}
        value={formData.response}
        onChange={handleChange}
        error={!!errors.response}
        helperText={errors.response}
        fullWidth
        required
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 1,
        }}
      />

      <FormControl fullWidth error={!!errors.taskCategory}>
        <InputLabel>Task Category</InputLabel>
        <Select
          name="taskCategory"
          value={formData.taskCategory}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 1,
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        {errors.taskCategory && (
          <Typography color="error" variant="caption">
            {errors.taskCategory}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.programmingLanguage}>
        <InputLabel>Programming Language</InputLabel>
        <Select
          name="programmingLanguage"
          value={formData.programmingLanguage}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 1,
          }}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
        {errors.programmingLanguage && (
          <Typography color="error" variant="caption">
            {errors.programmingLanguage}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.promptType}>
        <InputLabel>Prompt Type</InputLabel>
        <Select
          name="promptType"
          value={formData.promptType}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 1,
          }}
        >
          {promptTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        {errors.promptType && (
          <Typography color="error" variant="caption">
            {errors.promptType}
          </Typography>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          padding: 1.5,
          fontSize: "1rem",
          backgroundColor: "#3de536",
          color: "#151515",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#3de536",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SmileForm;

