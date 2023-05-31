import { Container, Paper, Typography, Avatar, Button, Box  } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Tracklist(props) {

    const {searchResults} = props;
    function handleAddButton() {
        console.log('Track added!');
    }

    const searchLength = searchResults.length > 0;
    return (
        <Container>
            <Paper
                elevation={3}
                sx={{
                margin: '2px',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                width: '750px',
                }}
            >
                <Typography variant="subtitle1" sx={{ width: '50px' }}>#</Typography>
                <Box sx={{ width: '55px' }}></Box>
                <Typography variant="subtitle1" sx={{ width: '225px', textAlign: 'left' }}>Title</Typography>
                <Typography variant="subtitle1" sx={{ width: '225px', textAlign: 'left'  }}>Artist</Typography>
                <Typography variant="subtitle1" sx={{ width: '220px', textAlign: 'left' }}>Album</Typography>
                <Box sx={{ width: '80px' }}></Box>
            </Paper>
            {   !searchLength ? 
                <Paper elevation={3} 
                    sx={{
                        margin: '2px',
                        display: 'flex',
                        flexDirection: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '750px',
                        }}>
                    <Typography variant="subtitle1">No tracks were found</Typography>
                </Paper> :
                searchResults.map((track, i) => (
                    <Paper elevation={3} 
                        sx={{
                            margin: '2px',
                            display: 'flex',
                            flexDirection: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '750px',
                            }}
                        key={track.id}
                        id={track.id}
                    >
                        <Typography variant="h6" sx={{width: '50px'}}>{++i}</Typography>
                        <Avatar alt={track.title} src={track.img} variant="square" />
                        <Typography variant="h6" sx={{paddingLeft: '5px', width: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left'}}>{track.title}</Typography>
                        <Typography variant="h6" sx={{width: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left'}}>{track.artist}</Typography>
                        <Typography variant="h6" sx={{width: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left'}}>{track.album}</Typography>
                        <Button onClick={handleAddButton}>
                            <AddIcon />
                        </Button>
                    </Paper>
                ))
            }
        </Container>
    );
}