import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Nav/NavBar';
import Footer from '../components/Footer';

type Article = {
    id: number;
    title: string;
    content: string;
    published_date: string;
};

const News = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/news/');
                setNews(response.data);
            } catch (err) {
                setError('Failed to fetch news. Please try again later.');
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <div>Loading news...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <div>
        <NavBar />
        <h1>Latest News</h1>
        {news.length === 0 ? (
          <p>No news articles available.</p>
        ) : (
          news.map((article) => (
            <div key={article.id} className="news-article">
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <p className="article-meta">
                Published on:{" "}
                {new Date(article.published_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))
        )}
        <Footer />
      </div>
    );
}
 
export default News;