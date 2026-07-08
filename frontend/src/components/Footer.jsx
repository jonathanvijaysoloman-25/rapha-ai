import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-black border-t border-red-900/30 py-12 px-8"
    >
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row justify-between gap-10">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Rapha <span className="text-red-500">AI</span>
            </h2>

            <p className="text-gray-400 mt-4 max-w-md">
              Intelligent Healthcare Assistant powered by Artificial Intelligence.
              Helping people understand healthcare in a simple way.
            </p>

          </div>

          <div>

            <h3 className="text-white text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <a href="#">Home</a>
              <a href="#features">Features</a>
              <a href="#about">About</a>

            </div>

          </div>

          <div>

            <h3 className="text-white text-xl font-semibold mb-5">
              Connect
            </h3>

            <div className="flex gap-5 text-2xl text-red-500">

              <FaGithub className="cursor-pointer hover:scale-110 transition" />
              <FaLinkedin className="cursor-pointer hover:scale-110 transition" />
              <FaEnvelope className="cursor-pointer hover:scale-110 transition" />

            </div>

          </div>

        </div>

        <div className="border-t border-red-900/20 mt-10 pt-6 text-center text-gray-500">
          © 2026 Rapha AI. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;