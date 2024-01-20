import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, Alert } from '@mui/material';
import List from './List/List';
import "./App.css"
import EditMode from './Editor/Editor';
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Component for creating and editing lists of items.
 * @component App
 * @returns {JSX.Element}
 * @example 
 * return (
 *   <App />
 * )
 */
const App = () => {

  // State variables for lists, selected lists, error message, and edit mode
  const [lists, setLists] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the data from the API and transform it into the desired format
  useEffect(()=>{
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
        // Set isLoading to false after data is set
        setIsLoading(false)
      }
    ).catch(
      error=>{
        // Set isLoading to false after error occurs
        setIsLoading(false)
      }
    )
  },[])

  // Handle the checkbox change event for selecting lists
  const handleCheckboxChange = (index, event) => {
      if(event){
        setSelectedLists(()=>{
          return [...selectedLists, index]
        });
      }
      else{
        setSelectedLists(selectedLists.filter(item=>item !== index))
      }
  };

  // Handle the button click event for creating a new list
  const handleCreateNewList = () => {
    if(!lists.length){
      setError("Wait for lists to be rendered")
    }
    else if (selectedLists.length < 2) {
      setError('You should select at exactly two lists to create a new list.');
    }else if(selectedLists.length === 2){
      setError(null)
      const newLists = [...lists, []];
      setLists(newLists);
      setSelectedLists([...selectedLists]);
      setEditMode(true);
    }
    else if(selectedLists.length > 2)
    {
      setError('exactly two lists can be selected at a time.');
    } 
  };

  // Handle the level change event for updating the lists
  const handleLevelChange = (list) =>{
    const newArr = [...lists]
    list.forEach(item => newArr[item.listNumber] = item.list)
    setLists(newArr)
    setSelectedLists([]);
    setEditMode(false)
  }

  // Handle the abort edit event for disabling the edit mode
  const DisableEditMode = () => {
    setSelectedLists([]);
    setLists(lists.filter(item=>item.length))
    setEditMode(false);
  }
  

  return (
    <Container className='container' maxWidth={false}>
    {
      editMode ?
      <></> :
      <Box display="flex" flexDirection="column" alignItems="center" pt={'2rem'}  mb={10}>
        <Typography variant="h4" mb={'1rem'} fontWeight={'600'}>List Creation</Typography>
        <Button variant="contained" color="primary" onClick={handleCreateNewList}>Create a new list</Button>
        {error && <Alert sx={{mt:1}} severity="error">{error}</Alert>}
      </Box>
    }
      <Grid sx={{ flexGrow: 1 }} container spacing={1} bgcolor="white" width={'100%'} height={'100%'} >
        {editMode ? (
          <EditMode abortEdit={DisableEditMode} levels={{l: selectedLists.map(index => {return ({list: lists[index], listNumber: index})}), total: lists.length}} updateLevels={(listx)=>handleLevelChange(listx)}/>
        ) : (
          // Use a ternary operator to show the loader or the lists
          isLoading ? (
            // Show the loader component
            <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', width:'100%'}}>
              <Box mb={1}>
                <CircularProgress />
              </Box>
              <Box sx={{mt:5}}>
                <Typography variant="p" mb={'1rem'} fontWeight={'600'}>Loading Lists</Typography>
              </Box>
            </Box>
          ) : (
            // Show the lists
            lists.map((list, index) => (
              <Grid item xl={3} lg={3} sm={6} md={4}  key={index} >
  
              <List editMode={false} title={`List ${index + 1}`} items={list}  onCheckboxChange={(event) => handleCheckboxChange(index, event)} />
            </Grid>
            ))
          )
        )}
      </Grid>
    </Container>
  );
};

export default App;
