import { useState } from "react"
import WeighIn from "./WeighIn"

type Nav = 'Home' | 'Weigh-in' | 'Workouts' | 'About'

export default function MainContent(): JSX.Element {
    const [nav, setNav] = useState<Nav>('Home')

    const handlePage = (string: Nav) => {
        setNav(string)
    }

    return (
        <>
        <div className="header-container">
        <div className="header">
          <h1>Fitness App💪</h1>
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
       
        {nav === 'Weigh-in' && <WeighIn />}

        </>
    )
}