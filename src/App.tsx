import AboutView from '@/app/components/about/AboutView';
import AppShell from '@/app/components/layout/AppShell';
import SectionPlaceholder from '@/app/components/layout/SectionPlaceholder';
import GameMenu from '@/app/components/game-menu/GameMenu';
import HomeView from '@/app/components/home/HomeView';
import { SECTIONS } from '@/app/config/sections';
import { useHashRoute } from '@/app/hooks/useHashRoute';

function App() {
  const { section, navigate } = useHashRoute();

  const content =
    section === 'inicio' ? (
      <HomeView onNavigate={navigate} />
    ) : section === 'modulos' ? (
      <GameMenu />
    ) : section === 'acerca' ? (
      <AboutView />
    ) : (
      <SectionPlaceholder section={SECTIONS[section]} />
    );

  return (
    <AppShell activeSection={section} onNavigate={navigate}>
      {content}
    </AppShell>
  );
}

export default App;
