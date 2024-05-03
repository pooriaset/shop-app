'use client';

import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { VariableProductItem } from '../VariableProductItem';
import { GetAllProductsQuery } from '@/graphql/types/graphql';

export interface BestSellingProductsProps {
  items?: NonNullable<GetAllProductsQuery['products']>['nodes'];
}
const BestSellingProducts: FC<BestSellingProductsProps> = ({ items }) => {
  return (
    <Grid container spacing={1}>
      {items?.map((item) => {
        if (item.__typename === 'VariableProduct') {
          return (
            <Grid key={item.databaseId} item xs={12} md={6} lg={4} xl={3}>
              <VariableProductItem data={item} />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default BestSellingProducts;
