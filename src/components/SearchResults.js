import { Grid, Typography } from "@mui/material";
import Tracklist from "./Tracklist";

export default function SearchResults(props) {
    const {searchResults} = props;
    return (
        <Grid container spacing={2} justifyContent={"center"}
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            <Typography variant='h3'>Results</Typography>
            <Tracklist searchResults={searchResults}></Tracklist>
        </Grid>
    );
}