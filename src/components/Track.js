import React from 'react';

const Track = ({song, artist, album}) =>{

    return(
        <div>{song}, {artist}, {album}</div>
    )
}

export default Track;