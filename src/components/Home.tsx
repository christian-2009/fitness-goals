import axios from 'axios'
import {useEffect, useState} from 'react'
import { baseUrl } from '../utils/URL'

interface WeightData {
    weight: string;
    id: number;
    dates: Date;
    type: string
  }

export default function Home(props: {weights: WeightData[]}): JSX.Element {

    const weights = props.weights.length > 0 ? props.weights : null

    function getImprovement(oldNum: number, newNum: number){
        const percentageDiff = Math.round((((newNum - oldNum)/oldNum)*100)*100)/100

        if (percentageDiff < 0){
            return `You are ${-1*percentageDiff}% lighter!`
        }else {
            return `You are ${percentageDiff}% heavier!`
        }
    }

   
    console.log(props.weights)


    return (
        <>
        <div className ='homepage-container'>
        <h1>Keep Fit</h1>
        <h3>The key to keeping consistent</h3>
        {weights && <><p>Current Weight: {weights[0].weight}kg</p><br/>
        <p>{getImprovement(parseInt(weights[0].weight),parseInt(weights[1].weight))}</p></>}

        </div>
        </>
    )
}