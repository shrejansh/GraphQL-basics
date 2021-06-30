import { Heading,
            Box,
            } from "@chakra-ui/react"
import { BookList } from "./components/BookList";
import { AddBook } from "./components/AddBook";


function App() {
  return (
    <div className="App">
     <Box p={8} >
      <Heading as="h2" size="3xl" pb={4} m={4} isTruncated>
        Reading List 
        </Heading>
        <BookList/>
        <AddBook/>
       </Box> 
    </div>
  );
}

export default App;
