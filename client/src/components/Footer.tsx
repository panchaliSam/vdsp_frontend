import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2025 . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="mailto:contact@example.com"
            className="hover:underline me-4 md:me-6"
          >
            Email: contact@example.com
          </a>
        </li>
        <li>
          <a href="tel:+1234567890" className="hover:underline me-4 md:me-6">
            Phone: +1 (234) 567-890
          </a>
        </li>
        <li>
          <a href="https://www.example.com/contact" className="hover:underline">
            Contact Us
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
