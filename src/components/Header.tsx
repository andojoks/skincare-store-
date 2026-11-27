import type { RefObject } from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  solid: boolean;
  menuOpen: boolean;
  search: string;
  cartCount: number;
  cartButtonRef: RefObject<HTMLButtonElement | null>;
  onSearch: (value: string) => void;
  onSearchEnter: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onOpenCart: () => void;
  onNavigate: (hash: string) => void;
}

const links = [
  ['Shop', '#shop'],
  ['Bestsellers', '#best'],
  ['Gallery', '#gallery'],
  ['About', '#about'],
] as const;

export function Header({
  solid,
  menuOpen,
  search,
  cartCount,
  cartButtonRef,
  onSearch,
  onSearchEnter,
  onToggleMenu,
  onCloseMenu,
  onOpenCart,
  onNavigate,
}: HeaderProps) {
  const navClass = `nav${solid ? ' is-solid' : ''}${menuOpen ? ' is-open' : ''}`;

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className={navClass} data-nav>
        <nav className="nav__links" aria-label="Primary">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={(event) => {
              event.preventDefault();
              onNavigate(href);
            }}>{label}</a>
          ))}
        </nav>

        <a className="logo" href="#top" aria-label="Sorrel home" onClick={(event) => {
          event.preventDefault();
          onNavigate('#top');
        }}><em>Sorrel</em></a>

        <div className="nav__tools">
          <label className="search">
            <span className="sr">Search products</span>
            <Icon name="search" />
            <input
              type="search"
              data-search
              placeholder="Search product…"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  onSearchEnter();
                }
              }}
            />
          </label>

          <button
            type="button"
            className="icon-btn"
            data-cart-open
            ref={cartButtonRef}
            aria-label={`Open bag, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            onClick={onOpenCart}
          >
            <Icon name="bag" />
            <span className="badge" data-badge>{cartCount}</span>
          </button>

          <button type="button" className="icon-btn icon-btn--account" aria-label="Account">
            <Icon name="user" />
          </button>

          <button
            type="button"
            className="icon-btn nav__burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={onToggleMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu${menuOpen ? ' is-open' : ''}`} id="menu" data-menu aria-hidden={!menuOpen}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={(event) => {
            event.preventDefault();
            onCloseMenu();
            onNavigate(href);
          }}>{label}</a>
        ))}
      </div>
    </>
  );
}
