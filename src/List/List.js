import React from "react";
import { List as MuiList, ListSubheader, Checkbox, FormControlLabel } from "@mui/material";
import ListItem from "./ListItem";

/**
 * Component for displaying a list of items.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the list.
 * @param {Array} props.items - The items to display in the list.
 * @param {Function} props.onMoveItem - The function to handle moving an item to another list.
 * @param {Function} props.onCheckboxChange - The function to handle checking or unchecking the list.
 * @param {boolean} props.editMode - The flag to indicate if the list is in edit mode or not.
 * @param {number} props.laneNumber - The index of the list in the grid.
 * @returns {JSX.Element} The List component.
 */
const List = ({
  title,
  items,
  onMoveItem,
  onCheckboxChange,
  editMode,
  laneNumber,
}) => (
  <MuiList
    subheader={renderSubheader(title, items.length, editMode, onCheckboxChange)}
    sx={{
      bgcolor: "#eff6ff",
      p: 1,
      pt: 0,
      borderRadius: 3,
      minHeight: "30vh",
      maxHeight: "80vh",
      minWidth: "85%",
      height: "100%",
      overflow: "auto",
    }}
  >
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem
          item={item}
          onMoveItem={onMoveItem}
          laneNumber={laneNumber}
          index={index}
          editMode={editMode}
        />
      </React.Fragment>
    ))}
  </MuiList>
);
export default List;

/**
 * Renders the subheader for the list.
 * @param {string} title - The title of the list.
 * @param {number} itemCount - The number of items in the list.
 * @param {boolean} editMode - The flag to indicate if the list is in edit mode or not.
 * @param {Function} onCheckboxChange - The function to handle checking or unchecking the list.
 * @returns {JSX.Element} The subheader component.
 */
const renderSubheader = (title, itemCount, editMode, onCheckboxChange) => {
  return (
    <ListSubheader
      sx={{
        bgcolor: "#eff6ff",
        pt: 3,
        pb: 1,
        fontWeight: 600,
        fontSize: 18,
        color: "black",
      }}
    >
      {editMode ? (
        <>{title} ({itemCount})</>
      ) : (
        <FormControlLabel
          control={<Checkbox bgcolor={"white"}
          onChange={(event) => onCheckboxChange(event.target.checked)}/>}
          label={title}
          labelPlacement="end"
        />
        
      )}
       
    </ListSubheader>
  );
};

/**
 * @module List
 */
