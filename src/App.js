import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import "./App.css";
import EditMode from "./Editor/Editor";
import Grid from "@mui/material/Grid";
import renderLoading from "./Helpers/Loading.helper";
import renderLists from "./Helpers/List.helper";
import renderListCreation from "./Helpers/CreateNewList.helper";

/**
 * Component for creating and editing lists of items.
 * @component
 * @returns {JSX.Element} The App component.
 */
const App = () => {
  // The state for the lists of items.
  const [lists, setLists] = useState([]);
  // The state for the selected lists to edit.
  const [selectedLists, setSelectedLists] = useState([]);
  // The state for the error message.
  const [error, setError] = useState("");
  // The state for the edit mode flag.
  const [editMode, setEditMode] = useState(false);
  // The state for the loading indicator.
  const [isLoading, setIsLoading] = useState(true);

  // The function to fetch the data from the API.
  const fetchData = () => {
    fetch('https://apis.ccbp.in/list-creation/lists').then(
      res=>{
        return res.json();
      }
    ).then(
      data=>{
        let tempList = [] 

        for (let element of data.lists) {
          let listNumber = element.list_number;
          if (tempList[listNumber - 1] === undefined) {
            tempList[listNumber - 1] = [];
          }
        
          let newObj = {
            title: element.name,
            description: element.description,
          };
          tempList[listNumber - 1].push(newObj);
        }
        setLists(tempList)
        setIsLoading(false)
      }
    ).catch(
      error=>{
        setError("Something went wrong while fetching lists")
        setIsLoading(false)
      }
    )
  }

  // Fetch the data when the component mounts.
  useEffect(() => {
    fetchData();
  }, []);

  // The function to handle the checkbox change event.
  const handleCheckboxChange = (index, event) => {
    if (event) {
      setSelectedLists(() => {
        return [...selectedLists, index];
      });
    } else {
      setSelectedLists(selectedLists.filter((item) => item !== index));
    }
  };

  // The function to handle the create new list button click event.
  const handleCreateNewList = () => {
    if (!lists.length) {
      setError("Wait for lists to be rendered");
    } else if (selectedLists.length < 2) {
      setError("You should select exactly two lists to create a new list.");
    } else if (selectedLists.length === 2) {
      setError(null);
      const newLists = [...lists, []];
      setLists(newLists);
      setSelectedLists([...selectedLists]);
      setEditMode(true);
    } else if (selectedLists.length > 2) {
      setError("Exactly two lists can be selected at a time.");
    }
  };

  // The function to handle the level change event.
  const handleLevelChange = (list) => {
    const newArr = [...lists];
    list.forEach((item) => (newArr[item.listNumber] = item.list));
    setLists(newArr);
    setSelectedLists([]);
    setEditMode(false);
  };

  // The function to disable the edit mode.
  const disableEditMode = () => {
    setSelectedLists([]);
    setLists(lists.filter((item) => item.length));
    setEditMode(false);
  };

  return (
    <Container className="container" maxWidth={false}>
      {editMode ? (
        <EditMode
          abortEdit={disableEditMode}
          levels={{
            l: selectedLists.map((index) => {
              return { list: lists[index], listNumber: index };
            }),
            total: lists.length,
          }}
          updateLevels={(listx) => handleLevelChange(listx)}
        />
      ) : (
        <>
          {renderListCreation(error,handleCreateNewList)}
          <Grid
            sx={{ flexGrow: 1 }}
            container
            spacing={1}
            bgcolor="white"
            width={"100%"}
            height={"100%"}
          >
            {isLoading ? renderLoading() : renderLists(lists, handleCheckboxChange)}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default App;

/**
 * @module App
 */
