import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: { main: '#588691' },
      secondary: { main: '#388E3C' }
    },
    contrastThreshold: 2,
    tonalOffset: 0.2
})

export default theme;