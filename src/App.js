import { useEffect, useState } from "react";
import styled from "styled-components";
import { Comment } from "./components/Comment";
import data from "./data.json";

function App() {
  const [comments, setComments] = useState(data.comments);
  const [user, setUser] = useState(data.currentUser);
  const addComment = (event) => {
    event.preventDefault();
    const textValue = event.target.firstChild.value;
    setComments((prev) => {
      return [
        ...prev,
        {
          id: Math.max(...prev.map((o) => o.id)) + 1,
          content: textValue,
          createdAt: "just now",
          score: 0,
          user,
          replies: [],
        },
      ];
    });
  };
  const handleVote = (type, id, commentType, parentComment = null) => {
    // INCREASE
    if (type === "inc") {
      setComments((prev) => {
        //If the comment is a parent comment, find it through the id of the comment and change it through the index
        if (commentType !== "reply") {
          let index = prev.indexOf(prev.find((e) => e.id === id));
          console.log(index);
          return [...prev.slice(0, index), { ...prev[index], score: prev[index].score + 1 }, ...prev.slice(index + 1)];
          //  if the comment is a reply
          //take the parent index, find the id of the comment inside that parents replies array.
        } else {
          let parentIndex = prev.indexOf(prev.find((e) => e.id === parentComment));
          let index = prev[parentIndex].replies.indexOf(prev[parentIndex].replies.find((e) => e.id === id));
          return [
            ...prev.slice(0, parentIndex),
            {
              ...prev[parentIndex],
              replies: [
                ...prev[parentIndex].replies.slice(0, index),
                { ...prev[parentIndex].replies[index], score: prev[parentIndex].replies[index].score + 1 },
                ...prev[parentIndex].replies.slice(index+1),
              ]            },
            ...prev.slice(parentIndex + 1),
          ];
        }
      });
    } else {
      // DECREASE
      //If the comment is a parent comment, find it through the id of the comment and change it through the index
      setComments((prev) => {
        if (commentType !== "reply") {
          let index = prev.indexOf(prev.find((e) => e.id === id));
          console.log(index);
          return [...prev.slice(0, index), { ...prev[index], score: prev[index].score - 1 }, ...prev.slice(index + 1)];
          //  if the comment is a reply
          //take the parent index, find the id of the comment inside that parents replies array.
        } else {
          let parentIndex = prev.indexOf(prev.find((e) => e.id === parentComment));
          let index = prev[parentIndex].replies.indexOf(prev[parentIndex].replies.find((e) => e.id === id));
          return [
            ...prev.slice(0, parentIndex),
            {
              ...prev[parentIndex],
              replies: [
                ...prev[parentIndex].replies.slice(0, index),
                { ...prev[parentIndex].replies[index], score: prev[parentIndex].replies[index].score - 1 },
                ...prev[parentIndex].replies.slice(index+1),
              ]
            },
            ...prev.slice(parentIndex + 1),
          ];
        }
      });
    }
  };
  useEffect(() => {
    setComments((prev) => prev.sort((a, b) => (a.score > b.score ? 1 : -1)));
  }, [comments]);
  const commentElements = comments
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .map((c) => {
      const replies = c.replies.map((reply) => {
        return (
          <div style={{ borderLeft: " 2px solid var(--light-gray)", paddingLeft: "20px", marginLeft: "25px" }}>
            <Comment
              key={reply.id + reply.content}
              comment={reply}
              type="reply"
              myComment={reply.user.username === user.username ? true : false}
              handleVote={handleVote}
              parentComment={c.id}
            />
          </div>
        );
      });
      return (
        <div key={c.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <Comment comment={c} myComment={c.user.username === user.username ? true : false} handleVote={handleVote} />
          {c.replies.length > 0 && replies}
        </div>
      );
    });
  return (
    <Container className="App">
      {commentElements}
      <AddComment onSubmit={(event) => addComment(event)}>
        <TextArea placeholder="Add a comment..." resizable="false" />
        <ImageSend>
          <Image src={user.image.png}></Image>
          <Send type="submit">SEND</Send>
        </ImageSend>
      </AddComment>
    </Container>
  );
}

export default App;
const AddComment = styled.form`
  width: 100%;
  max-width: 645px;
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
  font-family: "Rubik", sans-serif;
  font-size: 12px;
  padding: 10px 10px;
  margin-bottom: 20px;
  :focus {
    outline: none;
    border: 1px solid var(--light-grayish-blue);
  }
`;
const ImageSend = styled.div`
  display: flex;
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
  &:hover {
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
  /* width: 800px; */
`;
