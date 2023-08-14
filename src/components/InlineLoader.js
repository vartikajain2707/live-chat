

import React from "react"
import { withStyles} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import styled, {keyframes} from "styled-components"

// styles
// const animate=keyframes`
//   0% {
//     background-color: #9880ff;
//   }
//   50%, 100% {
//     background-color: rgba(152, 128, 255, 0.2);
//   }
// `
//
// const Dots = styled.span`
//   //&::after {
//   //  display: inline-block;
//   //  animation: ellipsis 1.25s infinite;
//   //  content: ".";
//   //  width: 2em;
//   //  text-align: left;
//   //}
//   //@keyframes ellipsis {
//   //  0% {
//   //    content: ".";
//   //  }
//   //  33% {
//   //    content: "..";
//   //  }
//   //  66% {
//   //    content: "...";
//   //  }
//   //}
//
//     // position: relative;
//     // width: 5px;
//     // height: 5px;
//     // border-radius: 5px;
//     // background-color: black;
//     // color: black;
//     // animation: ${animate} 0.5s infinite linear alternate;
//     // animation-delay: 0.2s;
//
//   position: relative;
//   width: 10px;
//   height: 10px;
//   border-radius: 5px;
//   background-color: #9880ff;
//   color: #9880ff;
//   animation: dot-flashing 1s infinite linear alternate;
//   animation-delay: 0.5s;
//
//   &::before, &::after {
//     content: "";
//     display: inline-block;
//     position: absolute;
//     top: 0;
//   }
//
//   &::before {
//     // left: -15px;
//     // width: 5px;
//     // height: 5px;
//     // border-radius: 5px;
//     // background-color: black;
//     // color: black;
//     // animation: ${animate} 1s infinite alternate;
//     // animation-delay: 0s;
//
//     left: -15px;
//     width: 10px;
//     height: 10px;
//     border-radius: 5px;
//     background-color: #9880ff;
//     color: #9880ff;
//     animation: dot-flashing 1s infinite alternate;
//     animation-delay: 0s;
//   }
//   &::after {
//     // left: 15px;
//     // width: 5px;
//     // height: 5px;
//     // border-radius: 5px;
//     // background-color: black;
//     // color: black;
//     // animation: ${animate} 1s infinite alternate;
//     // animation-delay: 1s;
//
//     left: 15px;
//     width: 10px;
//     height: 10px;
//     border-radius: 5px;
//     background-color: #9880ff;
//     color: #9880ff;
//     animation: dot-flashing 1s infinite alternate;
//     animation-delay: 1s;
//   }
// `



const styles =makeStyles(theme =>({

    dotFlashing: {
    position: 'relative',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: '#9880ff',
    color: '#9880ff',
    animation: '$dot-flashing 1s infinite linear alternate',
    animationDelay: '0.5s',
        '&::before &::after':{
            content: "",
            display: 'inline-block',
            position: 'absolute',
            top: 0
        },
        '&::before' : {
            left: '-15px',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: '#9880ff',
    color: '#9880ff',
    animation: '$dot-flashing 1s infinite alternate',
    animationDelay: '0s'
        },
        '&::after' : {
            left: '15px',
    width: '10px',
    height: '10px',
    borderRadius:'5px',
    backgroundColor: '#9880ff',
    color: '#9880ff',
    animation:'$dot-flashing 1s infinite alternate',
    animationDelay: '1s'
        }
},
//     dotFlashing::before, dotFlashing::after: {
//     content: "",
//     display: 'inline-block',
//     position: 'absolute',
//     top: 0
// },
//     dotFlashing::before: {
//     left: '-15px',
//     width: 10px;
//     height: 10px;
//     border-radius: 5px;
//     background-color: #9880ff;
//     color: #9880ff;
//     animation: dot-flashing 1s infinite alternate;
//     animation-delay: 0s;
// }
// .dot-flashing::after {
//     left: 15px;
//     width: 10px;
//     height: 10px;
//     border-radius: 5px;
//     background-color: #9880ff;
//     color: #9880ff;
//     animation: dot-flashing 1s infinite alternate;
//     animation-delay: 1s;
// }
//
    '@keyframes dot-flashing' :{
        '0%': {
            backgroundColor: '#9880ff'
        },
        '50% 100%' :{
        backgroundColor: 'rgba(152, 128, 255, 0.2)'
        }
    }
}))
// export default props => {
//     return <div className="dot-flashing"></div>
// }
const InlineLoader = () =>{
    const classes = styles()
    return <div className={classes.dotFlashing}></div>
}

export default InlineLoader
