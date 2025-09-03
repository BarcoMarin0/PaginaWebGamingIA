import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Eye, Calendar } from "lucide-react";
import { mockNews } from "../data/mockData";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [news, setNews] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    author: "",
    imageUrl: "",
    tags: ""
  });

  useEffect(() => {
    setNews(mockNews);
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      summary: "",
      author: "",
      imageUrl: "",
      tags: ""
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newsItem = {
      ...formData,
      id: editingId || `news_${Date.now()}`,
      publishedAt: editingId ? 
        news.find(n => n.id === editingId)?.publishedAt : 
        new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingId) {
      setNews(news.map(item => item.id === editingId ? newsItem : item));
    } else {
      setNews([newsItem, ...news]);
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      content: item.content,
      summary: item.summary,
      author: item.author,
      imageUrl: item.imageUrl,
      tags: item.tags.join(', ')
    });
    setEditingId(item.id);
    setIsCreating(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent">
                Panel de Administración
              </span>
            </h1>
            <p className="text-gray-400 mt-2">Gestiona las noticias de tu sitio</p>
          </div>
          
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-lg hover:from-cyan-600 hover:to-magenta-600 transition-all duration-300 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Noticia</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Total Noticias</h3>
            <p className="text-3xl font-bold text-white">{news.length}</p>
          </div>
          <div className="bg-gray-900/50 border border-magenta-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-magenta-400 mb-2">Publicadas Hoy</h3>
            <p className="text-3xl font-bold text-white">
              {news.filter(n => new Date(n.publishedAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-gray-900/50 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Autores Activos</h3>
            <p className="text-3xl font-bold text-white">
              {new Set(news.map(n => n.author)).size}
            </p>
          </div>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? "Editar Noticia" : "Nueva Noticia"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Resumen
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contenido
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Autor
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      URL de Imagen
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (separados por comas)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="RPG, Acción, Aventura"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="flex items-center space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-lg hover:from-cyan-600 hover:to-magenta-600 transition-all duration-300 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingId ? "Guardar Cambios" : "Crear Noticia"}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* News List */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Todas las Noticias</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">Título</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Autor</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Fecha</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Tags</th>
                  <th className="text-center p-4 text-gray-300 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item, index) => (
                  <tr 
                    key={item.id}
                    className={`border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors ${
                      index % 2 === 0 ? 'bg-gray-800/10' : ''
                    }`}
                  >
                    <td className="p-4 max-w-md">
                      <h3 className="text-white font-medium line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-1">
                        {item.summary}
                      </p>
                    </td>
                    <td className="p-4 text-cyan-400">{item.author}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(item.publishedAt)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/news/${item.id}`}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                          title="Ver noticia"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;