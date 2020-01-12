import React, { useState, useEffect } from 'react';
import '../styles/ProgressBall.scss';

function ProgressBall(props) {
    function initBall(val){
        var colorInc = 100 / 3;
        let that = document.querySelector(".percent");
        let water = document.querySelector(".water");
        if(that == null)
            return;
        var valOrig = props.val;
        
        // if (valOrig == 0) {
        //     that.textContent =  0 + "%";
        // } 
        // else that.textContent = valOrig + "%";
    
        that.parentElement.parentElement.classList.remove("red");
        that.parentElement.parentElement.classList.remove("orange");
        that.parentElement.parentElement.classList.remove("green");
        water.style.top = (100 - props.val) +"%";
        
        if (valOrig < colorInc * 1) 
            that.parentElement.parentElement.classList.add("red");
        else if (valOrig < colorInc * 2)
            that.parentElement.parentElement.classList.add("orange");
        else
            that.parentElement.parentElement.classList.add("green");
    }

    const style = {
        position: 'absolute',
        top: '-50px',
        left: '-100px',
        transform: 'scale(0.7)'
    }


    return (
        <div class={100-props.val > 33 ? (100-props.val > 66 ? 'red' : 'orange') : 'green' } style={style}>
            <div class="progress" >
                <div class="inner">
                    <div class="percent">{`${props.val}%`}</div>
                    <div class="water" style={{top: `${100 - props.val}%`}}></div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBall;