

import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCategoryBySlug, fetchPostsByCategoryId } from '../lib/wordpress';
import { BlogPost, Category } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import BlogCard from '../components/BlogCard';
import NotFound from './NotFound';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const CategoryArchivePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = React.useState<Category | null>(null);
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!slug) return;
    
    const loadData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const fetchedCategory = await fetchCategoryBySlug(slug);
        if (fetchedCategory) {
          setCategory(fetchedCategory);
          const fetchedPosts = await fetchPostsByCategoryId(fetchedCategory.id);
          setPosts(fetchedPosts);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [slug]);

  if (isLoading) {
    // Return a loading skeleton
    return (
        <div className="bg-brand-gray py-20">
            <div className="container mx-auto px-6">
                 <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mb-12 animate-pulse"></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md h-96 animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  if (error || !category) {
    return <NotFound />;
  }

  const pageTitle = `Category: ${category.name} | Kayjay Hotels Blog`;
  const pageDescription = `Browse all blog posts filed under the "${category.name}" category on the Kayjay Hotels blog. Discover travel tips, destination guides, and more.`;
  const canonicalUrl = `${window.location.origin}/#/blog/category/${slug}`;
  const imageUrl = `${window.location.origin}/public/images/kay-jay-palms/garden.jpg`; // Generic image for blog category

  const categoryPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Kayjay Hotels",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/public/images/logo.png`
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Kayjay Hotels" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(categoryPageSchema)}
        </script>
      </Helmet>
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <div className="text-center mb-12">
                    <p className="text-brand-primary font-semibold uppercase tracking-wider">Blog Category</p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mt-2">{category.name}</h1>
                    <Link to="/blog" className="mt-4 inline-block text-gray-600 hover:text-brand-primary font-semibold transition-colors">&larr; View All Posts</Link>
                </div>
            </AnimatedSection>
            
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <AnimatedSection key={post.id}>
                    <BlogCard post={post} />
                    </AnimatedSection>
                ))}
                </div>
            ) : (
                <AnimatedSection>
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-brand-dark">No Posts Found</h2>
                    <p className="text-gray-600 mt-4">There are no posts in the "{category.name}" category yet.</p>
                </div>
                </AnimatedSection>
            )}
        </div>
      </div>
    </>
  );
};

export default CategoryArchivePage;