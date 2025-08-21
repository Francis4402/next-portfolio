
import type { Metadata } from 'next'
import { getMessages } from "@/app/utls/actions/getData/getMessages";
import MessageSection from '../utils/MessageSection';



export const metadata: Metadata = {
    title: 'Dashboard - Messages',
    description: 'View and manage your messages'
}

const Messages = async () => {
  
  const messages = await getMessages();

  return (
    <MessageSection messages={messages} />
  );
};

export default Messages;