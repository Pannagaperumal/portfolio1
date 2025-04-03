import React, { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  page_views_count: number;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=pannagaperumal&per_page=10');
        if (!response.ok) throw new Error('Failed to fetch blogs');

        const data = await response.json();
        const sortedBlogs = data.sort((a: BlogPost, b: BlogPost) => b.page_views_count - a.page_views_count);
        setBlogs(sortedBlogs.slice(0, 3));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Recent Blogs</h2>
        {loading ? (
          <div className="text-center text-gray-400">Loading blogs...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <a 
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 rounded-xl overflow-hidden group hover:ring-2 hover:ring-teal-500/50 transition-all"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {blog.description || 'No description available'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Published on: {new Date(blog.published_at).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
