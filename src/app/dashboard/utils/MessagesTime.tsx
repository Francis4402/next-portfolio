/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { TMessage } from "@/app/types/Types";


const MessagesTime = ({messages}: {messages: any}) => {


  return (
    <div>
        {messages.length > 0 ? (
            messages
            ?.filter((msg: TMessage) => {
              const messageDate = new Date(msg.createdAt!);
              const now = new Date();
              const timeDifference = now.getTime() - messageDate.getTime();
              const hoursDifference = timeDifference / (1000 * 60 * 60);

              return hoursDifference <= 24;
            })
              .map((msg: TMessage) => (
                <div key={msg.id} className="border-b pb-4 flex flex-col gap-2">
                  <p className="text-sm text-gray-300">Your Email: {msg.email}</p>
                  <p className="text-gray-200">{msg.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(msg.createdAt!).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    ({Math.floor((new Date().getTime() - new Date(msg.createdAt!).getTime()) / (1000 * 60 * 60))} hours ago)
                  </p>
                </div>
              ))
            ): <p className="text-gray-400">No Messages Yet</p>
        }
    </div>
  )
}

export default MessagesTime