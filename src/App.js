import React, { useEffect, useState } from 'react';
import { AppBar, Box, Container, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'; 
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import './App.css';
import './main.css'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

const theme = createTheme({
  palette: {
    primary: {
      main: '#191414'
    }
  }
});

function App() {

	const [searchInput, setSearchInput] = useState('');
	const [anotherAccessToken, setAnotherAccessToken] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [playlist, setPlaylist] = useState([]);
	const [playlistName, setPlaylistName] = useState('New Playlist');

	const CLIENT_ID = "181842b370ba40c4b78c6ebb9ddad7fa";
	const CLIENT_SECRET = "df2e6789eee248d0ab89ed99669fa8d3";
	const redirectUri = 'http://localhost:3000/';
	let accessToken = '';

	function getAccessToken() {
		if(accessToken) {
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);
			window.setTimeout(() => accessToken='', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	}

	useEffect(() => {
		const baseUrl = 'https://accounts.spotify.com/api/token';
        let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
     		fetch(baseUrl, authParameters)
                .then(result => result.json())
                .then(data => {
					setAnotherAccessToken(data.access_token)
					console.log(data)});
	}, []);

	function search() {

		console.log(anotherAccessToken);
		const baseUrl = `https://api.spotify.com/v1/search?type=track&q=${searchInput}&limit=50`;
		let requestParams = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + anotherAccessToken
			}
		}

		fetch(baseUrl, requestParams)
			.then(response => {
				if (response.ok) {
					return response.json();
				} 
			})
			.then(data => {
				console.log(data);
				setSearchResults(data.tracks.items.map(track => ({
					id: track.id,
					title: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
					img: track.album.images[2].url
				})));
			})
	}

	function saveToSpotify() {

		const accessToken = getAccessToken();

		console.log(accessToken);
		
		const apiUrl = 'https://api.spotify.com/v1/me';
		const headers = {
			Authorization: `Bearer ${accessToken}`};
		let user_id;

		const tracksUris = playlist.map(track => track.uri);

		fetch(apiUrl, {headers: headers})
		.then(response => response.json())
		.then(data => {
			user_id = data.id;
			return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
				headers: headers,
				method: 'POST',
				body: JSON.stringify({name: playlistName})})
				.then(response => response.json())
				.then(data => {
					const playlist_id = data.id;
					return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
						headers: headers,
						method: 'POST',
						body: JSON.stringify({uris: tracksUris})
					});
				});
		});

		setPlaylistName('New Playlist');
		setPlaylist([]);
	}

  	return (
    <div className="App">
      	<ThemeProvider theme={theme}>
        	<AppBar position='fixed'>
          		<Toolbar sx={{
					width: '90%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					margin: 'auto'
				}}>
					<Container sx={{
						display: 'flex',
						flexDirection: 'row'
					}}>
						<LibraryMusicOutlinedIcon sx={{marginRight: '20px'}} />
						<Typography variant='h6'>Jammming</Typography>
					</Container>
            		<SearchBar setSearchInput={setSearchInput} search={search}></SearchBar>
          		</Toolbar>
        	</AppBar>
      	</ThemeProvider>
      	<main>
			<Box sx={{
				pt: '100px',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'start'

			}}>
				<SearchResults 
					searchResults={searchResults}
					playlist={playlist}
					setPlaylist={setPlaylist}></SearchResults>
				<Playlist 
					playlistName={playlistName}
					setPlaylistName={setPlaylistName}
					playlist={playlist}
					setPlaylist={setPlaylist}
					onClick={saveToSpotify}></Playlist>
			</Box>
		</main>
		<footer>
			<Typography variant='subtitle1' sx={{color: 'white'}}>&copy; Edil Kamchybekov - 2023</Typography>
		</footer>
    </div>
  );
}

export default App;
