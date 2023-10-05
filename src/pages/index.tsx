import React from 'react';
import { useRouter } from 'next/router'
import Logo from '../components/svg/Logo';
import { useCookies } from 'react-cookie';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['bearer']);

  const handleGetStarted = () => {
    if (cookies.bearer) {
      router.push('/dashboard/services');
    } else {
      router.push('/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <section className="p-10 flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-cyan-400 to-blue-700">
        <div className="w-60 mb-3">
          <Logo color='white' />
        </div>
        <h1 className="text-9xl text-white mb-6 font-extrabold">TITS</h1>
        <h1 className="text-5xl font-bold mb-4 text-center text-white">
          Tasks Integrations<br />& Technologies Systems
        </h1>
        <div className="flex justify-center w-64 h-16">
          <button
            className="bg-white text-black px-8 py-2 mt-14 rounded-full hover:bg-gray-100 hover:text-black w-full h-full text-xl font-bold"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </section>
      {/* <section className="bg-white p-10 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">Examples of Applets</h1>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">Personal Use</h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-black">Example 1</h3>
              <p className="text-black">Description for the first personal use applet.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black">Example 2</h3>
              <p className="text-black">Description for the second personal use applet.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">Professional Use</h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-black">Example 1</h3>
              <p className="text-black">Description for the first professional use applet.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black">Example 2</h3>
              <p className="text-black">Description for the second professional use applet.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">Available on Google Play</h1>
        <h2 className="text-xl mb-6 text-center text-black">Download our app and explore the power of automation on the go!</h2>
        <div className="flex justify-center">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Download Now</button>
        </div>
      </section> */}
    </div>
  );
}

export default HomePage;
