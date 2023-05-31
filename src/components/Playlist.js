import { Container, TextField } from "@mui/material";

export default function Playlist() {
    return (
        <Container>
            <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="Small"
                variant="filled"
                size="small"
            />
        </Container>
    );
}