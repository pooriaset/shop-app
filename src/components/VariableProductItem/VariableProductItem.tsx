import { Box, Card, CardContent, Typography } from '@mui/material';

import { useAppContext } from '@/hooks/useAppContext';
import {
  extractNumbers,
  getMinOfRangePrice,
  getProfitPercentage,
} from '@/utils/price';
import Link from 'next/link';
import { FC } from 'react';
import DiscountPercentage from '../common/DiscountPercentage';
import Image from '../common/Image';
import OldPrice from '../common/OldPrice';
import PriceLabel from '../common/PriceLabel';
import { VariableProduct } from './types';
import { StockStatusEnum } from '@/graphql/types/graphql';
import OutOfStock from '../common/OutOfStock';

export interface ProductItemProps {
  data: VariableProduct;
}

const VariableProductItem: FC<ProductItemProps> = ({ data }) => {
  const { isMobile } = useAppContext();

  const size = isMobile ? 120 : 240;

  const profitMarginPercentage = getProfitPercentage(
    extractNumbers(getMinOfRangePrice(data.price)),
    extractNumbers(data.regularPrice),
  );

  const outOfStock = data.stockStatus === StockStatusEnum.OutOfStock;

  return (
    <Card
      component={Link}
      href={`/products/${data.databaseId}/${data.slug}`}
      sx={{
        display: 'block',
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': {
            paddingBottom: (theme) => `${theme.spacing(2)}`,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: 1,
          }}
        >
          <Image
            height={size}
            width={size}
            src={data.image?.sourceUrl as string}
            alt="Product Image"
            style={{
              objectFit: 'contain',
              display: 'block',
              width: isMobile ? 120 : '100%',
            }}
          />
          {!isMobile && <Box mt={3} />}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {data.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'top',
                justifyContent: data.onSale ? 'space-between' : 'end',
                mt: 1,
              }}
            >
              {outOfStock ? (
                <OutOfStock />
              ) : (
                <>
                  {data.onSale && (
                    <DiscountPercentage value={profitMarginPercentage} />
                  )}

                  <Box>
                    <PriceLabel value={data.price} />
                    {data.regularPrice !== data.price && (
                      <OldPrice value={data.regularPrice} />
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VariableProductItem;