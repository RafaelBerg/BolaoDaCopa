import { useState, useEffect } from 'react';
import { useToast, FlatList } from 'native-base';

import { api } from "../services/api";

import { Game, GameProps } from '../components/Game';
import { Loading } from './Loading';
import { EmptyMyPoolList } from './EmptyMyPoolList';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const [qntd, setQntd] = useState <1 | 2> (1);

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      const response2 = await api.get(`/pools/${poolId}`);

      response2.data.pool._count.participants === 1 ? setQntd(1) : setQntd(2)
      setGames(response.data.games);

    }
    catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    
  
    try{
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
        return toast.show({
          title: 'Informe o placar do palpite!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
    
    fetchGames()

    }catch(error){
      console.log(error);

      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />
  }


  return (
    <FlatList 
      data={qntd === 1 ? [] : games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}          
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
}