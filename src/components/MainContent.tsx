import { useState, useEffect } from "react"
import Home from "./Home"
import WeighIn from "./WeighIn"
import {baseUrl} from '../utils/URL'
import axios from 'axios'

type Nav = 'Home' | 'Weigh-in' | 'Workouts' | 'About'

interface WeightData {
    weight: string;
    id: number;
    dates: Date;
    type: string
  }

export default function MainContent(): JSX.Element {
    const [nav, setNav] = useState<Nav>('Home')
    const [weights, setWeights] = useState<WeightData[]>([])

    const handlePage = (string: Nav) => {
        setNav(string)
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(baseUrl + "/weights")
          const weightData: WeightData[] = await response.data
          setWeights(weightData)
            };
        
        fetchData();
      }, []);

    return (
        <>
        <div className="header-container">
        <div className="header">
          <h1>Keep Fit 💪</h1>
        </div>
        <div className = 'navbar'>
        <ul className = 'navbar--list'>
            <li className = 'navbar--list-item' onClick = {() => handlePage('Home')}>Home</li>
            <li className = 'navbar--list-item' onClick = {() => handlePage('Weigh-in')}>Weigh-in</li>
            <li className = 'navbar--list-item' onClick = {() => handlePage('Workouts')}>Workouts</li>
            <li className = 'navbar--list-item' onClick = {() => handlePage('About')}>About</li>
        </ul>
        </div>
        </div>
        {nav === 'Home' && <Home weights={weights}/>}
        {nav === 'Weigh-in' && <WeighIn />}

        </>
    )
}