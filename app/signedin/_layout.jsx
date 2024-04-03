import { Slot } from 'expo-router';
import ScoreBoard from '../../components/ScoreBoard';
import LogoutButton from '../../components/Logout';
import { ScoreProvider } from '../../context/scoreContext';

export default function HomeLayout() {
  return <>
  <ScoreProvider>

    <ScoreBoard/>
    <Slot />
    <LogoutButton />
  </ScoreProvider>
  </>
}



