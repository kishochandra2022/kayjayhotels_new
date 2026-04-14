
import * as React from 'react';
import { fetchBlogPosts } from '../lib/wordpress';
import { BlogPost } from '../types';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';

const FeaturedBlogSection: React.FC = () => {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      // Fetch only the 3 latest posts
      const fetchedPosts = await fetchBlogPosts(3);
      setPosts(fetchedPosts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  // Don't render the section if there are no posts and it's not loading
  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">From Our Blog</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Latest stories, travel tips, and updates from our Sri Lankan paradise.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
            <Link
                to="/blog"
                className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                View All Posts
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogSection;