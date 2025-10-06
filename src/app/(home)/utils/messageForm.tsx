
"use client"

import { createMesssage } from '@/app/utls/actions/create/createMessage'
import { MessageSchemaV, messagesSchema } from '@/app/Validation/Validations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const MessageForm = () => {

    const {data: session} = useSession();

    const form = useForm({
        resolver: zodResolver(messagesSchema),
        defaultValues: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            message: ""
        }
    });

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<MessageSchemaV> = async (data) => {
        try {
            
            const res = await createMesssage(data);

            if (res) {
                toast.success("Message Sent Successfully");

                form.reset();
            } else {
                toast.error("Message Send Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <Card>
        <CardHeader>
            <CardTitle>
                <p className="text-blue-400 text-sm uppercase tracking-widest text-center">
                    Get in touch
                </p>
                <h3 className="text-4xl font-extrabold text-white text-center mb-6">
                    Contact Me
                </h3>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} value={field.value} placeholder="Enter your name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                                <Input type='email' {...field} value={field.value} placeholder="Enter your email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="message" render={({field}) => (
                        <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                                <Textarea {...field} value={field.value} placeholder="Enter your message" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button type='submit' variant={"default"} disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default MessageForm