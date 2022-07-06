import React from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

export const Comment = ({ comment, type }) => {
  console.log(type);
  return (
    <Container
      className="container"
      style={type === "reply" ? { minWidth: "200px", maxWidth: "500px" } : { minWidth: "300px", maxWidth: "600px" }}
    >
      <Left>
        <Votes>
          <span>+</span>
          <span>{comment.score}</span>
          <span>-</span>
        </Votes>
        <TopActions className="left">
          <Reply>
            <img src="./images/icon-reply.svg" alt="reply icon" />
            <span>Reply</span>
          </Reply>
        </TopActions>
      </Left>
      <Content>
        <Top>
          <UserAndDate>
            <img src={comment.user.image.png} alt="" />
            <span>{comment.user.username}</span>
            <span>{comment.createdAt}</span>
          </UserAndDate>
          <TopActions>
            <Reply>
              <img src="./images/icon-reply.svg" alt="reply icon" />
              <span>Reply</span>
            </Reply>
          </TopActions>
        </Top>
        <Bottom>{comment.content}</Bottom>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 20px;
  margin-top: 10px;
  background-color: #fff;
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
  .left{
  button{
    display: none;
    ${mobile({
      display: "block"
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
    ${mobile({
      padding:" 8px 12px",
      marginTop: "5px"
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
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserAndDate = styled.div`
  display: flex;
  align-items: center;
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
  button{
    display: block;
    ${mobile({
      display: "none"
    })}
  }

`;
const Reply = styled.button`
  background-color: #fff;
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
const Bottom = styled.div`
  padding: 10px 15px 0px 15px;
`;
