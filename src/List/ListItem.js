import React from "react";
import {
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

/**
 * Component for displaying a single item in a list.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The item to display.
 * @param {string} props.item.title - The title of the item.
 * @param {string} props.item.description - The description of the item.
 * @param {Function} props.onMoveItem - The function to handle moving the item to another list.
 * @param {number} props.index - The index of the item in the list.
 * @param {boolean} props.editMode - The flag to indicate if the list is in edit mode or not.
 * @param {number} props.laneNumber - The index of the list in the grid.
 * @returns {JSX.Element} The ListElement component.
 */
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

      {editMode && renderArrows(laneNumber, index, onMoveItem)}
    </Box>
  </ListItem>
);

/**
 * Renders the arrow icons for moving the item to another list.
 * @param {number} laneNumber - The index of the list in the grid.
 * @param {number} index - The index of the item in the list.
 * @param {Function} onMoveItem - The function to handle moving the item to another list.
 * @returns {JSX.Element} The arrow icons.
 */
const renderArrows = (laneNumber, index, onMoveItem) => {
  return (
    <Box sx={{ display: "flex", justifyContent: laneNumber==1 ? "space-between" : "flex-end" }}>
      {laneNumber > 0 && (
        <Box>
          <i
            className="fa-solid fa-arrow-left"
            onClick={() => onMoveItem(index, "left")}
          ></i>
        </Box>
      )}
      {laneNumber < 2 && (
        <Box>
          <i
            className="fa-solid fa-arrow-right"
            onClick={() => onMoveItem(index, "right")}
          ></i>
        </Box>
      )}
    </Box>
  );
};

export default ListElement;

/**
 * @module ListElement
 */
