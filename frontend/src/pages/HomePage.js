import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search, Zap } from "lucide-react";
import { mockNews } from "../data/mockData";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setNews(mockNews);
      setFilteredNews(mockNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = news.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNews(filtered);
  }, [searchTerm, news]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-4">
            <Zap className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
            <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30 animate-pulse"></div>
          </div>
          <p className="text-xl text-cyan-400 animate-pulse">Cargando noticias gaming...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                GAME
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                NEWS
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Las últimas noticias del mundo gaming. Lanzamientos, actualizaciones, retrasos y todo lo que necesitas saber.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar noticias, juegos, géneros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                Últimas Noticias
              </span>
            </h2>
            <div className="text-gray-400">
              {filteredNews.length} {filteredNews.length === 1 ? "noticia" : "noticias"}
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">No se encontraron noticias para tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article, index) => (
                <article
                  key={article.id}
                  className="group relative bg-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.6s ease-out forwards"
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/news/${article.id}`}
                      className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:from-cyan-500/20 hover:to-magenta-500/20 hover:border-cyan-400 transition-all duration-300 group/button"
                    >
                      <span className="font-medium">Leer más</span>
                      <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-magenta-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;