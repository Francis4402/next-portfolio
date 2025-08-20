
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utls/authOptions';


export const metadata: Metadata = {
  title: 'Contact',
  description: 'For contact'
}


const Contact =  async () => {

  const session = await getServerSession(authOptions);

  // const handleSubmit = async (data: TMessage) => {

  //   const res = await createMesssage(data);

  //   if (!res) return;
  // }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen p-6">
      <div className="container flex flex-col items-center mx-auto">

        <div className="md:w-1/2 w-full bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-700 transition-all hover:border-blue-500">
          <p className="text-blue-400 text-sm uppercase tracking-widest text-center">
            Get in touch
          </p>
          <h3 className="text-4xl font-extrabold text-white text-center mb-6">
            Contact Me
          </h3>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={session?.user?.name ? session?.user?.name : ""}
                placeholder="Enter your name"
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={session?.user?.email ? session?.user?.email : ""}
                placeholder="Enter your email"
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Your Message
              </label>
              <textarea
                rows={5}
                name="message"
                placeholder="Write your message here..."
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg w-full text-center transition-all hover:shadow-blue-500/50 hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
