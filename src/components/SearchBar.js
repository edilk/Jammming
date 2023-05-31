import { Button, Container, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
}));

const theme = createTheme({
    palette: {
        success: {
            main: '#1DB954',
            contrastText: 'white'
        }
    }
})

export default function SearchBar(props) {

    const {setSearchInput, search} = props;

    function handleInput(event) {
		setSearchInput(event.target.value);
    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right'
        }}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
				onChange={handleInput}
                />
            </Search>
                <ThemeProvider theme={theme}>
                    <Button 
                        variant="contained"
                        color="success"
                        sx={{
                            marginLeft: '20px',
                            borderRadius: '20px'
                        }}
                        onClick={search}>
                        Search
                    </Button>
                </ThemeProvider>
        </Container>
    );
}