import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';


// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: 'rgba(255, 255, 255, 0.08)',//'#1f232a',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#303030',
        },
    },
    typography: {
        fontFamily: 'Segoe UI'
    },
    overrides: {
        MuiListItem: {
            root: {
                marginRight: '8px',
                '&$selected': {
                    backgroundColor: '#1f232a'
                },

            },
            button: {
                '&:hover': {
                    backgroundColor: '#1f232a'
                }
            }

        },
        MuiListItemText: {
            primary: {
                color: 'lightgray',
                fontSize: '18px',
            },
            secondary: {
                color: 'lightgray',
                fontSize: '14px'
            }
        },
        MuiToolbar: {
            root: {
                minHeight: 35,
                //height: 45,
                alignItems: 'center',
                //paddingTop: theme.spacing(1),
                paddingBottom: '10px',

            },
        },
        MuiAppBar: {
            root: {
                height: 57
            }
        },
        MuiButtonBase: {
            root: {
                padding: '10px',
                color: 'gray'
            }
        }
    }

});

export default theme;
