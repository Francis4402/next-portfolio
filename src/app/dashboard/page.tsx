import { getServerSession } from "next-auth"
import { authOptions } from "../utls/authOptions"
import { getBlogs } from "../utls/actions/getData/getBlogs";
import { getProjects } from "../utls/actions/getData/getProjects";
import { getMessages } from "../utls/actions/getData/getMessages";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard", 
  description: "Next js portfolio",
};


const Dashboard = async () => {

  const session = await getServerSession(authOptions);

  const blogs = await getBlogs();

  const projects = await getProjects();

  const messages = await getMessages();


  return (
    <div className="min-h-screen bg-gray-800 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {session?.user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Projects Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-200">Projects</h2>
          <p className="text-4xl font-bold text-blue-600">{projects?.length || 0}</p>
          <p className="text-sm text-gray-400">Total projects created</p>
        </div>

        {/* Blogs Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-200">Blogs</h2>
          <p className="text-4xl font-bold text-green-600">{blogs?.length || 0}</p>
          <p className="text-sm text-gray-400">Total blogs published</p>
        </div>

        {/* Messages Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-200">Messages</h2>
          <p className="text-4xl font-bold text-purple-600">{messages?.length || 0}</p>
          <p className="text-sm text-gray-400">Total messages received</p>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="bg-gray-950 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Messages</h2>
        <div className="space-y-4">
          
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-500 mb-4">Recent Messages</h2>
        <div className="space-y-4">
            {/* <MessagesTime messages={messages} /> */}
          </div>
        </div>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard