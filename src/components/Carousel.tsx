import ImgWithSkeleton from "./ImgWithSkeleton";

const categories = [
  { id: 1, title: "Wedding Bliss", img: "https://picsum.photos/seed/wedding/800/450" },
  { id: 2, title: "Engagement", img: "https://picsum.photos/seed/engagement/800/450" },
  { id: 3, title: "Birthday Bash", img: "https://picsum.photos/seed/birthday/800/450" },
  { id: 4, title: "Graduation Day", img: "https://picsum.photos/seed/graduation/800/450" },
];

export default function Carousel() {
  return (
    <section className="relative z-30 w-full flex justify-center items-center min-h-[260px]">
      <ul className="flex gap-8 overflow-x-auto px-8 py-2 max-w-6xl snap-x snap-mandatory scrollbar-hide">
        {categories.map((c) => (
          <li
            key={c.id}
            className="w-72 shrink-0 snap-center transition-transform duration-300 group
                       motion-safe:hover:scale-105 motion-safe:hover:rotate-[3deg]"
          >
            <figure className="rounded-2xl overflow-hidden bg-night/80">
              <ImgWithSkeleton
                src={c.img}
                alt={c.title}
                className="h-44 w-full object-cover"
              />
              <figcaption className="mt-3 text-center font-medium text-smoke/90 text-lg drop-shadow-tagline">
                {c.title}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
} 