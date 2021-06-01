import React from 'react'
import './SortingVisualizer.css'
import {mergeSort} from '../SortingAlgorithm/sortingAlgorithm'
import {bubbleSort} from '../SortingAlgorithm/bubbleSort'
import {quickSort} from '../SortingAlgorithm/quickSort'

const ANIMATION_SPEED_MS = 3;


const PRIMARY_COLOR = 'turquoise';

const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            array:[]
        };
    }

    componentDidMount(){
        this.resetArray();
        
    }

    resetArray(){
        const array=[];

        for(let i=0;i<80;i++)
        {
            array.push(randomint(20,1000));
        }

        this.setState({array});
        
        //console.log(array);
    }

    mergeSort() {
        const animations = mergeSort(this.state.array);
        //console.log(animations);
        var t0=performance.now();
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
            
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
             
              //console.log(newHeight);
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
        var t1=performance.now();
        console.log("time taken "+(t1-t0)+"milliseconds");
      }

      bubbleSort(){

        const animations=bubbleSort(this.state.array);

        //console.log(animations);

        const arr=document.getElementsByClassName('array-bar');

        var t0=performance.now();
        
        for(let i=0;i<animations.length;i++)
        {
        

        setTimeout(()=>{
              const [barOneIdx, height1] = animations[i];
              const [barTwoIdx,height2]=animations[i+1];
          
            arr[barOneIdx].style.height=`${height1}px`;
            arr[barTwoIdx].style.height=`${height2}px`;
        },i*ANIMATION_SPEED_MS);
        
        }

       var t1=performance.now();

        console.log("time taken "+(t1-t0)+"milliseconds");

    }

    quickSort(){
        const animations=quickSort(this.state.array);

        //console.log(animations);

        const arr=document.getElementsByClassName('array-bar');

        var t0=performance.now();
        
        for(let i=0;i<animations.length;i=i+2)
        {
            setTimeout(()=>{
            const [barOneIdx,height1]=animations[i];
            const [barTwoIdx,height2]=animations[i+1];

            arr[barOneIdx].style.height=`${height1}px`;
            arr[barTwoIdx].style.height=`${height2}px`;
            },i*ANIMATION_SPEED_MS);
        }
        var t1=performance.now();
        console.log("time taken "+(t1-t0)+"milliseconds");

    }

    render() {

        const {array}=this.state;

        return (
            
            <div className="array-container">

            {array.map((value,idx)=>(
                <div 
                className="array-bar"
                key={idx}
                style={{height: `${value}px`}}>

                </div>
            ))}

            <button onClick={()=>this.resetArray()}>Generate New Array</button>
            <button onClick={()=>this.mergeSort()}>Merge Sort</button>
            <button onClick={()=>this.bubbleSort()}>Bubble Sort</button>
            <button onClick={()=>this.quickSort()}>Quick Sort</button>
            

            </div>
        )
    }
}

function randomint(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// function arraysequal(arr1,arr2)
// {
//     if(arr1.length!==arr2.length)
//     {
//         return false;
//     }

    

//     for(let i=0;i<arr1.length;i++)
//     {
       

//         if(arr1[i]!==arr2[i])
//         {
//             return false;
//         }
//     }
//     return true;
// }
