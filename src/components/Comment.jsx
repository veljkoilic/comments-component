import React from "react";
import styled from "styled-components";

export const Comment = ({comment}) => {
  return (
    <Container className="container">
      <Left>
        <Votes>
          <span>+</span>
          <span>{comment.score}</span>
          <span>-</span>
        </Votes>
      </Left>
      <Content>
        <Top>
          <UserAndDate>
            <img src={comment.user.image.png} alt="" />
            <span>{comment.user.username}</span>
            <span>{comment.createdAt}</span>
          </UserAndDate>
          <TopActions>
            <Reply>Reply</Reply>
          </TopActions>
        </Top>
        <Bottom>
            {comment.content}
        </Bottom>
      </Content>
    </Container>
  );
};

const Container = styled.div`
display:flex;
width: 100%;
min-width: 400px;
max-width: 600px;
background-color: #fff;
border-radius: 5px;
padding: 20px;
margin-top: 10px;
`;
const Left = styled.div``;
const Votes = styled.div`
display: flex;
flex-direction: column;
`;
const Content = styled.div`
display: flex;
flex-direction: column;
`;
const Top = styled.div`
display: flex;
justify-content: space-between;
`;
const UserAndDate = styled.div`

`;
const TopActions = styled.div``;
const Reply = styled.button``;
const Bottom = styled.div``;

