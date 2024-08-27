import React from 'react';
import { useEffect } from "react";
import { useState } from 'react';
import Track from "./Track"
const Home = () =>{

    const [accessToken, setAccessToken] = useState("");
    const [artistName, setArtistName] = useState("");
    const [topSongs, setTopSongs] = useState([]);
    const [searchTrackIds, setSearchTrackIds] = useState([])
    const [searchString, setSearchString] = useState("")
    const [playlist, setPlaylist] = useState([])
    const cID = process.env.REACT_APP_client_id
    const cCS = process.env.REACT_APP_client_secret
    const st1 = '2MO36OeBtlN5mvtWJonMhR%2C1HSVmNmRkrAyKahBe6Szx2%2C6uE4mbm9sPcAADEdIsmZ0Q%2C1pyE7ePAo9EbGv3WGa8T9S%2C5HBfsevSTE9ifSpqlYY3iH%2C7oclIhQ6E7HKVl8Ln0fKYq%2C6I84oPiNj3y8UXjEW3HsRU%2C3YAbKZu8vQYOg8ddPOBV3T%2C4d9UqQT14Mz705feb5Tjy6%2C0A5E6KNleSwktWbCr8V6CI%2C0lsN5nUamUe7ZFoqW71rAM%2C3RdO6FKB2of4EddE1Uxlpa%2C6LH7nfSTxtKg92IhTBPTxM%2C0tBKcaPhyxFoh4nbwKcxUL%2C4JGtr0YOQSRsGVx3bnRYaZ%2C1DcsNeIZJ3aNISV21Shsfx%2C2z89r2jBe6ksSvzuHRuZhO%2C197atoKDBBqRSUqW0WGcWy%2C2XM9RwCSn2z969j2IfMkfx%2C2tYDMeMShYjdwBDXnpwJQ5%2C6DxStKjUf2Zak4L2YAn4NA%2C1YksA9IgLKGITFqGToMajQ%2C49N13y7lExtKlmoa7Q9sVR%2C0ikCPv56rrnilJpMZjp7us%2C6ZANFu41qXbetq2jRAWwgn'
    const st2 = '2MO36OeBtlN5mvtWJonMhR%2C1HSVmNmRkrAyKahBe6Szx2%2C6uE4mbm9sPcAADEdIsmZ0Q%2C1pyE7ePAo9EbGv3WGa8T9S%2C5HBfsevSTE9ifSpqlYY3iH%2C7oclIhQ6E7HKVl8Ln0fKYq%2C6I84oPiNj3y8UXjEW3HsRU%2C3YAbKZu8vQYOg8ddPOBV3T%2C4d9UqQT14Mz705feb5Tjy6%2C0A5E6KNleSwktWbCr8V6CI%2C0lsN5nUamUe7ZFoqW71rAM%2C3RdO6FKB2of4EddE1Uxlpa%2C6LH7nfSTxtKg92IhTBPTxM%2C0tBKcaPhyxFoh4nbwKcxUL%2C4JGtr0YOQSRsGVx3bnRYaZ%2C1DcsNeIZJ3aNISV21Shsfx%2C2z89r2jBe6ksSvzuHRuZhO%2C197atoKDBBqRSUqW0WGcWy%2C2XM9RwCSn2z969j2IfMkfx%2C2tYDMeMShYjdwBDXnpwJQ5%2C6DxStKjUf2Zak4L2YAn4NA%2C1YksA9IgLKGITFqGToMajQ%2C49N13y7lExtKlmoa7Q9sVR%2C0ikCPv56rrnilJpMZjp7us%2C6ZANFu41qXbetq2jRAWwgn'
    // useEffect(()=> {
    //     getAccessToken();
    // }, []);

    
async function getAccessToken(){
    try{
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': cID,
            'client_secret': cCS
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
        items[0].items.forEach((element) => (
         trackIds.push(element.track.id.toString())
           
        ))
        console.log(trackIds)
        setSearchTrackIds(trackIds);
        const sss = trackIds.join('%2C')
        setSearchString(sss)
    }
    catch {
    alert('error')
  }
};

async function getPlaylist(){
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
        const tracks= [];
        items[0].items.forEach((element) => (
         tracks.push({song: element.track.name, artist: element.track.artists[0].name, album: element.track.album.name})
           
        ))
        console.log(tracks)
        setPlaylist(tracks)
    }
    catch {
    alert('error')
  }
};

