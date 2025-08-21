"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, ArrowRight } from 'lucide-react';
import BlogCardhome from '../PojectRouteCards/BlogCard';
import { TBlog } from '@/app/types/Types';
import { useMemo, useState } from "react";


const BlogClient = ({blogs}: {blogs: TBlog[]}) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredBlogs = useMemo(() => {
        if (!searchTerm.trim()) return blogs;
        
        return blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [blogs, searchTerm]);
        
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const renderNoResults = () => {
        if (searchTerm.trim()) {
            return (
                <Card className="p-12 text-center">
                    <CardContent className="flex flex-col items-center gap-4 pt-6">
                        <div className="text-2xl font-semibold text-muted-foreground">
                            No articles found for `{searchTerm}`
                        </div>
                        <p className="text-muted-foreground max-w-md">
                            Try adjusting your search terms or browse all articles.
                        </p>
                        <Button variant="outline" onClick={() => setSearchTerm('')}>
                            Clear search
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="p-12 text-center">
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <div className="text-2xl font-semibold text-muted-foreground">
                        No Articles Published Yet
                    </div>
                    <p className="text-muted-foreground max-w-md">
                        Check back later for new articles and insights.
                    </p>
                    <Button variant="outline">
                        Subscribe for updates
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <div 
                    className="absolute inset-0 bg-[url('/bgimages.jpg')] bg-cover bg-center"
                    style={{
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">My Blog</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Thoughts, ideas, and experiences from my journey in development
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container max-w-7xl mx-auto px-4 py-12">
                {/* Header with stats and search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
                        <p className="text-muted-foreground mt-2 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {blogs?.length} articles published
                            {searchTerm && (
                                <span className="ml-2">
                                    | Found: <span className="font-semibold text-primary">{filteredBlogs.length}</span>
                                </span>
                            )}
                        </p>
                    </div>
                    
                    <div className="w-full md:w-auto">
                        <div className="relative w-full md:w-[300px]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                                placeholder="Search articles by title..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Blog Content */}
                {filteredBlogs?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map((blog: TBlog) => (
                            <BlogCardhome key={blog.id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    renderNoResults()
                )}
            </div>
        </div>
    )
}

export default BlogClient