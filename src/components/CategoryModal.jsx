import { useState } from 'react';
import CategoryCard from './CategoryCard';

export default function CategoryModal({ genres, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
        <div className="bg-neutral-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-4 sm:px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-bold text-white">
              Todas las Categorías
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-800"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
              {genres.map((genre) => (
                <div key={genre.id} onClick={onClose}>
                  <CategoryCard genre={genre} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
