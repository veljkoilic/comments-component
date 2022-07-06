import { useState } from "react";
import styled from "styled-components";
import { Comment } from "./components/Comment";
import data from "./data.json";

function App() {
  const [comments, setComments] = useState(data.comments);
  return (
    <Container className="App">
      {comments.map((c) => {
        const replies = c.replies.map((reply) => {
          return <div style={{borderLeft:" 1px solid gray", paddingLeft:"20px",}}><Comment key={reply.id} comment={reply} type="reply" /></div>;
        });
        return (
          <div key={c.id} style={{display:"flex", flexDirection: "column",alignItems: "flex-end"}}>
            <Comment  comment={c} />
            {c.replies.length > 0 && replies}
          </div>
        );
      })}
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px auto;
`;
