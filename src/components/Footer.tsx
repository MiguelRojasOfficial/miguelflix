export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-white text-xl font-bold mb-4">MiguelFlix</h3>
          <p className="text-sm">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Compañía</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Acerca de</a></li>
            <li><a href="#" className="hover:text-white transition">Carreras</a></li>
            <li><a href="#" className="hover:text-white transition">Prensa</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Ayuda</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Centro de ayuda</a></li>
            <li><a href="#" className="hover:text-white transition">Contáctanos</a></li>
            <li><a href="#" className="hover:text-white transition">Política de privacidad</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Síguenos</h4>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://linkedin.com/in/miguelrojasoficial" aria-label="LinkedIn" className="hover:text-white transition">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.852 0-2.134 1.445-2.134 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.07 2.07 0 1 1 .001-4.14 2.07 2.07 0 0 1-.001 4.14zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.226.792 24 1.771 24h20.451c.978 0 1.778-.774 1.778-1.728V1.728C24 .774 23.203 0 22.225 0z"/>
              </svg>
            </a>

            <a href="https://github.com/MiguelRojasOfficial" aria-label="GitHub" className="hover:text-white transition">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.371 0 0 5.372 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.996.108-.776.42-1.305.763-1.605-2.665-.304-5.467-1.333-5.467-5.933 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.46 11.46 0 0 1 3-.403c1.02.004 2.047.138 3 .403 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.814 1.1.814 2.22 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://miguelrojasoficial.onrender.com" aria-label="Render" className="hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M26.827.01c-4.596-.216-8.461 3.107-9.12 7.487-.027.203-.066.4-.099.596-1.025 5.454-5.797 9.584-11.53 9.584a11.67 11.67 0 0 1-5.634-1.442.298.298 0 0 0-.444.262v18.854h17.602V22.097c0-2.439 1.971-4.419 4.4-4.419h4.4c4.982 0 8.99-4.15 8.795-9.197C35.02 3.937 31.35.226 26.827.01Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
