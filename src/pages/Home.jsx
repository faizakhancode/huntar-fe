import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
        <header>
            <h1>ScavengAR</h1> 
        </header>
        <section>
            <ul>
                <li><button>Create New Game</button></li>
                <li><form>
                    <label for="game_id">Game ID</label>
                    <input name="game_id" type="text"></input>
                    <button>Join Game</button>
                    </form></li>
                <li><p>New to ScavengAR? <br /> More info</p></li>
            </ul>
        </section>
    </main>
  )
}
