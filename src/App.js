import { useState } from "react";
import styled from "styled-components";
import { Comment } from "./components/Comment";
import data from "./data.json";

function App() {
  const [comments, setComments] = useState(data.comments);
  const [user, setUser] = useState(data.currentUser)
  return (
    <Container className="App">
      {comments.map((c) => {
        const replies = c.replies.map((reply) => {
          return <div style={{borderLeft:" 3px solid var(--light-gray)", paddingLeft:"20px", marginLeft: "25px"}}><Comment key={reply.id} comment={reply} type="reply" /></div>;
        });
        return (
          <div key={c.id} style={{display:"flex", flexDirection: "column",alignItems: "flex-end"}}>
            <Comment  comment={c} />
            {c.replies.length > 0 && replies}
          </div>
        );
      })}
      <AddComment>
        <TextArea placeholder="Add a comment..." resizable='false'/>
        <ImageSend>
          <Image src={user.image.png}></Image>
          <Send>SEND</Send>
        </ImageSend>
      </AddComment>
    </Container>
  );
}

export default App;
const AddComment = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #fff;
margin-top: 20px;
border-radius: 8px;
padding: 15px;
box-sizing: border-box;
`;
const TextArea = styled.textarea`
resize: none;
width: 90%;
height: 50px;
border: 1px solid var(--light-gray);
border-radius: 5px;
font-family: 'Rubik', sans-serif;
font-size: 12px;
padding: 10px 10px;
margin-bottom: 20px;
:focus{
  outline: none;
  border: 1px solid var(--light-grayish-blue);
}
`;
const ImageSend = styled.div`
display:flex;
align-items: center;
width: 100%;
padding: 5px;
box-sizing: border-box;
justify-content: space-between;
`;
const Image = styled.img`
width: 25px;
height: 25px;
`;
const Send = styled.button`
background-color: var(--moderate-blue);
color: #fff;
padding: 10px 25px;
border: none;
border-radius: 5px;
font-weight: bold;
letter-spacing: 1px;
&:hover{
  opacity: 0.5;
  cursor: pointer;
}
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px auto;
  padding: 0px 20px;
`;
