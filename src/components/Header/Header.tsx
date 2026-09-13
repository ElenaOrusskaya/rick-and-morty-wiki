import { Navigation } from '../Navigation/Navigation';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

export function Header() {
    return (
        <>
        <header className= {styles.headerContainer}>
            <div className = {styles.titleContainer}>
                <h1 className = {styles.title}>
                    <Link to="/">Rick&Morty 
                    <span className= {styles.extraTitle}>WiKi</span>
                    </Link>
                </h1>
            </div>
        <Navigation />
        </header>
        </>
    )
}