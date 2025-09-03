import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, MessageCircle, Heart, Share2, Tags } from "lucide-react";
import { mockNews, mockComments } from "../data/mockData";
import CommentSection from "../components/CommentSection";

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const foundArticle = mockNews.find((news) => news.id === id);
      const articleComments = mockComments[id] || [];
      
      setArticle(foundArticle);
      setComments(articleComments);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-cyan-400">Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-400 mb-4">Noticia no encontrada</h2>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header with back button */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a noticias</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Image */}
          <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            {/* Tags overlay */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Por <span className="text-cyan-400 font-medium">{article.author}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-magenta-400" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span>{comments.length} comentarios</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  liked
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-red-500/50 hover:text-red-400"
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                <span>{liked ? "Te gusta" : "Me gusta"}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir</span>
              </button>
            </div>
          </header>

          {/* Article Summary */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-cyan-400 font-semibold text-lg mb-2 flex items-center">
              <Tags className="w-5 h-5 mr-2" />
              Resumen
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none mb-12">
            <div className="text-gray-300 leading-relaxed text-lg space-y-6">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection 
            comments={comments} 
            setComments={setComments}
            articleId={article.id}
          />
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;