import React from "react";
import styled from "styled-components";

const Jersey = ({ fill = '#FF0000', name = 'No Name', number = 0 }) => {
  return (
    <JerseyWrapper>
      <JerseySVG viewBox="0 0 316 183" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M316 66V183H0V66C36.4508 66 66 36.4508 66 0H250C250 36.4508 279.549 66 316 66Z" fill={fill}/>
      </JerseySVG>

      <NameAndNumber>
        <Name>{name || 'No Name'}</Name>
        <Number>{number}</Number>
      </NameAndNumber>
    </JerseyWrapper>
  );
}

const JerseyWrapper = styled.div`
  position: relative;
`;

const JerseySVG = styled.svg`
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const NameAndNumber = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
  color: #FFFFFF;
  font-size: 24px;
  margin-bottom: 8px;
`;

const Number = styled.span`
  color: #FFFFFF;
  font-size: 72px;
  font-weight: 700;
`;

export default Jersey;