

import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPostBySlug } from '../lib/wordpress';
import { BlogPost, Category } from '../types';
import AnimatedSection from '../components/AnimatedSection';
import NotFound from './NotFound';
import LazyImage from '../components/LazyImage';
import { processHtmlForLazyLoading } from '../lib/utils'; // Import the utility
import { Helmet } from 'react-helmet-async'; // Import Helmet

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!slug) return;
    
    const loadPost = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const fetchedPost = await fetchBlogPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
                <div className="h-96 bg-gray-200 rounded-xl mb-8 animate-pulse"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }
  
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  const postDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const author = post._embedded?.author?.[0];
  const categories = post._embedded?.['wp:term']?.[0] as Category[] | undefined;
  const displayCategories = categories?.filter(cat => cat.slug !== 'uncategorized');

  // Clean up title and description for meta tags and schema
  const plainTextTitle = post.title.rendered.replace(/<[^>]+>/g, '');
  const seoDescription = post.excerpt.rendered.replace(/<[^>]+>/g, '').replace(/[\r\n]/gm, ' ').slice(0, 160) + '...';

  const canonicalUrl = `${window.location.origin}/#/blog/${slug}`;
  const imageUrl = featuredImage?.source_url ? `${window.location.origin}${featuredImage.source_url}` : `${window.location.origin}/public/images/logo.png`;


  const postSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
      },
      "headline": plainTextTitle,
      "description": seoDescription,
      "image": imageUrl,
      "author": {
          "@type": "Person",
          "name": author ? author.name : "Kayjay Hotels"
      },  
      "publisher": {
          "@type": "Organization",
          "name": "Kayjay Hotels",
          "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/public/images/logo.png`
          }
      },
      "datePublished": post.date,
  };

  // Process the HTML content for lazy loading before rendering
  const processedContentHtml = React.useMemo(() => {
    return post ? processHtmlForLazyLoading(post.content.rendered) : '';
  }, [post?.content.rendered]);


  return (
    <>
      <Helmet>
        <title>{`${plainTextTitle} | Kayjay Hotels Blog`}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={plainTextTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Kayjay Hotels" />
        {postDate && <meta property="article:published_time" content={post.date} />}
        {author?.name && <meta property="article:author" content={author.name} />}
        {displayCategories?.map(cat => (
          <meta property="article:tag" content={cat.name} key={cat.slug} />
        ))}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={plainTextTitle} />
        <meta property="twitter:description" content={seoDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(postSchema)}
        </script>
      </Helmet>
      <div className="bg-brand-light py-20">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto">
            <AnimatedSection>
              <header className="mb-8 text-center">
                 <Link to="/blog" className="text-brand-primary font-semibold hover:underline">&larr; Back to Blog</Link>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mt-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <p className="text-gray-500 mt-4">
                  Posted on {postDate} by {author?.name || 'Kayjay Hotels'}
                </p>
                {displayCategories && displayCategories.length > 0 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {displayCategories.map(cat => (
                      <Link key={cat.id} to={`/blog/category/${cat.slug}`} className="text-sm bg-brand-gray hover:bg-brand-primary hover:text-white text-gray-700 font-semibold py-1 px-3 rounded-full transition-colors border border-gray-200">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </header>
            </AnimatedSection>
            
            {featuredImage && (
              <AnimatedSection>
                <div className="mb-8 rounded-xl shadow-lg overflow-hidden">
                  <LazyImage 
                    src={featuredImage.source_url} 
                    alt={featuredImage.alt_text || post.title.rendered}
                    className="w-full h-auto"
                  />
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <div
                className="prose max-w-none text-lg text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: processedContentHtml }}
              />
            </AnimatedSection>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;