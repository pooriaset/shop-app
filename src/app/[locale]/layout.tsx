import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import RTLProvider from '@/components/common/RTLProvider';
import { globalStyles, theme } from '@/config/theme';
import { AppProvider, ApolloProvider } from '@/providers';
import { Box, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export type WithChildren<T = unknown> = T & { children: React.ReactNode };

export type LocaleLayoutParams = { params: { locale: string } };
type LocaleLayoutProperties = PropsWithChildren<LocaleLayoutParams>;

export const metadata: Metadata = {
  title: 'Shop app',
  description: 'Shop app',
};

export default function LocaleLayout({
  children,
  params: { locale },
}: WithChildren<LocaleLayoutProperties>) {
  return (
    <html lang={locale} dir="rtl">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          <RTLProvider>
            <AppProvider>
              <Header />
              <Box
                sx={{
                  pb: { xs: '56px', md: 0 },
                }}
              >
                <ApolloProvider>{children}</ApolloProvider>
              </Box>
              <Footer />
            </AppProvider>
          </RTLProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}