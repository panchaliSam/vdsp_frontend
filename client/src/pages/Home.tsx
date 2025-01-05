import { Carousel } from "@material-tailwind/react";
import HomeImge from "../assets/HomeImage.jpg";

const Home = (): JSX.Element => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="px-6 py-12 md:px-12 lg:px-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* About Text */}
          <div>
            <h2 className="font-light text-center">
              <span className="block text-3xl sm:text-4xl md:text-5xl text-white font-[Times_New_Roman]">
                V I D U R A
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl text-gray-500 font-[Times_New_Roman]">
                D E S I L V A
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl text-yellow-500 font-[Times_New_Roman]">
                P H O T O G R A P H Y
              </span>
            </h2>
            <p className="mt-8 text-white text-justify text-sm sm:text-base md:text-lg">
              Founded in 2018 by Vidura De Silva, our journey began with a
              passion for capturing the beauty of life through the lens. What
              started as a personal love for photography has grown into a
              trusted name in the industry, preserving life’s most meaningful
              moments.
            </p>
            <p className="mt-4 text-white text-justify text-sm sm:text-base md:text-lg">
              At Vidura De Silva Photography, we offer a wide range of
              professional photography services, from weddings and portraits to
              corporate events. Each photo we capture is crafted to tell a
              unique story, turning fleeting moments into timeless memories.
            </p>
            <p className="mt-4 text-white text-justify text-sm sm:text-base md:text-lg">
              With creativity, expertise, and an unwavering commitment to
              quality, we aim to deliver more than just photographs. We create
              art that reflects the beauty, emotion, and essence of every
              moment, ensuring a memorable experience for all our clients.
            </p>

            {/* Buttons (Sign In and Sign Up) */}
            <div className="flex space-x-4 mt-8">
              <button className="px-6 py-2 border border-white text-white bg-transparent rounded-md hover:bg-white hover:text-black transition duration-300">
                Sign In
              </button>
              <button className="px-6 py-2 border border-white text-white bg-transparent rounded-md hover:bg-white hover:text-black transition duration-300">
                Sign Up
              </button>
            </div>
          </div>

          {/* About Image - Background Image */}
          <div
            className="bg-cover bg-center bg-no-repeat h-[250px] sm:h-[350px] md:h-[450px] lg:h-full"
            style={{ backgroundImage: `url(${HomeImge})` }}
          ></div>
        </div>
      </section>

      {/* Carousel Section */}
      <Carousel autoplay loop>
        <div className="relative h-[250px] sm:h-[350px] md:h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <button className="mt-4 px-6 py-2 border border-white text-white bg-transparent rounded-md hover:bg-white hover:text-black transition duration-300">
              View Gallery
            </button>
          </div>
        </div>

        <div className="relative h-[250px] sm:h-[350px] md:h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <button className="mt-4 px-6 py-2 border border-white text-white bg-transparent rounded-md hover:bg-white hover:text-black transition duration-300">
              View Gallery
            </button>
          </div>
        </div>

        <div className="relative h-[250px] sm:h-[350px] md:h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <button className="mt-4 px-6 py-2 border border-white text-white bg-transparent rounded-md hover:bg-white hover:text-black transition duration-300">
              View Gallery
            </button>
          </div>
        </div>
      </Carousel>

      <section id="services" className="px-6 py-12 md:px-12 lg:px-24">
        <hr className="w-[80%] mx-auto border-t border-white" />
        <h2 className="font-light text-center mt-10 mb-20">
          <span className="block text-3xl sm:text-4xl md:text-5xl text-white font-[Times_New_Roman]">
            S E R V I C E S
          </span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "E V E N T S",
              description:
                "Document every special event with our expert photography, turning every moment into a cherished memory.",
              imgSrc:
                "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "G R A D U A T I O N",
              description:
                "Celebrate your academic achievements with stunning photos to commemorate your special day and unforgettable memories.",
              imgSrc:
                "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "W E D D I N G",
              description:
                "Cherish every magical moment of your wedding day with our expert photography. From heartfelt vows to joyful celebrations, we ensure your memories last forever.",
              imgSrc:
                "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full"
            >
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <img
                  src={card.imgSrc}
                  alt={`${card.title}-image`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <h6 className="text-slate-800 text-xl font-medium mx-auto">
                    {card.title}
                  </h6>
                </div>
                <hr className="border-t border-black my-4" />
                <p className="text-slate-600 text-justify leading-normal font-light">
                  {card.description}
                </p>
              </div>
              <div className="px-4 pb-4 pt-0 mt-2">
                <button
                  className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-12 md:px-12 lg:px-24">
        <hr className="w-[80%] mx-auto border-t border-white" />
        <h2 className="font-light text-center mt-10 mb-20">
          <span className="block text-3xl sm:text-4xl md:text-5xl text-white font-[Times_New_Roman]">
            C O N T A C T
          </span>
        </h2>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ml-20">
          {/* Left Column */}
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <ul>
              <li className="mb-3 flex items-center">
                <i className="fas fa-phone-alt mr-2 text-xl text-gray-500"></i>
                <strong>Phone:</strong> +1 (123) 456-7890
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-envelope mr-2 text-xl text-gray-500"></i>
                <strong>Email:</strong> example@email.com
              </li>
            </ul>
          </div>

          {/* Middle Column - Location Address */}
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <ul>
              <li className="mb-3 flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-xl text-gray-500"></i>
                <strong>Address:</strong> 123 Street, City, Country
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-4">
              Connect on Social Media
            </h3>
            <ul>
              <li className="mb-3 flex items-center">
                <i className="fab fa-facebook-f mr-2 text-xl text-gray-500"></i>
                <strong>Facebook:</strong>{" "}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook Profile
                </a>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fab fa-whatsapp mr-2 text-xl text-gray-500"></i>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/11234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
