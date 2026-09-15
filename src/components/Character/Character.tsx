import type { CharacterType } from '../../types';

export function Character({name, status, species, location, image}: CharacterType ) {
    const isLocationUnkown = location.name.toLowerCase() === 'unknown';
    const statusClass = status.toLowerCase();

    return (
       <>
       
            <h2 className = "name">{name}</h2>
            <p className = "species">{species}</p>

            <div className = "image_container">
            <img src={image} alt={`Portrait of ${name}`} className = "character_image"/>
            <span className={`status ${statusClass}`}>{status.toLowerCase()}</span>
            </div>
            <p className = "location">Last seen: {' '}
                {isLocationUnkown ? (
                    <span className = "unknown_location">Unknown</span>
                ) : (
            <span className = "last-seen">{location.name}</span>
        )}
            </p>
 
        </>
    )
}

