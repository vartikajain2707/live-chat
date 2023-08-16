import React from "react"
import styled, {keyframes} from "styled-components"

const animate=keyframes`
  0% {
    background-color: black;
  }
  50%, 100% {
    background-color: lightgray;
  }
`

const Dots = styled.span`
  position: absolute;
  left: 17px;
  top: 18px;
  width: 4px;
  height: 4px;
  border-radius: 5px;
  background-color: black;
  color: black;
  animation: ${animate} 0.5s infinite linear alternate;
  animation-delay: 0.25s;

  &::before, &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -11px;
    width: 4px;
    height: 4px;
    border-radius: 5px;
    background-color: black;
    color: black;
    animation: ${animate} 0.5s infinite alternate;
    animation-delay: 0s;
  }
  &::after {
    left: 11px;
    width: 4px;
    height: 4px;
    border-radius: 5px;
    background-color: lightgray;
    color: lightgray;
    animation: ${animate} 0.5s infinite alternate;
    animation-delay: 0.5s;
  }
`


export default props => {
    return <Dots />
}
