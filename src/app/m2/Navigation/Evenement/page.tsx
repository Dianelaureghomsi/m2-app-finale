"use client";

import banner from "@/public/images/students.jpeg";
import { Navbar } from "@/src/components/layouts/Navbar";
import Image from "next/image";
import { Button } from "@/src/components/Button";
import { JSX } from "react";
import { ChartColumn, CircuitBoard, Users, PartyPopper} from "lucide-react";
import Link from "next/link";

const Espaceavant = () => (
  <section className="relative w-full mt-10">
  </section>
);

const FeatureCard = ({
  title,
  description,
  icon,
  imageSrc,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  imageSrc: string;
}) => (
  <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden">
    <div className="w-full md:w-1/3">
      <Image
        src={imageSrc}
        alt={title}
        layout="responsive"
        width={400}
        height={400}
        objectFit="cover"
        className="h-full w-full"
      />
    </div>
    <div className="p-6 flex-1">
      <div className="text-purple-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const FeaturesSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">NOS ÉVÈNEMENTS</h2>
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-col items-center text-center rounded-lg shadow-md p-4 bg-white">
          <img
            src="/images/event.jpg"
            alt="École"
            className="w-full h-150 object-cover rounded-md mb-4"
          />

          <div className="text-violet-600 mb-2">
            <PartyPopper size={40} />
          </div>

          <h3 className="text-2xl font-semibold mb-2">
            Liste des évènements
          </h3>
          
          <p className="text-gray-600">
            Pas d'évènement pour le moment
          </p>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Témoignages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-50 shadow-md rounded-lg">
          <p className="text-gray-600 italic mb-4">
            "Cette plateforme a transformé ma façon d'apprendre. Les cours sont
            incroyables !"
          </p>
          <h4 className="text-lg font-semibold">- Jean-Baptiste Ngono</h4>
        </div>
        <div className="p-6 bg-gray-50 shadow-md rounded-lg">
          <p className="text-gray-600 italic mb-4">
            "Grâce à cette plateforme, j'ai pu atteindre mes objectifs éducatifs
            rapidement."
          </p>
          <h4 className="text-lg font-semibold">- Amina Njoya</h4>
        </div>
        <div className="p-6 bg-gray-50 shadow-md rounded-lg">
          <p className="text-gray-600 italic mb-4">
            "Une communauté incroyable et des outils puissants pour apprendre."
          </p>
          <h4 className="text-lg font-semibold">- Samuel Fokou</h4>
        </div>
      </div>
    </div>
  </section>
);

const CallToActionSection = () => (
  <section className="py-16 bg-gray-600 text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
      <p className="text-lg mb-6">
        Rejoignez-nous dès aujourd'hui et commencez votre parcours éducatif.
      </p>

      <div className="w-60 mx-auto">
        <Link href="/m2/inscription">
          <Button variant="default" onClick={() => {}}>
            Inscrivez-vous maintenant
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">À propos</h3>
          <p className="text-gray-400">
            Nous sommes une plateforme dédiée à l'éducation, offrant des outils
            pour apprendre et grandir.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Accueil
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Plateforme Éducative. Tous droits
        réservés.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div>
      <div className="fixed top-0 w-full z-50 bg-white">
        <Navbar />
      </div>
      <Espaceavant/>
      <FeaturesSection/>
      <CallToActionSection />
      <Footer />
    </div>
  );
}
