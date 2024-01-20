import React from "react";
import {
  List as MuiList,
  ListSubheader,
  Checkbox,
} from "@mui/material";
import ListItem from "./ListItem";

const List = ({
  title,
  items,
  onMoveItem,
  onCheckboxChange,
  editMode,
  laneNumber
}) => (
  <MuiList
    subheader={
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
        <Checkbox
          bgcolor={"white"}
          onChange={(event) => onCheckboxChange(event.target.checked)}
        />
        {title} {editMode? `(${items.length})` : ''}
      </ListSubheader>
    }
    sx={{
      bgcolor: "#eff6ff",
      p: 1,
      pt: 0,
      borderRadius: 3,
      minHeight:"30vh",
      maxHeight: "80vh",
      minWidth: '85%',
      height: "100%",
      overflow: "auto",
    }}
  >
     
    {
        items.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem item={item} onMoveItem={onMoveItem} laneNumber={laneNumber} index={index} editMode={editMode}/>
          </React.Fragment>
        ))
      }
  </MuiList>
);
export default List;
