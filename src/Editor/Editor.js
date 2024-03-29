import React from "react";
import { Button, Box } from "@mui/material";
import List from "../List/List";
import Grid from "@mui/material/Grid";

/**
 * Component for editing lists of items.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.levels - The lists to edit.
 * @param {Function} props.updateLevels - The function to update the lists.
 * @param {Function} props.abortEdit - The function to cancel the edit mode.
 * @returns {JSX.Element} The EditMode component.
 */
const EditMode = ({ levels, updateLevels, abortEdit }) => {
  // The state for the edited lists.
  const [lists, setLists] = React.useState(getInitialLists(levels));

  /**
   * Handles the movement of an item from one list to another.
   * @param {number} index - The index of the source list.
   * @param {number} itemIndex - The index of the item to move.
   * @param {string} direction - The direction of the movement ("left" or "right").
   */
  const handleLaneMovement = (index, itemIndex, direction) => {
    const newLists = [...lists];
    const list = newLists[index];
    const item = list.list[itemIndex];
    list.list.splice(itemIndex, 1); // Remove the item from the source list
    const targetIndex = direction === "right" ? index + 1 : index - 1; // Get the index of the target list
    newLists[targetIndex].list.push(item); // Add the item to the target list
    setLists(newLists);
  };

  return (
    <React.Fragment>
      <Grid
        sx={{ flexGrow: 1, height: "90vh" }}
        container
        spacing={1}
        bgcolor="white"
      >
        {lists.map((list, index) => (
          <Grid key={index} item xl={2} lg={3} sm={4} md={4}>
            <List
              editMode={true}
              title={`List ${list.listNumber + 1}`}
              items={list.list}
              laneNumber={index}
              onMoveItem={(itemIndex, direction) =>
                handleLaneMovement(index, itemIndex, direction)
              }
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", gap: 1 }}>
        <Button onClick={abortEdit} variant="outlined">
          cancel
        </Button>
        <Button onClick={() => updateLevels(lists)} variant="contained">
          update
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default EditMode;

/**
 * @module EditMode
 */

/**
 * Gets the initial state for the edited lists.
 * @param {Object} levels - The lists to edit.
 * @returns {Array} The initial state for the edited lists.
 */
const getInitialLists = (levels) => {
  return [
    JSON.parse(JSON.stringify(levels.l[0])), // Deep copy
    { list: [], listNumber: levels.total - 1 },
    JSON.parse(JSON.stringify(levels.l[1])), // Deep copy
  ];
};
