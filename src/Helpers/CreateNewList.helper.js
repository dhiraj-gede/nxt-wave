  // The function to render the list creation section.
import { Button, Typography, Box, Alert } from "@mui/material";
const renderListCreation = (error,handleCreateNewList) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt={"2rem"}
        mb={10}
      >
        <Typography variant="h4" mb={"1rem"} fontWeight={"600"}>
          List Creation
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewList}
        >
          Create a new list
        </Button>
        {error && <Alert sx={{ mt: 1 }} severity="error">{error}</Alert>}
      </Box>
    );
  };
  export default renderListCreation;