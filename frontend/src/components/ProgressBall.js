import React, { useState, useEffect } from 'react';
import '../styles/ProgressBall.scss';

function ProgressBall() {
    function initBall(val){
        var colorInc = 100 / 3;
        let that = document.querySelector(".percent");
        let water = document.querySelector(".water");
        if(that == null)
            return;
        var valOrig = val;
        
        if (valOrig == 0) {
            that.textContent =  0 + "%";
        } 
        else that.textContent = valOrig + "%";
    
        that.parentElement.parentElement.classList.remove("red");
        that.parentElement.parentElement.classList.remove("orange");
        that.parentElement.parentElement.classList.remove("green");
        water.style.top = (100 - val) +"%";
        
        if (valOrig < colorInc * 1) 
            that.parentElement.parentElement.classList.add("red");
        else if (valOrig < colorInc * 2)
            that.parentElement.parentElement.classList.add("orange");
        else
            that.parentElement.parentElement.classList.add("green");
    }
    useEffect(() => {
        let val = 75;
        initBall(val);
    });

    return (
        <div class="green">
            <div class="progress">
                <div class="inner">
                    <div class="percent"><span>67</span>%</div>
                    <div class="water"></div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBall;