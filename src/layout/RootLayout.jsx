import Navbar from '../components/Navbar';
import ExtentionPage from '../pages/ExtensionPage';
import { usePageContext } from '../context/PageContext';

export default function RootLayout() {
  const { state } = usePageContext();

  return (
    <div className={`app ${state.isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
      <Navbar />
      <div className="container-extension">
        <ExtentionPage />
      </div>
    </div>
  );
}
