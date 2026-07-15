import { useState } from "react";

interface Origin {
    name: string,
    url: string
}

interface CardProps {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: Origin,
    location: Origin,
    image: string,
    episode: string[];
}

export function Character({name, status, species, type, gender, origin, location, image, episode}: CardProps ) {
    const episodeNumbers = episode.map(url => url.split('/').pop() || '');
    const formattedEpisodes = episodeNumbers.join(', ');
    const isOriginUnkown = origin.name.toLowerCase() === 'unknown';
    const isLocationUnkown = location.name.toLowerCase() === 'unknown';
    const [isEpisodesExpanded, setIsEpisodesExpanded] = useState(false);
    const statusClass = status.toLowerCase();

    return (
       <>
       
            <h1 className = "name">{name}</h1>
            <p className = "species">{species}</p>
        
           
           {/*
            <p className = "type">{type}</p>
           <p className = "gender">{gender}</p>
            <p>Впервые замечен:{' '}
                {isOriginUnkown ? (
                    <span className = "uknown-style">Неизвестно</span>
                ) : (
            <a className = "first-seen" href = {origin.url}>{origin.name}</a>
            )}
            
            </p>*/}
            <div className = "image_container">
            <img src={image} alt="Изображение персонажа" className = "character_image"/>
            <span className={`status ${statusClass}`}>{status.toLowerCase()}</span>
            </div>
            <p>Last seen: {' '}
                {isLocationUnkown ? (
                    <span className = "uknown_style">Unknown</span>
                ) : (
            <a className = "last-seen" href = {location.url}>{location.name}</a>
        )}
            </p>
        {/* 
        {episode.length > 0 && (
            <p className={"episode" + (isEpisodesExpanded ? ' expanded' : '')} 
            onClick={() => setIsEpisodesExpanded(!isEpisodesExpanded)}
            title={isEpisodesExpanded ? "Свернуть" : "Показать все эпизоды"}>Можно встретить в эпизоде: {formattedEpisodes}</p>
            )}
            */}
        </>
    )
}

