import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [user, setUser] = useState({});
  const[todoId,setTodoId]=useState();
  const [userId,setUserId]=useState();
  const [todoTitle,setTodoTitle]=useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [userDeatails,setUserDetails]=useState(false);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data);
        setFilteredTodos(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSort = (sortOrder) =>{
    let sortedTodos = [...filteredTodos];
    sortedTodos.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.id - b.id;
      } 
      else {
        return b.id - a.id;
      }
    });
    setFilteredTodos(sortedTodos);
  };
 const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    let filtered = todos.filter(todo => {
        return (
        todo.id.toString().toLowerCase().includes(event.target.value.toLowerCase()) ||
        todo.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        todo.completed.toString().toLowerCase().includes(event.target.value.toLowerCase())
        );
    });
    setFilteredTodos(filtered);
  };
  const handleViewUser = (todoId,userId,userTitle) => {
    setTodoId(todoId);
    setUserId(userId);
    setTodoTitle(userTitle);
    setUserDetails(true);
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.log(error));
  };
  const hideUserDetails = ()=>{
    setUserDetails(false);
  }
  return (
    <>
    <Header/>
    <Container>
      <Row>
        <Col md={6}>
          <h3 style={{position:'relative',marginBottom:'-55px', marginTop:'20%'}}>Todos</h3>
          <TextField
            value={searchTerm}
            onChange={handleSearch}
            margin="normal"
            variant="outlined"
            style={{display:'flex',flexDirection:'right' ,marginLeft:"40%"}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            placeholder="search..."
          />
          <TableContainer style={{ border: '1px solid black' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSort('asc')}>Todo ID &#8593;</TableCell>
                  <TableCell onClick={() => handleSort('desc')}>Todo ID &#8595;</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTodos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.id}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.completed ? 'Completed' : 'Incomplete'}</TableCell>
                    <TableCell>
                      <Button style={{ textTransform: 'none',width:'120px'}} variant="contained" color="primary" onClick={() => handleViewUser(todo.id,todo.userId,todo.title)}>View User</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        {userDeatails?
        <Col md={6}>
  <h3 style={{marginTop:'20%',marginLeft:'10%'}}>User Details<Button variant="contained" color="secondary" onClick={()=>hideUserDetails()}style={{position:'relative',marginLeft:'92%'}}>Delete</Button></h3>
  <TableContainer style={{ border: '1px solid black',marginLeft:'10%',display:'flex',flexDirection:'right' }}>
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Todo ID</TableCell>
        <TableCell>{todoId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Todo Title</TableCell>
        <TableCell>{todoTitle}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>User ID</TableCell>
        <TableCell>{userId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>User Name</TableCell>
        <TableCell>{user.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Email</TableCell>
        <TableCell>{user.email}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
 </TableContainer>
</Col>
:
null}
</Row>
</Container>
</>
)}
export default App;
