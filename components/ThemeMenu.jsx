import { useTheme } from 'next-themes';

const ThemeMenu = ({ showThemeMenu }) => {
  const { theme, setTheme } = useTheme();
  const themeMode = [
    { id: 'light', name: '🌝  light' },
    { id: 'dark', name: '🌚  dark' },
    { id: 'cupcake', name: '🧁  cupcake' },
    { id: 'bumblebee', name: '🐝  bumblebee' },
    { id: 'emerald', name: '❄  Emerald' },
    { id: 'corporate', name: '🏢  Corporate' },
    { id: 'synthwave', name: '🌃  synthwave' },
    { id: 'retro', name: '👴  retro' },
    { id: 'cyberpunk', name: '🤖  cyberpunk' },
    { id: 'valentine', name: '🌸  valentine' },
    { id: 'halloween', name: '🎃  halloween' },
    { id: 'garden', name: '🌷  garden' },
    { id: 'forest', name: '🌲  forest' },
    { id: 'aqua', name: '🐟  aqua' },
    { id: 'lofi', name: '👓  lofi' },
    { id: 'pastel', name: '🖍  pastel' },
    { id: 'fantasy', name: '🧚  fantasy' },
    { id: 'wireframe', name: '📝  Wireframe' },
    { id: 'black', name: '🏴  black' },
    { id: 'luxury', name: '💎  luxury' },
    { id: 'dracula', name: '🧛  dracula' },
    { id: 'cmyk', name: '🖨  CMYK' },
  ];

  return (
    showThemeMenu && (
      <ul className="menu compact absolute top-full right-[-100%] p-4 w-48 h-48 overflow-auto shadow-lg bg-base-100 text-base-content rounded-box rounded-tr-none rounded-br-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 z-30">
        {themeMode.map((mode) => (
          <li key={mode.id}>
            <a
              className={theme === mode.id ? 'active' : ''}
              onClick={() => setTheme(mode.id)}
            >
              {mode.name}
            </a>
          </li>
        ))}
      </ul>
    )
  );
};

export default ThemeMenu;
