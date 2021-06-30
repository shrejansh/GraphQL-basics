import React,{useState} from 'react';
import {useQuery,useMutation} from '@apollo/client';
// import { Select } from "@chakra-ui/react";
import { Stack,
    InputGroup,
    InputLeftAddon,
    Select,
    Input,
    Button } from "@chakra-ui/react";
import { GET_AUTHORS,ADD_BOOK,GET_BOOKS } from '../queries/queries';


export const AddBook=()=>{
   const [{book,genre,author},setValue]=useState({book:"",genre:"",author:""})
   const handleSubmit=(e)=>{
        e.preventDefault();
        addBook({ variables: { name: book ,genre:genre ,authorId:author},
            refetchQueries:[{query:GET_BOOKS}]});
        
        // console.log(book,genre,author); 
    }
    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [addBook] = useMutation(ADD_BOOK);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    // useEffect(()=>{
    //     console.log(data)
    // },[data])
    // console.log(data)
    return(
        <div>
            <Stack maxW={'xl'} spacing={4}>
                <h2>{book}</h2>
              <InputGroup>
                    <InputLeftAddon children="Book" />
                    <Input value={book} required onChange={(e)=>setValue(currentState=>({...currentState,book:e.target.value}))}/>
                </InputGroup>
                <h2>{genre}</h2>
              <InputGroup>
                    <InputLeftAddon children="Genre" />
                    <Input value={genre} required onChange={(e)=>setValue(currentState=>({...currentState,genre:e.target.value}))}/>
                </InputGroup>

            <Select placeholder="Select author" value={author} onChange={(e)=>setValue(currentState=>({...currentState,author:e.target.value}))}>
            {data.authors.map(dog => (
                <option key={dog.id} value={dog.id}>
                {dog.name}
                </option>
            ))}
            </Select>
            
                <Button type="submit" onClick={handleSubmit} bgColor={'purple.400'} color={"whitesmoke"}>Add</Button>

            </Stack>
        </div>
    );
}