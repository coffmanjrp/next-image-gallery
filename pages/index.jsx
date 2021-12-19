import Head from 'next/head';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { Navbar } from '@/components/index';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Next Image Gallery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar title="Next Image Gallery" />
      <div className="flex h-screen justify-center items-center">
        <div className="card shadow max-w-sm">
          <figure className="relative w-full h-[200px]">
            <Image
              src="https://tailwindcss.com/img/card-top.jpg"
              alt="Sunset in the mountains"
              layout="fill"
              objectFit="cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              <span className="text-primary">Next + Tailwind</span>{' '}
              <FaHeart className="inline text-secondary" />
            </h2>
            <p>
              Next and Tailwind CSS are a match made in heaven, check out this
              article on how you can combine these two for your next app.
            </p>
            <div className="card-actions">
              <button className="btn btn-secondary">More info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
