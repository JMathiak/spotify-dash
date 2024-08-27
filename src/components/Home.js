import React from 'react';
import { useEffect } from "react";
import { useState } from 'react';

const Home = () =>{

    const [accessToken, setAccessToken] = useState("");
    const [artistName, setArtistName] = useState("");
    const [topSongs, setTopSongs] = useState([]);
    const [searchTrackIds, setSearchTrackIds] = useState([])
    const [searchString, setSearchString] = useState("")

    // useEffect(()=> {
    //     getAccessToken();
    // }, []);

    
async function getAccessToken(){
    try{
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': '',
            'client_secret': ''
        })
    });
      const info = await response.json()
      console.log(info)
     setAccessToken(info.access_token)
    }
   catch {
    alert ("error");
  
  }
  }


  async function getArtist(){
    try{
        const response = await fetch('https://api.spotify.com/v1/artists/0hp58JplihFjlLstUbKS0x?si=8L41i_A1QUaDfBpb0-38mA', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const info = await response.json()
        setArtistName(info.name)
    }
    catch{
        alert("error");
    }
  }

  async function getPlaylistIds(){
    setAccessToken("BQBuxg1UfY_lSTcoPernuU9RKem018J5F1c4O9lRIuh7T3Lyo9…irlr29kIP3UgKaGj-QovNQDymYmnaDbm0e_O1RJAR0bLypZRU")
    const auth = 'Bearer ' + accessToken;
    try{
        const response = await fetch('https://api.spotify.com/v1/playlists/3jWuC6rwwAztl0FErBcKrg', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const info = await response.json()
        const items = [info.tracks];
        console.log(items[0].items)
        const trackIds = [];
        items[0].items.forEach((element) => 
        trackIds.push(element.track.id)
        )
        console.log(trackIds)
        setSearchTrackIds(trackIds);
        setSearchString(trackIds.join('%2'))
    }
    catch {
    alert('error')
  }
};

async function getSongInfo(){

    try{
        console.log(searchString)
        const response = await fetch('https://api.spotify.com/v1/tracks/2MO36OeBtlN5mvtWJonMhR', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        const info = await response.json()
        console.log(info)
        
    }
    catch (err) {
        console.log(err)
    }
}


  return(
    <main className='home'>
        <button onClick={getAccessToken}> Get Access</button>
       <button onClick={getPlaylistIds}>Get Playlist Ids</button>
       <button onClick={getSongInfo}>Get Song Info</button>

    </main>
  );
  };
  export default Home;