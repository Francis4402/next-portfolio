import { TMessage } from "@/app/types/Types";



import type { Metadata } from 'next'
import { getMessages } from "@/app/utls/actions/getData/getMessages";

export const metadata: Metadata = {
    title: 'Dashboard-Messages',
    description: 'View Messages'
}


const Messages = async () => {

  const messages = await getMessages();


  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as "HH:MM"
  };


  return (
    <div className="min-h-screen p-6 rounded-md">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Sent Messages</h1>
        <p className="text-gray-300">View all your sent messages</p>
      </div>


      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          messages?.length > 0 ? messages?.map((msg: TMessage) => (
            <div key={msg.name} className="bg-gray-900 p-5 rounded-xl shadow-lg border cursor-pointer">
  
              <p className="text-sm text-gray-200 font-semibold mb-2">{msg.email}</p>
  
  
              <p className="text-gray-300 text-lg">{msg.message}</p>
  
              <div className="mt-3 flex gap-5 items-center justify-end">
                <span className="text-sm text-gray-400">{formatTime(msg.createdAt)}</span>
                
              </div>
            </div>
          )) : <p className="text-gray-300">No messages Posted Yet</p>
        }
      </div>
    </div>
  );
};

export default Messages;
