import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const BottomSection = () => {
  const t = useTranslations();
  const pages = [
    { label: t('header.navigation.products'), href: '/search' },
    { label: t('header.navigation.categories'), href: '/categories' },
    { label: t('header.navigation.promotions'), href: '/best-selling' },
    { label: t('header.navigation.bestSelling'), href: '/promotion-center' },
  ];

  return (
    <Box
      sx={{
        py: 1,
        display: 'flex',
      }}
    >
      {pages.map((page) => (
        <Button LinkComponent={Link} href={page.href} key={page.label}>
          {page.label}
        </Button>
      ))}
    </Box>
  );
};
export default BottomSection;
