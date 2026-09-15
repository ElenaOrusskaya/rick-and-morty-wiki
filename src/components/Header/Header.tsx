import { Navigation } from '../Navigation/Navigation';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

export function Header() {
    return (
        <>
        <header className= {styles.headerContainer}>
            <div className = {styles.titleContainer}>
                <div className = {styles.title}>
                    <Link to="/">Rick&Morty 
                    <span className= {styles.extraTitle}>WiKi</span>
                    </Link>
                </div>
            </div>
        <Navigation />
        </header>
        </>
    )
}
