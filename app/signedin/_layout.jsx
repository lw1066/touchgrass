import { Slot } from 'expo-router';
import ScoreBoard from '../../components/ScoreBoard';
import LogoutButton from '../../components/Logout';

export default function HomeLayout() {
  return <>
    <ScoreBoard/>
    <Slot />
    <LogoutButton />
  </>
}



