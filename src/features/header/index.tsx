import { HeaderTopBar } from "./components/HeaderTopBar";
import { HeaderMainBar } from "./components/HeaderMainBar";
import { HeaderNavBar } from "./components/HeaderNavBar";

export function Header() {
  return (
    <header className="shadow-sm">
      <HeaderTopBar />
      <HeaderMainBar />
      <HeaderNavBar />
    </header>
  );
}
