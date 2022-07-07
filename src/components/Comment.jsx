import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

//onSubmit={()=>{editComment(parentComment,comment.id, type, newText )}

export const Comment = ({
  comment,
  type,
  myComment,
  handleVote,
  parentComment,
  user,
  addReply,
  deleteComment,
  editComment,
}) => {
  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [editedCommentData, setEditedCommentData] = useState(comment.content)
  const [replyData, setReplyData] = useState({
    content: `${"@" + comment.user.username}`,
    createdAt: Date.now(),
    score: 0,
    replyingTo: comment.user.username,
    user,
  });
  const updateReply = (event) => {
    let value = event.target.value;
    setReplyData((prev) => {
      return { ...prev, content: value};
    });
  };
  const timeSince  = (date)=>{

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  return (
    <>
      {modalIsOpen && (
        <Modal
          onClick={(e) => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <Title>Delete Comment</Title>
            <Text>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone
            </Text>
            <ModalButtons>
              <CancelButton
                onClick={() => {
                  setModalIsOpen(!modalIsOpen);
                }}
              >
                NO, Cancel
              </CancelButton>
              <DeleteButton
                onClick={() => {
                  deleteComment(parentComment, comment.id, type);
                  setModalIsOpen(!modalIsOpen);
                }}
              >
                YES, Delete
              </DeleteButton>
            </ModalButtons>
          </ModalBody>
        </Modal>
      )}
      <Container
        className="container"
        style={
          type === "reply"
            ? { minWidth: "200px", maxWidth: "500px" }
            : { minWidth: "300px", maxWidth: "600px" }
        }
      >
        <Left>
          <Votes>
            <span
              onClick={() => handleVote("inc", comment.id, type, parentComment)}
            >
              +
            </span>
            <span>{comment.score}</span>
            <span
              onClick={() => handleVote("dec", comment.id, type, parentComment)}
            >
              -
            </span>
          </Votes>
          {!myComment && (
            <TopActions className="left">
              <Reply onClick={() => setReplyIsOpen(!replyIsOpen)}>
                <img src="./images/icon-reply.svg" alt="reply icon" />
                <span >Reply</span>
              </Reply>
            </TopActions>
          )}
          {myComment && (
            <TopActions className="left">
              <Delete
                onClick={() => {
                  setModalIsOpen(!modalIsOpen);
                }}
              >
                <img src="./images/icon-delete.svg" alt="reply icon" />
                <span>Delete</span>
              </Delete>
              <Edit>
                <img src="./images/icon-edit.svg" alt="reply icon" />
                <span>Edit</span>
              </Edit>
            </TopActions>
          )}
        </Left>
        <Content>
          <Top>
            <UserAndDate>
              <img src={comment.user.image.png} alt="" />
              <span>{comment.user.username}</span>
              {myComment && <span className="you">You</span>}
              <span>{timeSince(new Date(comment.createdAt))} ago</span>
            </UserAndDate>
            {!myComment && (
              <TopActions>
                <Reply onClick={() => setReplyIsOpen(!replyIsOpen)}>
                  <img src="./images/icon-reply.svg" alt="reply icon" />
                  <span >
                    Reply
                  </span>
                </Reply>
              </TopActions>
            )}
            {myComment && (
              <TopActions>
                <Delete
                  onClick={() => {
                    setModalIsOpen(!modalIsOpen);
                  }}
                >
                  <img src="./images/icon-delete.svg" alt="reply icon" />
                  <span>Delete</span>
                </Delete>
                <Edit onClick={() => setEditingMode(!editingMode)}>
                  <img src="./images/icon-edit.svg" alt="reply icon" />
                  <span>Edit</span>
                </Edit>
              </TopActions>
            )}
          </Top>
          {!editingMode && <Bottom>
            <span className="user">
              {comment.replyingTo && "@" + comment.replyingTo}{" "}
            </span>
            {comment.replyingTo === undefined
              ? comment.content
              : comment.content.substring(comment.replyingTo.length +1)}
          </Bottom>}

          {editingMode && <Bottom style={{display:"flex", alignItems:"center", width:"100%", justifyContent:'space-between', flexDirection:"column", boxSizing:'border-box'}}>
            <TextArea style={{minWidth: "100%", height:"100px", fontSize: "14px"}} value={editedCommentData} onChange={(e)=>{setEditedCommentData(e.target.value)}}></TextArea>
            <Send style={{alignSelf: "flex-end" }} onClick={()=>{editComment(parentComment,comment.id, type,editedCommentData); setEditingMode(!editingMode)}}>Update</Send>
          </Bottom>}


        </Content>
      </Container>
      {replyIsOpen && (
        <AddComment
          onSubmit={(event) => {
            addReply(event, parentComment, replyData);
            setReplyIsOpen(!replyIsOpen);
            setReplyData((prev) => {
              return { ...prev, content: `@${comment.user.username}` };
            });
          }}
        >
          <TextArea
            value={replyData.content}
            resizable="false"
            onChange={(e) => updateReply(e)}
          />
          <ImageSend>
            <Image src={user.image.png}></Image>
            <Send type="submit">REPLY</Send>
          </ImageSend>
        </AddComment>
      )}
    </>
  );
};
const Container = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  ${mobile({
    flexDirection: "column-reverse",
  })}
  &:first-of-type {
    margin-bottom: 20px;
  }
  &:last-of-type {
    margin-bottom: 0px;
    margin-top: 10px;
  }
`;
const Left = styled.div`
  padding: 10px;
  ${mobile({
    display: "flex",
    justifyContent: "space-between",
  })}
  .left {
    button {
      display: none;
      ${mobile({
        display: "block",
      })}
    }
  }
`;
const Votes = styled.div`
  display: flex;
  flex-direction: column;
  ${mobile({
    flexDirection: "row",
  })}
  span {
    background: var(--very-light-gray);
    padding: 5px 10px;
    user-select: none;
    ${mobile({
      padding: " 8px 12px",
      marginTop: "5px",
    })}
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--moderate-blue);
    font-weight: bold;
    font-size: 12px;
    &:first-of-type {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      ${mobile({
        borderTopRightRadius: "0px",
        borderBottomLeftRadius: "5px",
      })}
      color: var(--grayish-blue);
      font-size: 14px;
      &:hover {
        background-color: var(--grayish-blue);
        color: #fff;
        cursor: pointer;
      }
    }
    &:last-of-type {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      color: var(--grayish-blue);
      font-size: 14px;
      ${mobile({
        borderTopRightRadius: "5px",
        borderBottomLeftRadius: "0px",
      })}
      &:hover {
        background-color: var(--grayish-blue);
        color: #fff;
        cursor: pointer;
      }
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserAndDate = styled.div`
  display: flex;
  align-items: center;
  .you {
    display: flex;
    padding: 3px 7px;
    margin-left: 7px;
    border-radius: 3px;
    background-color: var(--moderate-blue);
    color: #fff;
    font-size: 10px;
  }
  img {
    width: 30px;
    height: 30px;
    padding: 0px 15px;
  }
  span:first-of-type {
    font-weight: 500;
  }
  span:last-of-type {
    margin-left: 10px;
    font-weight: 300;
    color: var(--dark-blue);
    font-size: 12px;
  }
`;
const TopActions = styled.div`
  display: flex;
  button {
    display: block;
    ${mobile({
      display: "none",
    })}
  }
`;
const Reply = styled.button`
  background-color: transparent;
  border: none;
  color: var(--moderate-blue);
  font-weight: 700;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--light-gray);
    cursor: pointer;
  }
  img {
    width: 9px;
    padding: 0 5px;
  }
`;
const Delete = styled(Reply)`
  color: var(--soft-red);
`;
const Edit = styled(Reply)`
  color: var(--moderate-blue);
`;
const Bottom = styled.div`
  width: 80%;
  padding: 10px 15px 10px 15px;
  word-wrap: break-word;
  .user {
    color: var(--moderate-blue);
    font-weight: bold;
  }
`;
const AddComment = styled.form`
  width: 100%;
  max-width: 600px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 10px;
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

const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBody = styled.div`
  background-color: #fff;
  width: 350px;
  padding: 20px;
  border-radius: 10px;
`;
const Title = styled.h3``;
const Text = styled.p``;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ModalButton = styled.div`
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  width: 30%;
  font-weight: bold;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const CancelButton = styled(ModalButton)`
  background-color: var(--grayish-blue);
`;
const DeleteButton = styled(ModalButton)`
  background-color: var(--soft-red);
`;
