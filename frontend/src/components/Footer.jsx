import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800">Job Hunt</h2>
            <p className="text-sm text-gray-500">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.592 0 0 .592 0 1.324v21.352C0 23.408.592 24 1.324 24H12.82V14.708h-3.49v-3.62h3.49V8.413c0-3.47 2.12-5.357 5.216-5.357 1.482 0 2.756.11 3.126.159v3.63h-2.146c-1.683 0-2.01.8-2.01 1.97v2.584h4.02l-.523 3.62h-3.497V24h6.856C23.408 24 24 23.408 24 22.676V1.324C24 .592 23.408 0 22.676 0z" />
              </svg>
            </a>

            <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.903 4.903 0 01-2.229-.616v.062a4.917 4.917 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.92 4.92 0 004.588 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.21-.006-.423-.016-.635A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>

            <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.084V9h3.112v1.561h.045c.434-.823 1.494-1.691 3.073-1.691 3.287 0 3.894 2.164 3.894 4.977v6.605zM5.337 7.433c-1.002 0-1.815-.813-1.815-1.816 0-1.002.813-1.815 1.815-1.815s1.816.813 1.816 1.815c0 1.003-.814 1.816-1.816 1.816zM6.956 20.452H3.718V9h3.238v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};


export default Footer;
