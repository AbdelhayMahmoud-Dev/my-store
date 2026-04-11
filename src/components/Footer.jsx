const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;