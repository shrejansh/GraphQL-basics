import React,{useState,useEffect} from 'react';
import {useMutation, useQuery,gql} from '@apollo/client';
import { GET_BOOKS,DELETE_BOOK} from '../queries/queries';
import { BookDetails } from './BookDetails';
import {
        Grid,
        GridItem,
        Button,
        ButtonGroup,
        Wrap,
        useDisclosure,
        IconButton,
        ScaleFade} from "@chakra-ui/react";
import { DeleteIcon} from '@chakra-ui/icons'

// const gql=require('graphql-tag');



export const BookList=()=>{
    const [selected,setSelected]=useState(null);
    const [deleted,setDeleted]=useState(null);
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [deleteBook]=useMutation(DELETE_BOOK);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    const handleDelete=(e)=>{
        e.preventDefault();
        deleteBook({variables:{id:selected}});
        // e.target.value=null;
    }

    return(
        <div>
            <Grid minH={'xs'}
                  templateColumns="repeat(2,1fr)"
                  gap={4}>
                <GridItem colSpan={1}>
                    <Wrap spacing={4}>
                    {data.books.map(dog => (
                        
                        <ButtonGroup isAttached>
                        <Button 
                        
                        onClick={(e)=>{
                                    setSelected(selected=>dog.id);
                                    }} 
                        key={dog.id} value={dog.name}>
                        {dog.name}
                        </Button>
                                    <IconButton  
                                    value={dog.id} 
                                    onClick={(e)=>{
                                        // e.preventDefault();
                                        setDeleted(deleted=>dog.id);
                                        deleteBook({variables:{id:dog.id},
                                            refetchQueries:[{query:GET_BOOKS}]});

                                        // dog.id=null;
                                    }} 
                                    aria-label="Delete" 
                                    icon={<DeleteIcon/>}/>
                        </ButtonGroup>
                                
                    ))}
                    </Wrap>
                </GridItem>
                
                    <GridItem colSpan={1}>
                            <BookDetails bookid={selected}/>
                    </GridItem>
                
            </Grid>
        </div>
    );
}