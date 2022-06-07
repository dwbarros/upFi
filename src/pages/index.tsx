import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';


interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface ImagesResponse {
  after: string;
  data: Image[];
}


export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images', fetchImages, { getNextPageParam: lastPage => lastPage?.after ?? null }
  );

  async function fetchImages({ pageParam = null }): Promise<ImagesResponse> {
    const { data } = await api.get('images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  }

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });

    return formatted;
  }, [data]);


  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={['0.5rem', 20]} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="2rem"
            onClick={() => fetchNextPage()}
            role="button"
            w={['100%', 'auto']}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
