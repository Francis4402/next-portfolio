/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import deleteMessages from '@/app/utls/actions/delete/deleteMessages';
import { FaTrash } from "react-icons/fa";


const MessageDeletebtn = ({id}: any) => {

    const handleDelete = async () => {
        await deleteMessages(id);
    }

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        <FaTrash />
    </button>
  )
}

export default MessageDeletebtn