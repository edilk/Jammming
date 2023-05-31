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
	const [accessToken, setAccessToken] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const CLIENT_ID = "181842b370ba40c4b78c6ebb9ddad7fa";
	const CLIENT_SECRET = "df2e6789eee248d0ab89ed99669fa8d3";

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
                .then(data => setAccessToken(data.access_token));
	}, [])

	async function search() {
		console.log(`Searching for: ${searchInput}`);
		console.log('My token: ' + accessToken);

		const baseUrl = `https://api.spotify.com/v1/search?type=track&q=${searchInput}`;
		let requestParams = {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		}

		await fetch(baseUrl, requestParams)
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
				justifyContent: 'center'
			}}>
				<SearchResults searchResults={searchResults}></SearchResults>
				<Playlist></Playlist>
			</Box>
		</main>
    </div>
  );
}

export default App;
