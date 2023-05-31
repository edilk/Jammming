import { Avatar, Container, Paper, TextField, Typography, Button, ThemeProvider } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { theme } from "./SearchBar";

export default function Playlist(props) {

    const {playlistName, setPlaylistName, playlist, setPlaylist, onClick } = props;
    const isPlaylistEmpty = playlist.length < 1;

    function handleRemove(current) {
        const next = playlist.filter(track => {
            return current.id !== track.id;
        });

        setPlaylist(next);
    
    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
        
        }}>
            <TextField
                hiddenLabel
                required
                id="filled-hidden-label-small"
                defaultValue={playlistName}
                variant="filled"
                size="small"
                sx={{
                    width: '370px'
                }}
                onChange={(event) => {
                    setPlaylistName(event.target.value);
                }}  
            />
            {
                isPlaylistEmpty ? <Paper sx={{
                    width: '370px',
                    marginTop: '5px'
                }}>
                    <Typography variant="subtitle1">No track is added yet</Typography>
                </Paper> : playlist.map((track, i) => {
                    return (
                        <Paper 
                            id={track.id} 
                            key={track.id}
                            elevation={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '370px',
                                marginTop: '2px'
                            }}>
                            <Typography variant="h6" sx={{width: '50px'}}>{++i}</Typography>
                            <Avatar variant="square" src={track.img}></Avatar>
                            <div className="play-list-title">
                                <Typography variant="h6" sx={{lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{track.title}</Typography>
                                <Typography variant="subtitle1" sx={{lineHeight: '1.1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{track.artist + ' | ' + track.album}</Typography>
                            </div>
                            <Button onClick={() => {
                                handleRemove(track);
                            }}>
                                <RemoveIcon />
                            </Button>
                        </Paper>
                    );
                })
            }
            <ThemeProvider theme={theme}>
                    <Button 
                        variant="contained"
                        color="success"
                        sx={{
                            mt: '8px',
                            borderRadius: '20px',
                            marginLeft: '95px'
                        }}
                        onClick={onClick}
                        >
                        Save To Spotify
                    </Button>
                </ThemeProvider>
        </Container>
    );
}