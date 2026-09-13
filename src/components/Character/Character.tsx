import { useState } from "react";

interface Origin {
    name: string,
    url: string
}

interface CardProps {
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    location: Origin,
    image: string;
}

export function Character({name, status, species, location, image}: CardProps ) {
    const isLocationUnkown = location.name.toLowerCase() === 'unknown';
    const statusClass = status.toLowerCase();

    return (
       <>
       
            <h1 className = "name">{name}</h1>
            <p className = "species">{species}</p>

            <div className = "image_container">
            <img src={image} alt="Изображение персонажа" className = "character_image"/>
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

