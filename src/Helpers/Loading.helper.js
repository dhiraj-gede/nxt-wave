import { Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
  // The function to render the loading indicator.
const renderLoading = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box mb={1}>
          <CircularProgress />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography variant="p" mb={"1rem"} fontWeight={"600"}>
            Loading Lists
          </Typography>
        </Box>
      </Box>
    );
};
export default renderLoading;