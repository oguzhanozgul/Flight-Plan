import { ButtonStylesParams, MantineProvider } from '@mantine/core'
import { PropsWithChildren, ReactNode } from 'react'


export const MantineThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        colors: {
          orange: ["#E46846"],
        },
        components: {
          Button: {
            styles: (theme, params: ButtonStylesParams) => ({
              root: {
                height: 48,
                borderRadius: "12px",
                padding: '8px 16px',
                backgroundColor: theme.colors.orange,
                "&:hover": {
                  backgroundColor: theme.colors.yellow,
                  borderColor: theme.colors.yellow,
                }
              },
            }),
          },
        }
      }
      }
    >
      {children}
    </MantineProvider>
  )
}

export default MantineThemeProvider;