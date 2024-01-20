import React from "react";
import {
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

const ListElement = ({ item, onMoveItem, index, editMode, laneNumber }) => (
  <ListItem>
    <Box
      component="span"
      width={1}
      bgcolor="white"
      borderRadius="15px"
      px={3}
      py={3}
      m={1}
      border={"2px solid #dee6ef"}
    >
      <Typography variant="h6" fontWeight={"bold"} minWidth={'fit-content'} gutterBottom>
        {item.title}
      </Typography>
      <ListItemText
        primary={item.description}
        primaryTypographyProps={{
          noWrap: false,
          color: "#889399",
          fontWeight: "600",
        }}
      />

      {editMode && laneNumber === 1 ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ position: "flex-end" }}>
            <i
              className="fa-solid fa-arrow-left"
              onClick={() => onMoveItem(index, "left")}
            ></i>
          </Box>
          <Box>
            <i
              className="fa-solid fa-arrow-right"
              onClick={() => onMoveItem(index, "right")}
            ></i>
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {editMode && laneNumber === 2 ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ position: "flex-end" }}>
            <i
              className="fa-solid fa-arrow-left"
              onClick={() => onMoveItem(index, "left")}
            ></i>
          </Box>
        </Box>
      ) : (
        <></>
      )}
      {editMode && laneNumber === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box>
            <i
              className="fa-solid fa-arrow-right"
              onClick={() => onMoveItem(index, "right")}
            ></i>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  </ListItem>
);

export default ListElement;
