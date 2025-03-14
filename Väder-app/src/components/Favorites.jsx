import React from 'react';

const Favorites = ({ favorites, onFavoriteClick, removeFavorite }) => {
  return (
    <div>
      <ul>
        {favorites.map((location, index) => (
          <li key={index}>
            <button onClick={() => onFavoriteClick(location)}>{location}</button>
            <button onClick={() => removeFavorite(location)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
