import React from "react";

export default () => {
  return (
    // <footer className="bg-dark text-white text-center fixed-bottom">
    <footer className="footer-overlay bg-dark text-white mt-5 text-center fixed-bottom">
      {/* <footer className="bg-dark text-white mt-5 p-4 text-center fixed-bottom"> */}
      Copyrights &copy; {new Date().getFullYear()} LonaLee WEB
    </footer>
  );
};
