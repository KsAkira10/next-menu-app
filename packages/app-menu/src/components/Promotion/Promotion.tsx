import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Card, CardContent, CardMedia, Grid, Hidden, NoSsr, Typography } from '@material-ui/core';
import interpolate from '../../lib/utils/interpolate';

interface PromotionCardImage {
  url: string;
  alternativeText: string;
}

interface PromotionCard {
  image: PromotionCardImage;
  description: string;
}

interface Promotion {
  id: string;
  storie: PromotionCard;
  feed: PromotionCard;
}

interface Share {
  Promotion: any;
  Section: number;
  Title: string;
}

type Shares = Array<Share>;

interface SharesResponse {
  shares: Shares;
}

const QUERY = gql`
  {
    shares {
      Title
      Section
      Promotion {
        id
        storie {
          image {
            url
            alternativeText
          }
          description
        }
        feed {
          image {
            url
            alternativeText
          }
          description
        }
      }
    }
  }
`;

const Promotion: React.FC<{ cuponCode?: string }> = ({ cuponCode }) => {
  const { loading, error, data } = useQuery<SharesResponse>(QUERY, {});
  if (error) return <h1>Error loading shares</h1>;
  if (loading) return <h1>Fetching</h1>;
  if (data?.shares && data?.shares?.length > 0) {
    return (
      <NoSsr>
        {data?.shares
          ?.sort((a: Share, b: Share) => {
            if (a.Section > b.Section) {
              return 1;
            }
            if (a.Section < b.Section) {
              return -1;
            }
            return 0;
          })
          ?.map(({ Promotion, Title, Section }: Share) => (
            <Grid container spacing={4} component="section" key={Section}>
              <Grid item xs={12}>
                <Typography variant="h1">{Title}</Typography>
              </Grid>
              {Promotion.map(({ storie, feed, id }: Promotion) => (
                <Fragment key={id}>
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card>
                      <CardMedia
                        component="img"
                        src={process.env.NEXT_PUBLIC_API_URL + storie?.image?.url}
                        alt={storie?.image?.alternativeText}
                        width="100%"
                        height="549px"
                      />
                      <CardContent>
                        <Typography>
                          {interpolate<{ cuponCode?: string }>(storie?.description, { cuponCode })}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card>
                      <CardMedia
                        component="img"
                        src={process.env.NEXT_PUBLIC_API_URL + feed?.image?.url}
                        alt={feed?.image?.alternativeText}
                        width="100%"
                        height="386px"
                      />
                      <CardContent>
                        <Typography>
                          {interpolate<{ cuponCode?: string }>(feed?.description, { cuponCode })}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Hidden only={['xs']}>
                    <Grid item xs={12} md={12} />
                  </Hidden>
                </Fragment>
              ))}
            </Grid>
          ))}
      </NoSsr>
    );
  } else {
    return <h1>No Shares Found</h1>;
  }
};

export default Promotion;
