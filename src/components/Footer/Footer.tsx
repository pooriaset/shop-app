import { Box } from '@mui/material';
import { FC } from 'react';
import DesktopView from '../ResponsiveDesign/components/DesktopView';
import MobileView from '../ResponsiveDesign/components/MobileView';
import { DesktopFooter, MobileFooter } from './components';
import { IPageListItem } from '@/graphql/types/common';

export interface FooterProps {
  pages: IPageListItem[];
}
const Footer: FC<FooterProps> = ({ pages }) => {
  return (
    <Box mt={2}>
      <MobileView>
        <MobileFooter />
      </MobileView>
      <DesktopView>
        <DesktopFooter pages={pages} />
      </DesktopView>
    </Box>
  );
};

export default Footer;
