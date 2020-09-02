import { createMuiTheme } from '@material-ui/core/styles';
import Palette from './palette';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      // ref bootstrap breakpoint
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  typography: {
    fontFamily: [
      'PingFangTC',
      'Microsoft JhengHei',
      'system',
      '-apple-system',
      'BlinkMacSystemFont',
      '"PingFang SC"',
      'Helvetica',
      'Arial',
    ].join(','),
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: 'unset',
      },
    },
    MuiDialog: {
      paper: {
        '@media (max-width:768px)': {
          margin: '0 16px 0 16px',
        },
      },
      paperScrollPaper: {
        maxHeight: 'calc(60% - 96px)',
        maxWidth: '560px!important',
        '@media (max-width:768px)': {
          maxHeight: 'calc(90% - 96px)',
        },
      },
    },
    MuiDialogContent: {
      root: {
        backgroundColor: Palette.secondary['gray-80'],
        color: Palette.primary['white-1'],
        '&::-webkit-scrollbar': { width: '7px' },
        '&::-webkit-scrollbar-track': {
          '-webkit-border-radius': '10px',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          '-webkit-border-radius': '4px',
          borderRadius: '4px',
          background: '#212121',
        },
      },
    },

    MuiDialogActions: {
      root: {
        backgroundColor: Palette.secondary['gray-80'],
        padding: '24px 0px',
        textAlign: 'center',
      },
    },

    MuiDrawer: {
      paper: {
        width: 'calc(400px - 50px)',
        padding: '40px 25px',
        backgroundColor: '#202020',
        color: '#FFFFFF',
        fontSize: '14px',
        '@media (max-width:768px)': {
          width: '100%',
          maxWidth: 'calc(320px - 40px)',
          padding: '40px 20px',
        },
        '@media (max-width:368px)': {
          // 扣掉爆米花
          maxWidth: 'calc(85% - 50px)',
        },
      },
    },

    MuiButton: {
      root: {
        margin: 'auto',
        textAlign: 'center',

        // 一般Button
        '&.common-btn': {
          fontSize: '22px',
          width: '230px',
          borderRadius: '30px',
          border: `solid 1px ${Palette.secondary['gray-60']}`,
          backgroundColor: Palette.primary['gray-1'],

          '&.MuiButton-contained': { backgroundColor: Palette.primary['pink-1'], border: 'none' },
          '@media (max-width:768px)': {
            fontSize: '18px',
          },
        },

        // 選優惠檢核的Button
        '&.check-btn': {
          width: '75px',
          height: '44px',
          lineHeight: '10px',
          borderRadius: '22px',
          border: `solid 1px ${Palette.secondary['gray-60']}`,
          fontWeight: 'bold',
          fontSize: '16px',
          '&.MuiButton-contained': { backgroundColor: Palette.primary['pink-1'] },
        },

        // Cupon的Button
        '&.cupon-btn': {
          width: '75px',
          height: '30px',
          lineHeight: '10px',
          borderRadius: '15px',
          border: `solid 1px ${Palette.secondary['gray-60']}`,
          fontWeight: 'bold',
          '&.MuiButton-contained': { backgroundColor: Palette.primary['pink-1'] },
        },

        // Checkout的Button
        '&.checkout-btn': {
          width: '140px',
          height: '44px',
          border: 'none',
          borderRadius: '22px',
          fontSize: '16px',
          backgroundColor: Palette.primary['white-1'],
          '& span': { color: Palette.primary['black-1'] },
          '&.MuiButton-contained': {
            backgroundColor: Palette.primary['pink-1'],
            '& span': { color: Palette.primary['white-1'] },
          },
        },
      },
      label: { color: '#FFFFFF' },
    },

    MuiIconButton: {
      root: {
        fontFamily: 'inherit',
        '&.popcornIcon': {
          position: 'absolute',
          marginTop: '50px',
          right: '400px',
          'z-index': '1500',
          'transition-property': 'all',
          'transition-duration': '.225s',
          'transition-timing-function': 'cubic-bezier(0, 1, 0.5, 1)',
          '@media (max-width:1023px)': {
            right: '0px',
          },
          '@media (max-width:768px)': {
            bottom: '100px',
          },

          '&:before': {
            content: '""',
            position: 'fixed',
            backgroundImage: 'url(../../static/paymentWeb/popcorn.png)',
            borderRadius: 'unset',
            backgroundSize: 'cover',
            height: '50px',
            width: '50px',
            cursor: 'pointer',
          },
          '&.active': {
            right: '400px',
            '@media (max-width:1023px)': {
              right: '400px',
            },

            '@media (max-width:768px)': {
              right: '315px',
            },
            '@media (max-width:368px)': {
              position: 'fixed',
              right: 'calc(85% - 5px)',
            },
          },

          '& .MuiIconButton-label': {
            maxWidth: '120px',
            width: 'unset',
            display: 'block',
            position: 'fixed',
            right: '450px',
            fontSize: '12px',
            textAlign: 'left',
            '& .popcornText': {
              padding: '8px 16px',
              border: '1px solid #5B5B5B',
              borderRadius: '6px',
              backgroundColor: '#5B5B5B',
            },
            '& .arrow': {
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '6px solid #5B5B5B',
              position: 'absolute',
              right: '-6px',
              bottom: '40%',
            },
            '@media (max-width:1023px)': {
              right: '50px',
            },
          },
        },

        '&:hover': { backgroundColor: 'unset' },
      },
      edgeEnd: {
        marginRight: '0px',
      },
    },

    MuiInput: {
      underline: {
        '&:before': { content: '' },
        '&:focus': { outline: 'unset' },
        '&:after': { border: 'unset!important' },
      },
      input: {
        width: 'calc(288px - 32px)', // 減掉Paddding寬度
        height: '44px',
        lineHeight: '44px',
        color: '#FFFFFF',
        borderRadius: '22px',
        backgroundColor: Palette.primary['black-2'],
        padding: '0 16px',
      },
      root: {
        '&.sm, &.sm-fix': { width: 'calc(140px)' },
        '&.default': {
          '& .MuiSelect-select, .MuiSelect-icon': { color: Palette.secondary['gray-60'] },
        },
      },
    },

    MuiSelect: {
      select: {
        width: 'calc(288px - 32px)', // 減掉Paddding寬度
        paddingLeft: '16px',
        borderRadius: '22px',
        backgroundColor: Palette.primary['black-2'],
        fontSize: '16px',
        color: '#FFFFFF',
        '&:focus': {
          borderRadius: '22px',
          backgroundColor: Palette.primary['black-2'],
        },
      },
      selectMenu: {
        height: '44px',
        lineHeight: '44px',
      },
    },
    MuiList: {
      root: {
        maxHeight: '208px',

        '& li.list-mid': {
          display: 'flex !important',
          'justify-content': 'center !important',
        },
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: Palette.primary['black-2'],
        color: '#FFFFFF',
        borderRadius: '8px',
        marginTop: '60px',
      },
      list: {
        '&::-webkit-scrollbar': {
          width: '7px',
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-border-radius': '10px',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          '-webkit-border-radius': '4px',
          borderRadius: '4px',
          backgroundColor: '#212121',
        },
        'overflow-y': 'auto',
        '& li': { '&:hover': { color: Palette.support['pink-1'] } },
      },
    },

    MuiExpansionPanel: {
      root: {
        boxShadow: 'none',
        '&.Mui-expanded': {
          margin: '8px -20px 0px -20px',
          padding: '0px 20px',
          backgroundColor: '#4a4a4a',
        },

        '&:before': { display: 'none' },
      },
    },

    MuiExpansionPanelSummary: {
      root: {
        padding: 0,
        borderBottom: `1px solid ${Palette.support['gray-2']}`,
        '&.Mui-expanded': { border: 'none' },
      },
      content: {
        margin: '18px auto 16px auto',
      },
      expandIcon: {
        '&.Mui-expanded': { transform: 'rotate(0deg)' },
      },
    },

    MuiExpansionPanelDetails: {
      root: { fontSize: '12px', color: '#FFFFFF', padding: '0 0 24px 0' },
    },

    MuiTooltip: {
      tooltip: { fontSize: '12px', padding: '16px', backgroundColor: '#5b5b5b' },
      tooltipPlacementBottom: { margin: '0px!important' },

      popper: {
        marginTop: '4px',

        '&::before': {
          content: '""',
          marginLeft: '13px',
          display: 'block',
          width: 0,
          height: 0,
          borderWidth: '0 3px 3px 3px',
          borderStyle: 'solid',
          borderColor: 'transparent transparent #5b5b5b transparent',
        },
      },
    },
  },
});

export default theme;
