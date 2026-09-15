import {NavLink} from 'react-router-dom';
import styles from './Navigation.module.scss';

export function Navigation() {
return (
    <>
    <nav className = {styles.navContainer} aria-label="Main navigation">
        <ul className = {styles.navList}>
            <li className = "nav_item">
                <NavLink 
                to ="/" 
                end 
                className={({ isActive }) => (isActive ? styles.active : '')}>
                    Characters
                </NavLink>
            </li>
            <li className = "nav_item">
                <NavLink to="/episodes"
                className={({ isActive }) => (isActive ? styles.active : '')}>
                    Episodes
                </NavLink>
            </li>
            <li className = "nav_item">
                <NavLink to="/location"
                className={({ isActive }) => (isActive ? styles.active : '')}>
                    Location
                </NavLink>
            </li>
        </ul>
        </nav>
    </>
)
}
