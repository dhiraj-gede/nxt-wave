import Grid from "@mui/material/Grid";
import List from "../List/List";
// The function to render the lists of items.
const renderLists = (lists, handleCheckboxChange) => {
  return lists.map((list, index) => (
    <Grid item xl={3} lg={3} sm={6} md={4} key={index}>
      <List
        title={`List ${index + 1}`}
        items={list}
        onCheckboxChange={(event) => handleCheckboxChange(index, event)}
      />
    </Grid>
  ));
};

export default renderLists;