exports.getNavbar = async (req, res) => {
  // simple static example; later you can fetch from DB
  const nav = {
    logoSrc: 'https://...your-logo.png',
    logoAlt: 'RentSafe Logo',
    links: [
      { key: 'home', label: 'Home', href: '/' },
      { key: 'how', label: 'How It Works', href: '/how-it-works' },
      { key: 'browse', label: 'Browse Items', href: '/browse' },
      { key: 'about', label: 'About Us', href: '/about' },
      { key: 'contact', label: 'Contact Us', href: '/contact' }
    ],
    actions: [
      { key: 'login', label: 'Login', href: '/login' },
      { key: 'register', label: 'Register', href: '/register' }
    ]
  };

  res.json(nav);
};
