"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Clock, User, MessageSquare } from 'lucide-react';
import { TMessage } from "@/app/types/Types";
import deleteMessages from "@/app/utls/actions/delete/deleteMessages";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";



const MessageSection = ({messages}: {messages: TMessage[]}) => {

    const {formState: {isSubmitting}} = useForm();

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const handleDelete = async () => {
        try {
            const res = await deleteMessages(messages[0].id!);

            if (res?.success) {
                toast.success("Message Deleted Successfully");
            } else {
                toast.error(res?.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="min-h-screen p-6 rounded-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">View and manage all received messages</p>
      </div>

      {messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <Card key={msg.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-3 bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {msg.name || "Anonymous"}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Mail className="h-3 w-3" />
                      {msg.email}
                    </CardDescription>
                  </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Trash2 className="h-4 w-4" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Post</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this message?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button 
                                    variant="destructive" 
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Deleting..." : "Delete"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
              </CardHeader>
              
              <CardContent className="pt-5">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <p className="text-foreground leading-relaxed">{msg.message}</p>
                </div>
              </CardContent>
              
              <CardFooter className="bg-muted/30 py-3">
                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(msg.createdAt!)}
                  </div>
                  <span>{formatDate(msg.createdAt!)}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <Mail className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">No messages yet</h3>
          <p className="text-muted-foreground">Messages will appear here once they are sent.</p>
        </div>
      )}
    </div>
  )
}

export default MessageSection