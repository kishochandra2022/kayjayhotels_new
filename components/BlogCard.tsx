
import * as React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, Category } from '../types';
import LazyImage from './LazyImage';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  const postDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Extract categories from the embedded data
  const categories = post._embedded?.['wp:term']?.[0] as Category[] | undefined;
  const primaryCategory = categories?.filter(cat => cat.slug !== 'uncategorized')[0];


  // Strip HTML tags from excerpt for a clean preview
  const excerptText = post.excerpt.rendered.replace(/<[^>]+>/g, '').replace('[&hellip;]', '...');

  return (
    <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out border border-transparent hover:border-brand-primary/50 hover:shadow-xl h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        {featuredImage ? (
          <LazyImage
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-brand-gray flex items-center justify-center">
            <LazyImage src="/public/images/logo.png" alt="Kayjay Hotels Logo" className="h-10 opacity-50" />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {primaryCategory && (
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wider mb-2">{primaryCategory.name}</p>
        )}
        <h3 className="text-xl font-bold font-sans text-brand-dark group-hover:text-brand-primary transition-colors duration-300" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <p className="text-sm text-gray-500 mt-2">{postDate}</p>
        <div className="text-gray-600 line-clamp-3 mt-4 text-sm" dangerouslySetInnerHTML={{ __html: excerptText }} />
        <span className="mt-auto pt-4 font-semibold text-brand-primary group-hover:text-brand-dark transition-colors duration-300">
          Read More &rarr;
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;