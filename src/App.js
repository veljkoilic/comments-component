import { useState } from "react";
import styled from "styled-components";
import { Comment } from "./components/Comment";
import data from "./data.json"

function App() {
  const [comments, setComments] = useState(data.comments)
  return (
    <Container className="App">
      {comments.map(c=><Comment key={c.id} comment={c}/>)}
    </Container>
  );
}

export default App;

const Container = styled.div`

display: flex;
align-items: center;
flex-direction: column;
margin: 50px auto;
`