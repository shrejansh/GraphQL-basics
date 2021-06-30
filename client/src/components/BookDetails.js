import React from 'react';
import {ListItem,
    UnorderedList,
    Text,
    extendTheme,
    withDefaultColorScheme,
    Center,
    Heading,
    Box,
    Wrap,
    Container } from "@chakra-ui/react";
import { GET_BOOK } from '../queries/queries';
import { useQuery } from '@apollo/client';

const customTheme = extendTheme(withDefaultColorScheme({ colorScheme: "blackAlpha" }))

    export const BookDetails=({bookid})=>{
        const { loading, error, data } = useQuery(GET_BOOK,{
            variables: { id:bookid },
          });
    
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
    

        console.log(data)
        const displayDetails=()=>{
            const {book}=data;
            if(book){
                return(
                    <Container>
                        <Heading>{book.name}</Heading>
                        <Text>{book.genre}</Text>
                        <Text>{book.author.name}</Text>
                        <Text>All books by this author</Text>
                        <UnorderedList>
                            {book.author.books.map(item=>{
                                return <ListItem key={item.id}>{item.name}</ListItem>
                            })}
                        </UnorderedList>
                    </Container>
                )
            }
        }
    
       
        return(
            <div id="book-details">
               <Center bg={'purple.400'} boxShadow={'xl'} p={8} color={'whitesmoke'} borderRadius={'lg'}>
                   <Text>
                   Details {displayDetails()}
                   </Text>
                   </Center>
            </div>
        );
    }