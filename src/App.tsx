/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Plus, 
  Heart, 
  MessageCircle, 
  ChevronLeft, 
  Share2, 
  MoreVertical,
  User,
  Home,
  Star,
  Users,
  Handshake,
  ShieldCheck,
  Info,
  X,
  Camera,
  Tag,
  Trash2,
  Award,
  Settings,
  MapPin,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product } from './types';
import { MOCK_PRODUCTS } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const SurveyWizard = ({ 
  sellerName, 
  onSubmit, 
  onCancel 
}: { 
  sellerName: string; 
  onSubmit: (rating: 'good' | 'okay' | 'bad', accolades: string[], comment: string) => void; 
  onCancel: () => void; 
}) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<'good' | 'okay' | 'bad' | null>(null);
  const [selectedAccolades, setSelectedAccolades] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const toggleAccolade = (badge: string) => {
    setSelectedAccolades(prev => 
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      if (rating) {
        onSubmit(rating, selectedAccolades, comment);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <div className="p-6 flex flex-col space-y-6">
      {/* Progress indicators */}
      <div className="flex items-center justify-between px-2">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center gap-1.5">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-black",
              step === num 
                ? "bg-teal-800 text-white" 
                : step > num 
                  ? "bg-teal-100 text-teal-800" 
                  : "bg-gray-100 text-gray-400"
            )}>
              {num}
            </div>
            <span className={cn(
              "text-[10px] font-black uppercase tracking-wider",
              step === num ? "text-teal-800" : "text-gray-400"
            )}>
              {num === 1 ? "Rating" : num === 2 ? "Accolades" : "Message"}
            </span>
            {num < 3 && <div className="w-6 h-0.5 bg-gray-100" />}
          </div>
        ))}
      </div>

      {/* Step Contents */}
      {step === 1 && (
        <div className="space-y-4 animate-fadeIn">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 text-center">
            How was your local handshake experience?
          </label>
          <div className="space-y-2.5">
            <button 
              onClick={() => { setRating('good'); setStep(2); }}
              className={cn(
                "w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer",
                rating === 'good' 
                  ? "border-teal-700 bg-teal-50 text-teal-900 shadow-md" 
                  : "border-gray-100 hover:bg-gray-50 text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">☀️</span>
                <div>
                  <span className="font-extrabold text-sm block">Excellent Deal!</span>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">Highly polite, extremely helpful neighbor</span>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md">
                +2.5% Sero
              </span>
            </button>

            <button 
              onClick={() => { setRating('okay'); setStep(2); }}
              className={cn(
                "w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer",
                rating === 'okay' 
                  ? "border-teal-700 bg-teal-50 text-teal-900 shadow-md" 
                  : "border-gray-100 hover:bg-gray-50 text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤝</span>
                <div>
                  <span className="font-extrabold text-sm block">Ordinary Handshake</span>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">Smooth transaction with no particular issues</span>
                </div>
              </div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded-md">
                +0.5% Sero
              </span>
            </button>

            <button 
              onClick={() => { setRating('bad'); setStep(2); }}
              className={cn(
                "w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer",
                rating === 'bad' 
                  ? "border-red-500 bg-red-50 text-red-900 shadow-md" 
                  : "border-gray-100 hover:bg-gray-50 text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💔</span>
                <div>
                  <span className="font-extrabold text-sm block">Disappointing Trade</span>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">Kept waiting, impolite, or wrong item info</span>
                </div>
              </div>
              <span className="text-xs font-black text-red-600 uppercase tracking-wider bg-red-100 px-2 py-1 rounded-md">
                -4.0% Sero
              </span>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fadeIn">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 text-center">
            Accolades: Select what they excelled in!
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'punctual', emoji: '⏰', title: 'Punctual', desc: 'Kept time precisely' },
              { id: 'polite', emoji: '🤝', title: 'Super Polite', desc: 'Respectful & warm' },
              { id: 'asDescribed', emoji: '🔍', title: 'As Described', desc: 'Product matches text' },
              { id: 'fast', emoji: '💬', title: 'Fast Chat', desc: 'Extremely responsive' }
            ].map((badge) => {
              const isSelected = selectedAccolades.includes(badge.id);
              return (
                <div 
                  key={badge.id}
                  onClick={() => toggleAccolade(badge.id)}
                  className={cn(
                    "p-3.5 rounded-2xl border-2 text-center cursor-pointer transition-all select-none",
                    isSelected 
                      ? "border-teal-700 bg-teal-50/50 shadow-sm" 
                      : "border-gray-100 hover:bg-gray-50"
                  )}
                >
                  <span className="text-2xl block mb-1">{badge.emoji}</span>
                  <span className="font-black text-xs text-gray-900 block">{badge.title}</span>
                  <span className="text-[9px] text-gray-400 font-bold block mt-0.5">{badge.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-fadeIn">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-400 text-center">
            Write a warm neighbor comment
          </label>
          <textarea 
            rows={3}
            placeholder="Your kind comments motivate the local community. (Optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-700 font-medium text-xs placeholder:text-gray-300 text-gray-900"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        {step > 1 && (
          <button 
            onClick={handlePrev}
            className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all"
          >
            Back
          </button>
        )}
        <button 
          onClick={handleNext}
          disabled={step === 1 && !rating}
          className="flex-[2] py-4 bg-teal-800 hover:bg-teal-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step === 3 ? "Submit & Shake Hands" : "Continue"}
        </button>
      </div>
    </div>
  );
};

const getSeroTier = (score: number) => {
  if (score >= 95) return { name: 'Unshakable Bond', emoji: '💎', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', accent: 'bg-rose-500', desc: 'Flawless trust with perfect local community records.' };
  if (score >= 85) return { name: 'Golden Clasp', emoji: '✨', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', accent: 'bg-amber-500', desc: 'Highly active handshaker with shining local reviews.' };
  if (score >= 70) return { name: 'Solid Grip', emoji: '💪', color: 'text-teal-600', bg: 'bg-teal-50 border-teal-100', accent: 'bg-teal-600', desc: 'Steady and highly reliable neighbor trusted in the vicinity.' };
  if (score >= 50) return { name: 'Warm Handshake', emoji: '☀️', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-100', accent: 'bg-orange-500', desc: 'Kind and helpful neighbor building local connections.' };
  return { name: 'Sero Sprout', emoji: '🌱', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', accent: 'bg-emerald-500', desc: 'Fresh local neighbor starting their trading journey.' };
};

const TrustScore = ({ score, seller }: { score: number; seller?: any }) => {
  const [showModal, setShowModal] = useState(false);
  const tier = getSeroTier(score);

  // Fallback defaults if no feedback stats provided
  const dealsCount = seller?.dealsCount || Math.round(score * 0.3);
  const feedback = seller?.feedback || {
    punctual: Math.round(dealsCount * 0.8),
    polite: Math.round(dealsCount * 0.95),
    asDescribed: Math.round(dealsCount * 0.85),
    fast: Math.round(dealsCount * 0.75)
  };

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="flex flex-col items-end cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-all"
        title="View Sero Handshake Report"
      >
        <div className="flex items-center gap-1.5">
          <span className={cn("font-black text-lg tracking-tight", tier.color)}>{score}%</span>
          <span className="text-base filter drop-shadow-sm group-hover:animate-bounce">{tier.emoji}</span>
        </div>
        
        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-100 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("h-full rounded-full", tier.accent)}
          />
        </div>
        <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider font-extrabold flex items-center gap-0.5 group-hover:text-teal-700 transition-colors">
          🤝 {tier.name}
        </span>
      </div>

      {/* Sero Trust Report Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl border border-gray-50 flex flex-col"
            >
              {/* Header */}
              <div className="bg-teal-800 text-white p-6 relative">
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-white/15 hover:bg-white/25 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-teal-200 mb-1">
                  <Handshake size={14} className="text-amber-400" />
                  <span>Serofero Trust Card</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="w-14 h-14 bg-white rounded-full flex-shrink-0 border-2 border-amber-400 flex items-center justify-center overflow-hidden">
                    {seller?.avatarUrl ? (
                      <img src={seller.avatarUrl} alt={seller.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={28} className="text-teal-800" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{seller?.name || "Neighbor"}</h4>
                    <p className="text-xs text-teal-100/70">Joined {seller?.joinedDate || "Recent"}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Score & Tier Overview */}
                <div className={cn("p-4 rounded-2xl border flex items-center justify-between", tier.bg)}>
                  <div className="max-w-[70%]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Trust Level</span>
                    <h5 className={cn("font-black text-base flex items-center gap-1", tier.color)}>
                      {tier.name} {tier.emoji}
                    </h5>
                    <p className="text-[10px] text-gray-500 font-medium leading-tight mt-1">{tier.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block font-black uppercase tracking-wider">Score</span>
                    <span className={cn("text-3xl font-black tracking-tighter", tier.color)}>{score}%</span>
                  </div>
                </div>

                {/* Handshakes Count */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-700">
                      <Handshake size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">Completed Handshakes</span>
                      <span className="text-[10px] text-gray-400 font-bold">Safe Face-to-Face Deals</span>
                    </div>
                  </div>
                  <span className="bg-teal-100 text-teal-900 text-sm font-black px-3 py-1 rounded-full">{dealsCount} times</span>
                </div>

                {/* Neighborhood Feedback badges */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">Neighbor Accolades</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100/50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800">⏰ Punctual</span>
                        <span className="text-[9px] text-gray-400 font-medium">Kept time</span>
                      </div>
                      <span className="text-xs font-black text-teal-800">{feedback.punctual}</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100/50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800">🤝 Super Polite</span>
                        <span className="text-[9px] text-gray-400 font-medium">Warm & respectful</span>
                      </div>
                      <span className="text-xs font-black text-teal-800">{feedback.polite}</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100/50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800">🔍 As Described</span>
                        <span className="text-[9px] text-gray-400 font-medium">Item accurate</span>
                      </div>
                      <span className="text-xs font-black text-teal-800">{feedback.asDescribed}</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100/50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800">💬 Fast Chat</span>
                        <span className="text-[9px] text-gray-400 font-medium">Quick responses</span>
                      </div>
                      <span className="text-xs font-black text-teal-800">{feedback.fast}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                <p className="text-[9px] text-gray-400 font-bold mb-1">
                  Serofero guarantees handshake honesty via mutual reviews.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div 
      layoutId={`product-${product.id}`}
      onClick={onClick}
      className="flex gap-4 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="relative w-28 h-28 flex-shrink-0">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover rounded-2xl"
          referrerPolicy="no-referrer"
        />
        {product.isNegotiable && (
          <div className="absolute top-1 left-1 bg-teal-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
            NEGOTIABLE
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow py-1">
        <div>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">
            {product.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 gap-1 mb-1">
            <span>{product.location}</span>
            <span>•</span>
            <span>{product.timeAgo}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-teal-700">Rs. {product.price.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Users size={12} />
            <span>{product.seller.communities[0]}</span>
          </div>
          <div className="flex gap-3 text-gray-400">
            {product.isNegotiable && product.offersCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                <Handshake size={14} />
                <span>{product.offersCount}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-xs">
              <MessageCircle size={14} />
              <span>{product.chats}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Heart size={14} />
              <span>{product.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetail = ({ product, onBack }: { product: Product, onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md flex items-center justify-between p-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="w-full aspect-square relative">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Seller Info */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <img 
            src={product.seller.avatarUrl} 
            alt={product.seller.name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          />
          <div>
            <h4 className="font-bold text-gray-900 flex items-center gap-1">
              {product.seller.name}
              {product.seller.trustScore > 90 && <Star size={14} fill="#0d9488" className="text-teal-600" />}
            </h4>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">
              {product.seller.communities.join(' • ')}
            </p>
          </div>
        </div>
        <TrustScore score={product.seller.trustScore} seller={product.seller} />
      </div>

      {/* Content */}
      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{product.title}</h1>
        <div className="flex items-center text-xs text-gray-400 gap-2 mb-6">
          <span className="bg-gray-100 px-2 py-1 rounded">{product.category}</span>
          <span>•</span>
          <span>{product.timeAgo}</span>
        </div>
        
        {/* Safety Tip Box */}
        <div className="bg-amber-50 p-4 rounded-2xl mb-6 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
            <ShieldCheck size={18} />
            <span>Safe Meet-up Only</span>
          </div>
          <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
            <li>Meet in a public place (Mall, Cafe, etc.)</li>
            <li>Inspect the item thoroughly before paying</li>
            <li>Pay only after you receive the item</li>
          </ul>
        </div>

        <p className="text-gray-700 leading-relaxed text-base mb-8">
          {product.description || "No description provided."}
        </p>

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Info size={14} />
          <span>Listed in {product.location}</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex items-center gap-3">
        <button className="p-3 text-gray-400 hover:text-red-500 transition-colors border border-gray-100 rounded-xl">
          <Heart size={24} />
        </button>
        <div className="flex-grow">
          <div className="text-xl font-black text-teal-800 leading-none">
            Rs. {product.price.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
            Cash on Delivery (Meet-up)
          </div>
        </div>
        <div className="flex gap-2">
          {product.isNegotiable && (
            <button className="bg-amber-100 text-amber-700 px-4 py-3 rounded-xl font-bold text-sm hover:bg-amber-200 transition-colors flex items-center gap-1">
              <Handshake size={18} />
              Offer
            </button>
          )}
          <button className="bg-teal-700 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-800 transition-colors">
            Chat
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Sell Screen ---

const SellScreen = ({ 
  onBack,
  onSubmit
}: { 
  onBack: () => void;
  onSubmit: (productData: {
    title: string;
    price: number;
    category: string;
    location: string;
    description: string;
    imageUrl: string;
    isNegotiable: boolean;
  }) => void;
}) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [allowOffers, setAllowOffers] = useState(false);

  const handleAddPhoto = () => {
    if (photos.length < 4) {
      // In a real app, this would be a file picker
      const newPhoto = `https://picsum.photos/seed/${Math.random()}/800/800`;
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    if (mainPhotoIndex === index) {
      setMainPhotoIndex(0);
    } else if (mainPhotoIndex > index) {
      setMainPhotoIndex(mainPhotoIndex - 1);
    }
  };

  const isFormValid = title && price && category && location && description && photos.length > 0;

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-[110] flex flex-col"
    >
      <header className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-gray-900">
          <X size={24} />
        </button>
        <h2 className="font-black text-lg tracking-tight">Sell Item</h2>
        <button 
          disabled={!isFormValid}
          className={cn(
            "px-6 py-2 rounded-full font-black text-sm transition-all",
            isFormValid ? "bg-teal-700 text-white shadow-lg" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          onClick={() => {
            onSubmit({
              title,
              price: Number(price) || 0,
              category,
              location,
              description,
              imageUrl: photos[mainPhotoIndex] || photos[0],
              isNegotiable
            });
            onBack();
          }}
        >
          Post
        </button>
      </header>

      <div className="flex-grow overflow-y-auto p-6 space-y-8 pb-24">
        {/* Photo Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-sm uppercase tracking-widest text-gray-400">Photos ({photos.length}/4)</h3>
            <span className="text-[10px] text-teal-600 font-bold">Tap a photo to set as main</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer",
                  mainPhotoIndex === index ? "border-teal-600 shadow-lg scale-105 z-10" : "border-gray-100"
                )}
                onClick={() => setMainPhotoIndex(index)}
              >
                <img src={photo} className="w-full h-full object-cover" alt={`Upload ${index}`} />
                {mainPhotoIndex === index && (
                  <div className="absolute top-1 left-1 bg-teal-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase">
                    Main
                  </div>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRemovePhoto(index); }}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full backdrop-blur-sm"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {photos.length < 4 && (
              <button 
                onClick={handleAddPhoto}
                className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-teal-500 hover:text-teal-600 transition-all"
              >
                <Camera size={24} />
                <span className="text-[10px] font-bold">Add</span>
              </button>
            )}
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Item Name</label>
            <input 
              type="text" 
              placeholder="What are you selling?"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 font-bold text-gray-900 placeholder:text-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Category</label>
              <select 
                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 font-bold text-gray-900 appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Electronics">Electronics</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Books">Books</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Kathmandu"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 font-bold text-gray-900 placeholder:text-gray-300"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Price (Rs.)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">Rs.</span>
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 font-black text-xl text-gray-900 placeholder:text-gray-200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsNegotiable(!isNegotiable)}
              className={cn(
                "flex-1 p-4 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all",
                isNegotiable ? "bg-teal-50 border-teal-600 text-teal-700" : "bg-white border-gray-100 text-gray-400"
              )}
            >
              <Handshake size={16} />
              Negotiable
            </button>
            <button 
              onClick={() => setAllowOffers(!allowOffers)}
              className={cn(
                "flex-1 p-4 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all",
                allowOffers ? "bg-amber-50 border-amber-500 text-amber-700" : "bg-white border-gray-100 text-gray-400"
              )}
            >
              <Tag size={16} />
              Allow Offers
            </button>
          </div>
        </section>

        {/* Description */}
        <section>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Description</label>
          <textarea 
            placeholder="Describe your item (condition, age, etc.)"
            rows={5}
            className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-900 placeholder:text-gray-300 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>
      </div>
    </motion.div>
  );
};

// --- Login Screen ---

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="fixed inset-0 bg-teal-800 z-[100] flex flex-col items-center justify-center p-8 text-white">
      <div className="mb-12 text-center">
        <div className="w-24 h-24 bg-white/20 rounded-[40px] flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-sm border border-white/10">
          <Handshake size={56} className="text-amber-400 translate-y-0.5" />
        </div>
        <h1 className="text-4xl font-black mb-2 tracking-tighter">Serofero</h1>
        <p className="text-teal-100/70 text-sm font-medium">Everything in your vicinity</p>
        <p className="mt-2 text-[10px] text-teal-100/40 italic">Verified badges are only for Google/Phone logins</p>
      </div>
      
      <div className="w-full space-y-4 max-w-xs">
        <button 
          onClick={onLogin}
          className="w-full bg-white text-teal-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-teal-50 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>
        
        <button className="w-full bg-teal-700 text-white font-bold py-4 rounded-2xl border border-teal-600 hover:bg-teal-600 transition-colors">
          Continue with Phone
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-100/30 mb-1">Developed By</p>
        <p className="text-xs font-bold text-teal-100/60">Himpower Pvt. Ltd.</p>
      </div>
      
      <p className="mt-8 text-[10px] text-teal-100/50 text-center leading-relaxed">
        By continuing, you agree to our Terms of Service <br /> and Privacy Policy.
      </p>
    </div>
  );
};

// --- Main App ---

export const ME_USER = {
  id: 'me',
  name: 'Himpower Neighbor',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Himpower',
  trustScore: 96,
  location: 'New Baneshwor, KTM',
  joinedDate: 'Jan 2024',
  communities: ['KTM Techies', 'Lalitpur Riders'],
  mutualConnections: 12,
  dealsCount: 18,
  feedback: { punctual: 15, polite: 18, asDescribed: 14, fast: 16 }
};

const INITIAL_MY_PRODUCT: Product = {
  id: 'my-1',
  title: 'Vintage Brass Singing Bowl',
  price: 3500,
  isNegotiable: true,
  location: 'New Baneshwor, KTM',
  category: 'Home',
  imageUrl: 'https://picsum.photos/seed/bowl/600/600',
  timeAgo: '1d ago',
  likes: 8,
  chats: 2,
  offersCount: 1,
  seller: ME_USER,
  description: 'Beautiful hand-beaten brass singing bowl with wooden striker. Perfect for meditation and mindfulness. Excellent sound resonance.'
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isSelling, setIsSelling] = useState(false);
  const [location] = useState('Kathmandu');
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Dynamic products state to support live trust score changes on review
  const [products, setProducts] = useState<Product[]>([INITIAL_MY_PRODUCT, ...MOCK_PRODUCTS]);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveySeller, setSurveySeller] = useState<any | null>(null);
  const [surveyProduct, setSurveyProduct] = useState<any | null>(null);
  const [activeChatRoomId, setActiveChatRoomId] = useState<string>('c1');
  const [newMessage, setNewMessage] = useState('');

  // Rich local mock chat rooms
  const [chatRooms, setChatRooms] = useState<any[]>([
    {
      id: 'c1',
      product: MOCK_PRODUCTS[0],
      messages: [
        { id: 'm1', sender: 'them', text: "Hello! Is this iPhone 13 Pro still available?", time: "10:15 AM" },
        { id: 'm2', sender: 'me', text: "Namaste! Yes, it is fully functional and ready to go.", time: "10:18 AM" },
        { id: 'm3', sender: 'them', text: "Wonderful. Can we meet tomorrow at Patan Durbar Square for a secure handshake?", time: "10:20 AM" },
        { id: 'm4', sender: 'me', text: "Sounds perfect. Let's do it there around 2 PM.", time: "10:21 AM" }
      ],
      isCompleted: false,
    },
    {
      id: 'c2',
      product: MOCK_PRODUCTS[1],
      messages: [
        { id: 'm10', sender: 'them', text: "Greetings! I saw your Classic 350. Is it still in Lalitpur?", time: "Yesterday" },
        { id: 'm11', sender: 'me', text: "Yes, you can inspect it anytime near Jamsikhel.", time: "Yesterday" },
        { id: 'm12', sender: 'them', text: "Awesome, I will bring cash so we can finalize the deal with a warm handshake.", time: "Yesterday" }
      ],
      isCompleted: false,
    },
    {
      id: 'c3',
      product: MOCK_PRODUCTS[2],
      messages: [
        { id: 'm20', sender: 'them', text: "Hello, regarding the Dhaka Shawl, is the weaving authentic?", time: "2 days ago" },
        { id: 'm21', sender: 'me', text: "Yes, it is entirely handmade by local Bhaktapur artisans.", time: "2 days ago" }
      ],
      isCompleted: false,
    }
  ]);

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    triggerPushNotification("🗑️ Item Removed", "Your listing has been successfully deleted.");
  };

  // Function to request actual browser notification permissions
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPermissionGranted(true);
        return true;
      }
    }
    return false;
  };

  // Helper to trigger a notification (both native if permitted, and beautiful in-app fallback)
  const triggerPushNotification = (title: string, body: string) => {
    // 1. Show elegant in-app notification banner
    setNotification({ title, body });
    
    // 2. Try native browser notification if allowed
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.warn("Native Notification failed (usually because in background/iframe)", e);
      }
    }
  };

  // Purely dynamic, cache-proof, high-fidelity SVG downloader
  const downloadSvgFreshly = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="120" fill="#115e59" />
  <circle cx="256" cy="256" r="180" fill="none" stroke="#fbbf24" stroke-width="4" stroke-opacity="0.15" stroke-dasharray="16 12" />
  <g fill="none" stroke="#fbbf24" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 40,290 L 130,250 C 140,220 140,200 130,170 L 40,210 Z" fill="rgba(255, 255, 255, 0.05)" stroke-width="12" />
    <line x1="130" y1="170" x2="130" y2="250" stroke-width="12" stroke-dasharray="2 4" stroke-opacity="0.5" />
    <path d="M 472,222 L 382,262 C 372,292 372,312 382,342 L 472,302 Z" fill="rgba(255, 255, 255, 0.05)" stroke-width="12" />
    <line x1="382" y1="262" x2="382" y2="342" stroke-width="12" stroke-dasharray="2 4" stroke-opacity="0.5" />
    <path d="M 130,210 C 170,195 190,195 220,215" />
    <path d="M 130,250 C 160,250 185,260 210,275" />
    <path d="M 382,262 C 342,245 322,245 292,265" stroke-width="16" />
    <path d="M 382,302 C 352,315 330,315 305,300" stroke-width="16" />
    <path d="M 195,190 C 215,150 235,160 250,185 C 260,200 255,215 225,220" />
    <path d="M 320,320 C 300,360 280,350 265,325 C 255,310 260,295 290,290" />
    <path d="M 225,220 C 245,205 275,215 280,240 C 285,265 255,275 235,265" />
    <path d="M 240,240 C 260,225 290,235 295,260 C 300,285 270,295 250,285" />
    <path d="M 255,260 C 275,245 305,255 310,280 C 315,305 285,315 265,305" />
    <path d="M 320,160 L 320,180" stroke-width="8" />
    <path d="M 310,170 L 330,170" stroke-width="8" />
  </g>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const trigger = document.createElement('a');
    trigger.href = url;
    trigger.download = 'serofero_handshake_icon.svg';
    document.body.appendChild(trigger);
    trigger.click();
    document.body.removeChild(trigger);
    URL.revokeObjectURL(url);
  };

  // Complete trade survey handler to dynamically update trust score & feed accolades
  const handleCompleteSurvey = (rating: 'good' | 'okay' | 'bad', accolades: string[], comment: string) => {
    let scoreChange = 0.5;
    if (rating === 'good') scoreChange = 2.5;
    if (rating === 'bad') scoreChange = -4.0;

    if (surveyProduct && surveySeller) {
      // 1. Update dynamic products list (re-syncs seller trust metrics across feed)
      setProducts(prevProducts => {
        return prevProducts.map(p => {
          if (p.seller.id === surveySeller.id) {
            const currentScore = p.seller.trustScore;
            const newScore = Math.min(100, Math.max(0, Math.round(currentScore + scoreChange)));
            
            const currentFeedback = p.seller.feedback || { punctual: 10, polite: 10, asDescribed: 10, fast: 10 };
            const newFeedback = { ...currentFeedback };
            accolades.forEach((badge) => {
              if (badge === 'punctual') newFeedback.punctual += 1;
              if (badge === 'polite') newFeedback.polite += 1;
              if (badge === 'asDescribed') newFeedback.asDescribed += 1;
              if (badge === 'fast') newFeedback.fast += 1;
            });

            const newDealsCount = (p.seller.dealsCount || 0) + 1;

            return {
              ...p,
              seller: {
                ...p.seller,
                trustScore: newScore,
                dealsCount: newDealsCount,
                feedback: newFeedback
              }
            };
          }
          return p;
        });
      });

      // 2. Mark specific chat room as completed & insert verified ledger bubble
      setChatRooms(prevRooms => {
        return prevRooms.map(room => {
          if (room.product.id === surveyProduct.id && room.product.seller.id === surveySeller.id) {
            return {
              ...room,
              isCompleted: true,
              messages: [
                ...room.messages,
                { 
                  id: `system-${Date.now()}`, 
                  sender: 'system', 
                  text: `🤝 Handshake Completed! Deal verified safely. Peer rating registered into Sero Score. Comment: "${comment || 'Excellent trade!'}"`, 
                  time: "Just now" 
                }
              ]
            };
          }
          return room;
        });
      });

      // 3. Trigger native and in-app feedback celebration
      triggerPushNotification(
        `💖 Sero Accolades Sent!`,
        `Thank you! Your feedback for ${surveySeller.name} has been securely added to the Sero local index.`
      );
    }
    
    setShowSurvey(false);
  };

  // Mock messaging system handler
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    setChatRooms(prev => prev.map(room => {
      if (room.id === activeChatRoomId) {
        return {
          ...room,
          messages: [
            ...room.messages,
            {
              id: `m-new-${Date.now()}`,
              sender: 'me',
              text: newMessage,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return room;
    }));
    
    setNewMessage('');
    
    // Auto simulated neighbor reply to maintain hyper-interactivity
    setTimeout(() => {
      setChatRooms(prev => prev.map(room => {
        if (room.id === activeChatRoomId) {
          if (room.isCompleted) return room; // Stop replies if handshake completed
          
          const possibleReplies = [
            "Dhanyabad! Sounds like a great deal, see you soon! 🤝",
            "Sure, let's meet up and check the item safely. 👍",
            "Perfect. I am on my way to Kathmandu, let you know when I arrive!",
            "Thank you! Serofero handshakes are always the safest!"
          ];
          const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
          
          return {
            ...room,
            messages: [
              ...room.messages,
              {
                id: `m-reply-${Date.now()}`,
                sender: 'them',
                text: randomReply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return room;
      }));
      
      const currentRoom = chatRooms.find(r => r.id === activeChatRoomId);
      if (currentRoom && !currentRoom.isCompleted) {
        triggerPushNotification(
          `💬 ${currentRoom.product.seller.name}`,
          "Sent you a message in Kathmandu vicinity chat."
        );
      }
    }, 2000);
  };

  // Auto-dismiss the in-app notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Request browser permissions automatically on login, and queue a test notification after 12s
  useEffect(() => {
    if (isLoggedIn) {
      // Small delay before requesting to feel organic
      setTimeout(() => {
        requestNotificationPermission();
      }, 2000);

      // Trigger a realistic simulated notification after 12 seconds
      const simulatedTimer = setTimeout(() => {
        triggerPushNotification(
          "💬 Rajesh Kaji",
          "Namaste! Is the price for the MacBook Pro negotiable? Can we meet at Durbar Marg?"
        );
      }, 12000);

      return () => clearTimeout(simulatedTimer);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative flex flex-col">
      {/* In-App Push Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            onClick={() => {
              setActiveTab('chat');
              setNotification(null);
            }}
            className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 border border-teal-800/15 z-[1000] flex gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <div className="bg-teal-800 p-2.5 rounded-xl flex-shrink-0 flex items-center justify-center text-amber-400">
              <Handshake size={20} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[10px] font-black text-teal-900 uppercase tracking-wider">Serofero Notification</span>
                <span className="text-[9px] text-gray-400 font-bold">Just now</span>
              </div>
              <h4 className="font-black text-xs text-gray-900">{notification.title}</h4>
              <p className="text-[11px] text-gray-500 font-bold leading-tight">{notification.body}</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setNotification(null); }}
              className="text-gray-400 hover:text-gray-900 p-1 self-start"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header - Responsive Width */}
      <header className="sticky top-0 z-20 bg-teal-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-amber-500 p-1.5 rounded-lg shadow-sm">
              <Handshake size={20} className="text-teal-900" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">Serofero</h1>
            </div>
          </div>
          
          {/* Search Bar for Tablet/Desktop */}
          <div className="hidden md:flex flex-grow max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search items in your community..." 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-10 pr-4 text-sm focus:bg-white focus:text-gray-900 transition-all outline-none placeholder:text-white/50"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-white/50" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Search size={22} className="md:hidden opacity-80 cursor-pointer hover:opacity-100" />
            <div className="relative">
              <Bell size={22} className="opacity-80 cursor-pointer hover:opacity-100" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-teal-800" />
            </div>
            <Menu size={22} className="opacity-80 cursor-pointer hover:opacity-100" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow bg-white">
        <div className="max-w-6xl mx-auto pb-24">
          {activeTab === 'home' && (
            <>
              {/* Nepal Special Banner */}
              <div className="p-4 md:p-6">
                <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl">
                  <div className="relative z-10 max-w-md">
                    <h2 className="font-black text-2xl md:text-3xl leading-tight mb-2">Safe Face-to-Face Trading</h2>
                    <p className="text-sm md:text-base opacity-80 mb-6">Meet in public, verify the item, then pay in cash. Your safety is our priority.</p>
                    <button className="bg-amber-500 text-teal-900 text-xs font-black px-6 py-3 rounded-full uppercase tracking-wider shadow-lg hover:bg-amber-400 transition-colors">
                      View Safety Guide
                    </button>
                  </div>
                  <ShieldCheck size={180} className="absolute -right-10 -bottom-10 opacity-10 text-white hidden sm:block" />
                </div>
              </div>

              {/* Categories */}
              <div className="flex gap-3 overflow-x-auto px-4 md:px-6 pb-6 no-scrollbar">
                {['All', 'Electronics', 'Vehicles', 'Fashion', 'Home', 'Books'].map((cat) => (
                  <button 
                    key={cat}
                    className={cn(
                      "px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border",
                      cat === 'All' ? "bg-teal-800 text-white border-teal-800 shadow-md" : "bg-white text-gray-500 border-gray-100 hover:border-teal-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid - Responsive Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border-t border-gray-100">
                {products.map((product) => (
                  <div key={product.id} className="bg-white">
                    <ProductCard 
                      product={product} 
                      onClick={() => { setSelectedProduct(product); }} 
                    />
                  </div>
                ))}
              </div>

              {/* Company Branding Footer */}
              <footer className="py-12 px-6 text-center bg-gray-50 border-t border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="bg-teal-800 p-1.5 rounded-lg shadow-sm">
                      <Handshake size={20} className="text-amber-500" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-teal-900">Serofero</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Connecting your surroundings through safe and easy local trade.
                  </p>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Developed & Maintained By</p>
                    <p className="text-sm font-bold text-teal-800">Himpower Pvt. Ltd.</p>
                    <p className="text-[10px] text-gray-400 mt-2">© 2026 All Rights Reserved</p>
                  </div>
                </div>
              </footer>
            </>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col md:flex-row h-[600px] max-w-5xl mx-auto bg-white overflow-hidden rounded-[32px] border border-gray-100 shadow-xl m-4">
              {/* Chat Rooms List (Left Sidebar) */}
              <div className="w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
                <div className="p-4 border-b border-gray-100 bg-white">
                  <h2 className="font-black text-base text-gray-900 tracking-tight flex items-center gap-2">
                    <MessageCircle size={18} className="text-teal-700" />
                    <span>Vicinity Handshakes</span>
                  </h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Kathmandu Area Chats</p>
                </div>
                
                <div className="flex-grow overflow-y-auto divide-y divide-gray-50/70 p-2 space-y-1">
                  {chatRooms.map((room) => {
                    const isSelected = room.id === activeChatRoomId;
                    const lastMessage = room.messages[room.messages.length - 1];
                    const activeSeller = room.product.seller;
                    const tier = getSeroTier(activeSeller.trustScore);

                    return (
                      <div 
                        key={room.id}
                        onClick={() => {
                          setActiveChatRoomId(room.id);
                        }}
                        className={cn(
                          "p-3 rounded-2xl flex gap-3 items-center cursor-pointer transition-all",
                          isSelected 
                            ? "bg-teal-800 text-white shadow-md shadow-teal-900/10" 
                            : "bg-white hover:bg-gray-100/50"
                        )}
                      >
                        <div className="relative flex-shrink-0">
                          <img 
                            src={activeSeller.avatarUrl} 
                            alt={activeSeller.name} 
                            className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
                          />
                          <span className="absolute -bottom-1 -right-1 text-xs">{tier.emoji}</span>
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className={cn("font-bold text-xs truncate", isSelected ? "text-white" : "text-gray-900")}>
                              {activeSeller.name}
                            </span>
                            <span className={cn("text-[8px] font-bold uppercase", isSelected ? "text-teal-300" : "text-gray-400")}>
                              {room.isCompleted ? "✓ Completed" : activeSeller.trustScore + "%"}
                            </span>
                          </div>
                          <p className={cn("text-[10px] font-medium truncate mb-1", isSelected ? "text-teal-100" : "text-teal-800")}>
                            {room.product.title}
                          </p>
                          <p className={cn("text-[11px] truncate", isSelected ? "text-teal-100/80" : "text-gray-500")}>
                            {lastMessage ? lastMessage.text : "No messages yet"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Convo Details (Right Chat Window) */}
              {(() => {
                const currentRoom = chatRooms.find((r) => r.id === activeChatRoomId);
                if (!currentRoom) return (
                  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                    <Handshake size={48} className="text-gray-300 mb-3" />
                    <p className="text-sm font-bold text-gray-500">Select a local handshake conversation</p>
                  </div>
                );

                const activeSeller = currentRoom.product.seller;
                const tier = getSeroTier(activeSeller.trustScore);

                return (
                  <div className="flex-grow flex flex-col bg-white">
                    {/* Chat Header with Deal & Survey Button */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={activeSeller.avatarUrl} 
                          alt={activeSeller.name} 
                          className="w-10 h-10 rounded-full border border-gray-100"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-xs text-gray-900 leading-none">{activeSeller.name}</h4>
                            <span className="text-[10px] bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-tight">
                              🤝 {tier.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-teal-700 font-medium truncate max-w-[200px] mt-1">
                            Dealing: {currentRoom.product.title}
                          </p>
                        </div>
                      </div>

                      {/* Transaction Completion Button (Survey Trigger) */}
                      {currentRoom.isCompleted ? (
                        <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-2xl flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                          <ShieldCheck size={16} />
                          <span>Handshake Verified</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setSurveySeller(activeSeller);
                            setSurveyProduct(currentRoom.product);
                            setShowSurvey(true);
                          }}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-teal-950 px-4 py-2.5 rounded-2xl flex items-center gap-1.5 text-xs font-black shadow-lg hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all cursor-pointer"
                        >
                          <Handshake size={16} />
                          <span>Complete Trade & Rate</span>
                        </button>
                      )}
                    </div>

                    {/* Messages Log area */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50/30">
                      {currentRoom.messages.map((msg: any) => {
                        if (msg.sender === 'system') {
                          return (
                            <div key={msg.id} className="flex justify-center my-4">
                              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-4 py-3 rounded-2xl max-w-sm text-center text-[11px] font-bold leading-normal shadow-sm">
                                {msg.text}
                              </div>
                            </div>
                          );
                        }

                        const isMe = msg.sender === 'me';
                        return (
                          <div 
                            key={msg.id}
                            className={cn("flex gap-2.5", isMe ? "justify-end" : "justify-start")}
                          >
                            {!isMe && (
                              <img 
                                src={activeSeller.avatarUrl} 
                                alt={activeSeller.name} 
                                className="w-8 h-8 rounded-full border border-gray-100 flex-shrink-0"
                              />
                            )}
                            <div className="max-w-[70%]">
                              <div className={cn(
                                "p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm",
                                isMe 
                                  ? "bg-teal-800 text-white rounded-tr-none" 
                                  : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                              )}>
                                {msg.text}
                              </div>
                              <span className={cn("text-[9px] text-gray-400 font-bold block mt-1", isMe ? "text-right" : "text-left")}>
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat Text Input */}
                    <div className="p-3 border-t border-gray-100 flex items-center gap-2">
                      <input 
                        type="text"
                        disabled={currentRoom.isCompleted}
                        placeholder={currentRoom.isCompleted ? "This trade is completed." : "Message Kathmandu neighbor..."}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendMessage();
                        }}
                        className="flex-grow bg-gray-50 p-3 rounded-xl border-none focus:ring-1 focus:ring-teal-700 font-medium text-xs text-gray-900 disabled:opacity-50"
                      />
                      <button 
                        onClick={handleSendMessage}
                        disabled={currentRoom.isCompleted || !newMessage.trim()}
                        className="bg-teal-700 text-white px-5 py-3 rounded-xl font-bold text-xs hover:bg-teal-800 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === 'life' && (
            <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
              <div className="bg-teal-800 text-white p-6 rounded-[28px] shadow-lg relative overflow-hidden">
                <h2 className="font-black text-2xl tracking-tight mb-1">Vicinity Circles 🌱</h2>
                <p className="text-xs text-teal-100/70">Connect, interact, and organize meet-ups with trusted neighbors in your community.</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-white/15 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/5">3 Active Circles</span>
                  <span className="bg-amber-500 text-teal-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">Kathmandu Area</span>
                </div>
              </div>

              {/* Circles feed */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">KTM Techies Circle</span>
                    <span className="text-[9px] text-gray-400 font-bold">2 hours ago</span>
                  </div>
                  <h3 className="font-black text-sm text-gray-900">Weekly meet-up at Patan Cafe?</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    "Hey techies! Serofero's Kathmandu network is growing. Anyone up for a coffee chat this Thursday to talk local tech and trade safety? First 3 handshakes get free americano!"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anish" className="w-6 h-6 rounded-full" />
                      <span className="text-[10px] font-bold text-gray-600">Anish Giri (Golden Clasp 🤝)</span>
                    </div>
                    <span className="text-[10px] text-teal-800 font-extrabold bg-teal-50 px-2.5 py-1 rounded-lg cursor-pointer">Join Circle</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Lalitpur Riders</span>
                    <span className="text-[9px] text-gray-400 font-bold">Yesterday</span>
                  </div>
                  <h3 className="font-black text-sm text-gray-900">Classic 350 Group Ride to Dhulikhel</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    "Planning a warm morning cruise this Saturday. All riders who completed at least 3 Serofero handshakes are welcome. Safety gears are strictly required!"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sita" className="w-6 h-6 rounded-full" />
                      <span className="text-[10px] font-bold text-gray-600">Sita Sharma (Unshakable Bond 💎)</span>
                    </div>
                    <span className="text-[10px] text-teal-800 font-extrabold bg-teal-50 px-2.5 py-1 rounded-lg cursor-pointer">Join Circle</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 pb-24">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white p-6 rounded-[28px] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-20 h-20 bg-teal-100 rounded-full overflow-hidden border-4 border-white shadow-md flex items-center justify-center flex-shrink-0">
                    <img 
                      src={ME_USER.avatarUrl} 
                      alt={ME_USER.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-center sm:text-left flex-grow">
                    <h2 className="text-xl font-black tracking-tight">{ME_USER.name}</h2>
                    <p className="text-xs text-teal-100/80 font-medium mt-0.5">himpower2025@gmail.com</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
                      <div className="flex items-center gap-1 text-[10px] bg-white/10 text-white font-bold px-2 py-1 rounded-full">
                        <MapPin size={10} />
                        <span>{ME_USER.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] bg-white/10 text-white font-bold px-2 py-1 rounded-full">
                        <Calendar size={10} />
                        <span>Joined {ME_USER.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sero Trust Report Card */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">My Sero Trust Rating</h3>
                  <span className="text-[10px] bg-amber-500 text-teal-950 px-2.5 py-0.5 rounded-full font-black uppercase tracking-tight">
                    🤝 Unshakable Bond 💎
                  </span>
                </div>
                
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-teal-900 tracking-tight">{ME_USER.trustScore}%</span>
                  <div className="flex-grow pb-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-teal-600 rounded-full" 
                        style={{ width: `${ME_USER.trustScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-teal-50/50 p-3 rounded-2xl border border-teal-100/30">
                  <Award size={18} className="text-teal-700 flex-shrink-0" />
                  <p className="text-xs text-teal-800 font-bold">
                    Completed Handshakes: <span className="font-extrabold text-teal-950">{ME_USER.dealsCount} verified trades</span>
                  </p>
                </div>

                {/* Accolades breakdown */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2.5">Accolades Received</h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-gray-50/70 p-3 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">⏰</span>
                        <span className="text-[11px] font-bold text-gray-600">Highly Punctual</span>
                      </div>
                      <span className="text-[11px] font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">+{ME_USER.feedback.punctual}</span>
                    </div>
                    <div className="bg-gray-50/70 p-3 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">🤝</span>
                        <span className="text-[11px] font-bold text-gray-600">Super Polite</span>
                      </div>
                      <span className="text-[11px] font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">+{ME_USER.feedback.polite}</span>
                    </div>
                    <div className="bg-gray-50/70 p-3 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">🔍</span>
                        <span className="text-[11px] font-bold text-gray-600">As Described</span>
                      </div>
                      <span className="text-[11px] font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">+{ME_USER.feedback.asDescribed}</span>
                    </div>
                    <div className="bg-gray-50/70 p-3 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">💬</span>
                        <span className="text-[11px] font-bold text-gray-600">Fast Chat</span>
                      </div>
                      <span className="text-[11px] font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">+{ME_USER.feedback.fast}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Listings */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">My Listings</h3>
                  <span className="text-[10px] text-gray-400 font-extrabold">
                    {products.filter(p => p.seller.id === 'me').length} Items
                  </span>
                </div>

                <div className="space-y-3">
                  {(() => {
                    const myUploadedListings = products.filter(p => p.seller.id === 'me');
                    if (myUploadedListings.length === 0) {
                      return (
                        <div className="text-center py-8 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100">
                          <p className="text-xs text-gray-400 font-bold mb-1">No active listings yet</p>
                          <p className="text-[10px] text-gray-400">Tap the "+" button below to post your first neighborhood item!</p>
                        </div>
                      );
                    }
                    return myUploadedListings.map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-50/60 hover:bg-gray-50 transition-colors group">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-black text-xs text-gray-900 truncate">{p.title}</h4>
                          <p className="font-extrabold text-xs text-teal-800 mt-0.5">Rs. {p.price.toLocaleString()}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">{p.location}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[9px] font-black uppercase bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md">
                            On Sale
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(p.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Listing"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* My Joined Circles */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">My Circles</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-50 text-teal-800 border border-teal-100/30 text-[10px] font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1">
                    💻 KTM Techies Circle
                  </span>
                  <span className="bg-amber-50 text-amber-800 border border-amber-100/30 text-[10px] font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1">
                    🏍️ Lalitpur Riders
                  </span>
                </div>
              </div>

              {/* Version & Developer Footer */}
              <div className="pt-4 text-center space-y-4">
                <p className="text-[10px] text-gray-400 font-medium">
                  Serofero v1.0.0 • Developed by Himpower Pvt. Ltd.
                </p>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full py-4 bg-red-50 text-red-600 hover:bg-red-100/60 active:scale-95 text-xs font-black uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}


        </div>
      </main>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSelling(true)}
        className="fixed bottom-28 right-6 md:right-12 w-16 h-16 bg-teal-700 text-white rounded-2xl shadow-2xl shadow-teal-200 flex items-center justify-center z-30 border-4 border-white"
      >
        <Plus size={32} />
      </motion.button>

      {/* Sell Screen Overlay */}
      <AnimatePresence>
        {isSelling && (
          <SellScreen 
            onBack={() => setIsSelling(false)} 
            onSubmit={(newProdData) => {
              const newProduct: Product = {
                id: `my-uploaded-${Date.now()}`,
                title: newProdData.title,
                price: newProdData.price,
                isNegotiable: newProdData.isNegotiable,
                location: newProdData.location,
                category: newProdData.category,
                imageUrl: newProdData.imageUrl,
                timeAgo: 'Just now',
                likes: 0,
                chats: 0,
                offersCount: 0,
                seller: ME_USER,
                description: newProdData.description
              };
              setProducts(prev => [newProduct, ...prev]);
              triggerPushNotification(
                "🎉 Item Listed Successfully!",
                `"${newProdData.title}" is now live in Kathmandu vicinity.`
              );
            }}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Centered on wide screens */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-40">
        <div className="max-w-md mx-auto px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('home')}
            className={cn("flex flex-col items-center gap-1.5", activeTab === 'home' ? "text-teal-700" : "text-gray-300")}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">Feed</span>
          </button>
          <button 
            onClick={() => setActiveTab('life')}
            className={cn("flex flex-col items-center gap-1.5", activeTab === 'life' ? "text-teal-700" : "text-gray-300")}
          >
            <Users size={24} strokeWidth={activeTab === 'life' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">Circles</span>
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={cn("flex flex-col items-center gap-1.5", activeTab === 'chat' ? "text-teal-700" : "text-gray-300")}
          >
            <MessageCircle size={24} strokeWidth={activeTab === 'chat' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">Chat</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={cn("flex flex-col items-center gap-1.5", activeTab === 'profile' ? "text-teal-700" : "text-gray-300")}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">Me</span>
          </button>
        </div>
      </nav>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      {/* Serofero Mutual Review Survey Modal */}
      <AnimatePresence>
        {showSurvey && surveySeller && surveyProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 flex flex-col my-8"
            >
              {/* Top Banner */}
              <div className="bg-teal-800 text-white p-6 relative">
                <button 
                  onClick={() => setShowSurvey(false)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-teal-300 mb-1">
                  <Handshake size={14} className="text-amber-400" />
                  <span>Sero Trust Verification</span>
                </div>
                <h3 className="text-xl font-black tracking-tight mt-1">Sero Handshake Review</h3>
                <p className="text-xs text-teal-100/70 mt-1">Verify your deal with {surveySeller.name} for "{surveyProduct.title}"</p>
              </div>

              {/* Multi-step survey wizard form */}
              <SurveyWizard 
                sellerName={surveySeller.name}
                onSubmit={(rating, accolades, comment) => {
                  handleCompleteSurvey(rating, accolades, comment);
                }}
                onCancel={() => setShowSurvey(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
