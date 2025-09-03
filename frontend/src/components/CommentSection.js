import React, { useState } from "react";
import { MessageCircle, Heart, User, Send, Trash2 } from "lucide-react";

const CommentSection = ({ comments, setComments, articleId }) => {
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    
    // Simular delay de envío
    setTimeout(() => {
      const comment = {
        id: `c${Date.now()}`,
        author: authorName,
        content: newComment,
        publishedAt: new Date().toISOString(),
        likes: 0
      };

      setComments([...comments, comment]);
      setNewComment("");
      setAuthorName("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: (comment.likes || 0) + 1 }
        : comment
    ));
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="border-t border-gray-800 pt-8">
      <div className="flex items-center space-x-3 mb-8">
        <MessageCircle className="w-6 h-6 text-cyan-400" />
        <h3 className="text-2xl font-bold text-white">
          Comentarios ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Deja tu comentario</h4>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Escribe tu comentario aquí..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-vertical"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-lg hover:from-cyan-600 hover:to-magenta-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Publicar comentario</span>
            </>
          )}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No hay comentarios aún</p>
            <p className="text-gray-500">¡Sé el primero en comentar!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="group p-6 bg-gray-900/30 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-cyan-400">{comment.author}</h5>
                    <p className="text-xs text-gray-500">{formatDate(comment.publishedAt)}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-400 transition-all duration-200"
                  title="Eliminar comentario"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{comment.content}</p>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-red-400 transition-colors duration-200"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{comment.likes || 0}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;