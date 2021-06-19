import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#588691' },
      secondary: { main: '#388E3C' },
      error: { main: '#f44336' }
    },
    contrastThreshold: 2,
    tonalOffset: 0.5
})

export default theme;