//'https://api.spotify.com/v1/tracks?ids=2MO36OeBtlN5mvtWJonMhR%2C1HSVmNmRkrAyKahBe6Szx2%2C6uE4mbm9sPcAADEdIsmZ0Q%2C1pyE7ePAo9EbGv3WGa8T9S%2C5HBfsevSTE9ifSpqlYY3iH%2C7oclIhQ6E7HKVl8Ln0fKYq%2C6I84oPiNj3y8UXjEW3HsRU%2C3YAbKZu8vQYOg8ddPOBV3T%2C4d9UqQT14Mz705feb5Tjy6%2C0A5E6KNleSwktWbCr8V6CI%2C0lsN5nUamUe7ZFoqW71rAM%2C3RdO6FKB2of4EddE1Uxlpa%2C6LH7nfSTxtKg92IhTBPTxM%2C0tBKcaPhyxFoh4nbwKcxUL%2C4JGtr0YOQSRsGVx3bnRYaZ%2C1DcsNeIZJ3aNISV21Shsfx%2C2z89r2jBe6ksSvzuHRuZhO%2C197atoKDBBqRSUqW0WGcWy%2C2XM9RwCSn2z969j2IfMkfx%2C2tYDMeMShYjdwBDXnpwJQ5%2C6DxStKjUf2Zak4L2YAn4NA%2C1YksA9IgLKGITFqGToMajQ%2C49N13y7lExtKlmoa7Q9sVR%2C0ikCPv56rrnilJpMZjp7us%2C6ZANFu41qXbetq2jRAWwgn'
//2MO36OeBtlN5mvtWJonMhR%21HSVmNmRkrAyKahBe6Szx2%26uE4mbm9sPcAADEdIsmZ0Q%21pyE7ePAo9EbGv3WGa8T9S%25HBfsevSTE9ifSpqlYY3iH%27oclIhQ6E7HKVl8Ln0fKYq%26I84oPiNj3y8UXjEW3HsRU%23YAbKZu8vQYOg8ddPOBV3T%24d9UqQT14Mz705feb5Tjy6%20A5E6KNleSwktWbCr8V6CI%20lsN5nUamUe7ZFoqW71rAM%23RdO6FKB2of4EddE1Uxlpa%26LH7nfSTxtKg92IhTBPTxM%20tBKcaPhyxFoh4nbwKcxUL%24JGtr0YOQSRsGVx3bnRYaZ%21DcsNeIZJ3aNISV21Shsfx%22z89r2jBe6ksSvzuHRuZhO%2197atoKDBBqRSUqW0WGcWy%22XM9RwCSn2z969j2IfMkfx%22tYDMeMShYjdwBDXnpwJQ5%26DxStKjUf2Zak4L2YAn4NA%21YksA9IgLKGITFqGToMajQ%249N13y7lExtKlmoa7Q9sVR%20ikCPv56rrnilJpMZjp7us%26ZANFu41qXbetq2jRAWwgn
async function getSongInfo(){

    try{
        const sss = searchTrackIds[0]
        console.log(searchTrackIds[0])
        var fixedstring = decodeURIComponent(escape(sss));
        console.log(fixedstring)
        const nURL = new URL ('https://api.spotify.com/v1/tracks/' + fixedstring)
        const response = await fetch(nURL, {
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



async function getTopSongs(){

    try{
        console.log(searchString)
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?offset=0', {
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
       <button onClick={getPlaylist}>Get Playlist Ids</button>
       <button onClick={getSongInfo}>Get Song Info</button>
       <button onClick={getTopSongs}>Get Top Songs</button>
       {playlist.map((song) =>
            <Track song={song.song}
            artist={song.artist}
            album={song.album}/>
        )}
 
    </main>
  );
  };
  export default Home;