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
  Calendar,
  Lock,
  ShoppingCart,
  BellRing
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
  buyerName,
  onSubmit, 
  onCancel 
}: { 
  sellerName: string; 
  buyerName: string;
  onSubmit: (
    buyerRatings: { q1: number; q2: number; q3: number; q4: number; comment: string },
    sellerRatings: { q1: number; q2: number; comment: string }
  ) => void; 
  onCancel: () => void; 
}) => {
  const [step, setStep] = useState(1);
  
  // Buyer Ratings
  const [buyerQ1, setBuyerQ1] = useState(5);
  const [buyerQ2, setBuyerQ2] = useState(5);
  const [buyerQ3, setBuyerQ3] = useState(5);
  const [buyerQ4, setBuyerQ4] = useState(5);
  const [buyerComment, setBuyerComment] = useState('');

  // Seller Ratings
  const [sellerQ1, setSellerQ1] = useState(5);
  const [sellerQ2, setSellerQ2] = useState(5);
  const [sellerComment, setSellerComment] = useState('');

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(
        { q1: buyerQ1, q2: buyerQ2, q3: buyerQ3, q4: buyerQ4, comment: buyerComment },
        { q1: sellerQ1, q2: sellerQ2, comment: sellerComment }
      );
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(1);
    }
  };

  return (
    <div className="p-6 flex flex-col space-y-6">
      {/* Progress indicators */}
      <div className="flex items-center justify-between px-2">
        {[1, 2].map((num) => (
          <div key={num} className="flex items-center gap-1.5 flex-1 justify-center">
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
              {num === 1 ? "Buyer's Review" : "Seller's Review"}
            </span>
            {num === 1 && <div className="w-12 h-0.5 bg-gray-100 mx-2" />}
          </div>
        ))}
      </div>

      {/* Step Contents */}
      {step === 1 ? (
        <div className="space-y-5 animate-fadeIn">
          <div className="text-center pb-2">
            <p className="text-xs font-black uppercase tracking-wider text-teal-800">
              Buyer's Feedback on Seller
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Please evaluate the seller, <strong className="text-gray-750">{sellerName}</strong>.
            </p>
          </div>

          <div className="space-y-4">
            {/* Q1 */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                1. Is the seller's item condition identical to the photos?
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (판매자의 물건 상태는 사진과 똑같은가요?)
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setBuyerQ1(star)}
                    className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Star
                      size={22}
                      className={cn(
                        "transition-colors",
                        star <= buyerQ1 ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-amber-600 ml-2">{buyerQ1} / 5</span>
              </div>
            </div>

            {/* Q2 */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                2. Did the seller keep the time appointment well?
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (시간 약속은 잘 지켰나요?)
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setBuyerQ2(star)}
                    className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Star
                      size={22}
                      className={cn(
                        "transition-colors",
                        star <= buyerQ2 ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-amber-600 ml-2">{buyerQ2} / 5</span>
              </div>
            </div>

            {/* Q3 */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                3. Was the seller's item sale price reasonable?
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (판매자의 물건 판매 가격은 적당한가요?)
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setBuyerQ3(star)}
                    className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Star
                      size={22}
                      className={cn(
                        "transition-colors",
                        star <= buyerQ3 ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-amber-600 ml-2">{buyerQ3} / 5</span>
              </div>
            </div>

            {/* Q4 */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                4. Was the seller polite and friendly to you?
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (구매자에게 친절하게 대했나요?)
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setBuyerQ4(star)}
                    className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Star
                      size={22}
                      className={cn(
                        "transition-colors",
                        star <= buyerQ4 ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-amber-600 ml-2">{buyerQ4} / 5</span>
              </div>
            </div>

            {/* Q5 - Text Area */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                5. Additional Comments (Optional)
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (기타 의견)
              </p>
              <textarea 
                rows={2}
                placeholder="Write any additional feedback for the seller..."
                value={buyerComment}
                onChange={(e) => setBuyerComment(e.target.value)}
                className="w-full p-3 bg-white rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-700 font-medium text-xs placeholder:text-gray-300 text-gray-900"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-fadeIn">
          <div className="text-center pb-2">
            <p className="text-xs font-black uppercase tracking-wider text-teal-800">
              Seller's Feedback on Buyer
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Please evaluate the buyer, <strong className="text-gray-750">{buyerName}</strong>.
            </p>
          </div>

          <div className="space-y-4">
            {/* Q1 */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                1. Did the buyer keep the time appointment well?
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (시간 약속은 잘 지켰나요?)
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSellerQ1(star)}
                    className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Star
                      size={22}
                      className={cn(
                        "transition-colors",
                        star <= sellerQ1 ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-amber-600 ml-2">{sellerQ1} / 5</span>
              </div>
            </div>

            {/* Q2 */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                2. Was the buyer polite and friendly to you?
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (판매자에게 친절하게 대했나요?)
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSellerQ2(star)}
                    className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Star
                      size={22}
                      className={cn(
                        "transition-colors",
                        star <= sellerQ2 ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs font-black text-amber-600 ml-2">{sellerQ2} / 5</span>
              </div>
            </div>

            {/* Q3 - Text Area */}
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 space-y-2">
              <span className="text-xs font-black text-gray-800 block leading-tight">
                3. Additional Comments (Optional)
              </span>
              <p className="text-[10px] text-gray-400 font-bold -mt-1 italic">
                (기타 의견)
              </p>
              <textarea 
                rows={2}
                placeholder="Write any additional feedback for the buyer..."
                value={sellerComment}
                onChange={(e) => setSellerComment(e.target.value)}
                className="w-full p-3 bg-white rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-700 font-medium text-xs placeholder:text-gray-300 text-gray-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        {step > 1 && (
          <button 
            type="button"
            onClick={handlePrev}
            className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all"
          >
            Back
          </button>
        )}
        <button 
          type="button"
          onClick={handleNext}
          className="flex-[2] py-4 bg-teal-800 hover:bg-teal-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all"
        >
          {step === 2 ? "Submit & Shake Hands" : "Continue"}
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
      className="flex sm:flex-col gap-4 p-4 sm:p-0 bg-white rounded-[24px] sm:overflow-hidden border border-gray-100/70 sm:border-gray-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-24 sm:w-full sm:h-44 sm:aspect-[4/3] flex-shrink-0 bg-gray-50 rounded-2xl sm:rounded-none overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {product.isNegotiable && (
          <div className="absolute top-2 left-2 bg-amber-500 text-teal-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
            🤝 NEGOTIABLE
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full">
          {product.category}
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-col justify-between flex-grow sm:p-4 py-1 min-w-0">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md uppercase tracking-wider truncate max-w-[120px]">
              {product.seller.communities[0]}
            </span>
            <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">{product.timeAgo}</span>
          </div>

          <h3 className="text-sm md:text-base font-extrabold text-gray-900 line-clamp-2 leading-tight mb-1">
            {product.title}
          </h3>

          <div className="flex items-center text-xs text-gray-500 gap-1 font-medium">
            <span>{product.location}</span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-3 pt-2.5 border-t border-gray-50">
          <div>
            <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider block">Price</span>
            <span className="text-base font-black text-teal-800">Rs. {product.price.toLocaleString()}</span>
          </div>

          <div className="flex gap-2.5 text-gray-400">
            {product.isNegotiable && product.offersCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-lg">
                <Handshake size={12} />
                <span>{product.offersCount}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-xs">
              <MessageCircle size={14} />
              <span className="font-bold">{product.chats}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Heart size={14} />
              <span className="font-bold">{product.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetail = ({ 
  product, 
  onBack,
  isInCart,
  onToggleCart,
  onStartChat
}: { 
  product: Product; 
  onBack: () => void;
  isInCart: boolean;
  onToggleCart: () => void;
  onStartChat: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6 overflow-y-auto">
      {/* Dim Background click back */}
      <div className="absolute inset-0" onClick={onBack} />

      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden z-10"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md flex items-center justify-between p-4 border-b border-gray-50">
          <button onClick={onBack} className="p-2.5 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 text-xs font-black uppercase text-gray-700">
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <div className="flex gap-2">
            <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-950">
              <Share2 size={20} />
            </button>
            <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-950">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Details Area */}
        <div className="flex-grow overflow-y-auto">
          {/* Main Photo */}
          <div className="w-full aspect-square relative sm:max-h-[380px] bg-gray-50">
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isSold && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-red-600 text-white font-black text-lg px-6 py-2.5 rounded-2xl uppercase tracking-widest shadow-xl">
                  🚫 Sold Out (판매 완료)
                </span>
              </div>
            )}
          </div>

          {/* Seller Trust Area */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-3">
              <img 
                src={product.seller.avatarUrl} 
                alt={product.seller.name}
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              />
              <div>
                <h4 className="font-black text-gray-900 flex items-center gap-1.5 text-sm md:text-base">
                  {product.seller.name}
                  {product.seller.trustScore > 90 && <Star size={14} fill="#fbbf24" className="text-amber-500" />}
                </h4>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
                  {product.seller.communities.join(' • ')}
                </p>
              </div>
            </div>
            <TrustScore score={product.seller.trustScore} seller={product.seller} />
          </div>

          {/* Title & Description */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center text-xs text-teal-800 font-extrabold gap-2 mb-2">
                <span className="bg-teal-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">{product.category}</span>
                <span>•</span>
                <span className="text-gray-400 font-medium">{product.timeAgo}</span>
                {isInCart && (
                  <>
                    <span>•</span>
                    <span className="text-rose-600 font-black flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-md text-[10px]">
                      ❤️ In Cart (장바구니 담김)
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-black px-2 py-0.5 rounded-md">
                    📉 Price Dropped! (Rs. {(product.originalPrice - product.price).toLocaleString()} Off)
                  </span>
                </div>
              )}
            </div>

            {/* Safety Box */}
            <div className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-5 rounded-2xl border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-900 font-black mb-2 text-xs uppercase tracking-wider">
                <ShieldCheck size={18} className="text-amber-600" />
                <span>Safe Handshake Protocol</span>
              </div>
              <ul className="text-xs text-amber-800 space-y-1.5 list-disc list-inside font-medium leading-relaxed">
                <li>Meet in a busy public place (e.g., Mall, Cafe, or Hub).</li>
                <li>Verify item condition carefully before concluding the handshake.</li>
                <li>Cash on delivery only. Never pay before viewing the product.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Description</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium whitespace-pre-line">
                {product.description || "No description provided."}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold pt-4 border-t border-gray-100">
              <Info size={14} />
              <span>Listed in {product.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex items-center gap-4 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <button 
            onClick={onToggleCart}
            className={cn(
              "p-3 active:scale-95 transition-all border rounded-2xl flex items-center justify-center relative",
              isInCart 
                ? "bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100/50" 
                : "bg-white border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-gray-50"
            )}
            title={isInCart ? "Remove from Cart" : "Add to Cart"}
          >
            <Heart size={24} fill={isInCart ? "#f43f5e" : "none"} className={isInCart ? "text-rose-500 animate-pulse" : ""} />
          </button>
          
          <div className="flex-grow">
            <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider block">Price</span>
            <div className="text-xl font-black text-teal-800 leading-none mt-0.5 flex items-center gap-1.5">
              Rs. {product.price.toLocaleString()}
            </div>
          </div>
          
          <div className="flex gap-2">
            {product.isNegotiable && !product.isSold && (
              <button className="bg-amber-50 hover:bg-amber-100 text-amber-800 px-5 py-3.5 rounded-2xl font-black text-xs active:scale-95 transition-all flex items-center gap-1.5 border border-amber-100/30">
                <Handshake size={16} />
                Offer
              </button>
            )}
            <button 
              onClick={onStartChat}
              disabled={product.isSold}
              className="bg-teal-700 hover:bg-teal-800 text-white px-7 py-3.5 rounded-2xl font-black text-xs active:scale-95 transition-all shadow-md shadow-teal-700/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.isSold ? "Sold Out" : "Chat"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
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
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6 overflow-y-auto">
      <div className="absolute inset-0" onClick={onBack} />
      
      <motion.div 
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden z-10"
      >
        <header className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-gray-950 transition-colors">
            <X size={24} />
          </button>
          <h2 className="font-black text-lg tracking-tight text-gray-900">Sell Item</h2>
          <button 
            disabled={!isFormValid}
            className={cn(
              "px-6 py-2 rounded-full font-black text-sm transition-all",
              isFormValid ? "bg-teal-700 text-white shadow-lg active:scale-95" : "bg-gray-100 text-gray-400 cursor-not-allowed"
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

        <div className="flex-grow overflow-y-auto p-6 space-y-6 pb-12">
          {/* Photo Section */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">Photos ({photos.length}/4)</h3>
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
                <div className="relative">
                  <select 
                    className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 font-bold text-gray-900 appearance-none cursor-pointer"
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
                type="button"
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
                type="button"
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
              rows={4}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-900 placeholder:text-gray-300 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>
        </div>
      </motion.div>
    </div>
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

// --- Custom Avatar Generator & Options ---

export interface AvatarOptions {
  gender: 'male' | 'female';
  hair: number;   // 1 to 5
  skin: number;   // 1 to 5
  face: number;   // 1 to 5
  outfit: number; // 1 to 10
}

export const renderAvatarSvg = (options: AvatarOptions): string => {
  const { gender, hair, skin, face, outfit } = options;

  // 1. Skin Tones (5 options)
  const skinColors = ["#FFDBAC", "#F1C27D", "#E0AC69", "#C68642", "#8D5524"];
  const skinColor = skinColors[skin - 1] || skinColors[1];

  // 2. Hair Colors
  const hairColor = gender === 'male' 
    ? ["#2d2013", "#1a1105", "#120c06", "#271a0c", "#3d2b1f"][hair - 1] || "#1a1105"
    : ["#2c1a11", "#3d2419", "#1a110a", "#2b1a0e", "#442a1d"][hair - 1] || "#1a110a";

  // 3. Outfit Styles (10 options)
  let outfitSvg = '';
  switch (outfit) {
    case 1: // Teal Hoodie
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#0d9488" />
        <circle cx="50" cy="85" r="5" fill="#0f766e" />
        <path d="M48 85 L44 95 M52 85 L56 95" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
      `;
      break;
    case 2: // Amber Varsity Jacket
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#d97706" />
        <path d="M42 75 L50 95 L58 75 Z" fill="#ffffff" />
        <path d="M50 78 L50 95" stroke="#1e293b" stroke-width="2" stroke-dasharray="3,3" />
        <circle cx="50" cy="84" r="2" fill="#1e293b" />
        <circle cx="50" cy="90" r="2" fill="#1e293b" />
      `;
      break;
    case 3: // Classic Striped Tee
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#f8fafc" />
        <path d="M18 82 L82 82" stroke="#1e3a8a" stroke-width="4" />
        <path d="M16 88 L84 88" stroke="#1e3a8a" stroke-width="4" />
        <path d="M15 94 L85 94" stroke="#1e3a8a" stroke-width="4" />
      `;
      break;
    case 4: // Business Blazer
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#1e1b4b" />
        <path d="M38 74 L50 95 L62 74 Z" fill="#ffffff" />
        <path d="M46 76 L50 95 L54 76 Z" fill="#dc2626" />
        <path d="M35 74 L50 88 L65 74" fill="none" stroke="#1e1b4b" stroke-width="4" />
      `;
      break;
    case 5: // Denim Jacket
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#2563eb" />
        <path d="M35 74 L50 95 L65 74 Z" fill="#1d4ed8" opacity="0.5" />
        <path d="M30 80 L38 80 M70 80 L62 80" stroke="#f59e0b" stroke-width="1.5" />
        <circle cx="34" cy="80" r="1.5" fill="#f59e0b" />
        <circle cx="66" cy="80" r="1.5" fill="#f59e0b" />
      `;
      break;
    case 6: // Red Cozy Sweater
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#be123c" />
        <path d="M30 78 Q35 74 40 78 T50 78 T60 78 T70 78" fill="none" stroke="#9f1239" stroke-width="2" />
        <path d="M25 86 Q35 82 45 86 T65 86 T75 86" fill="none" stroke="#9f1239" stroke-width="2" />
        <path d="M20 94 Q35 90 50 94 T80 94" fill="none" stroke="#9f1239" stroke-width="2" />
      `;
      break;
    case 7: // Black Leather Jacket
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#1e293b" />
        <path d="M34 74 L50 92 L66 74" fill="none" stroke="#0f172a" stroke-width="5" />
        <path d="M47 78 L47 95" stroke="#94a3b8" stroke-width="2" />
        <circle cx="34" cy="84" r="2.5" fill="#64748b" />
        <circle cx="66" cy="84" r="2.5" fill="#64748b" />
      `;
      break;
    case 8: // Hawaiian Shirt
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#059669" />
        <circle cx="32" cy="84" r="4" fill="#fbbf24" opacity="0.8" />
        <circle cx="32" cy="84" r="1.5" fill="#ffffff" />
        <circle cx="68" cy="86" r="4" fill="#fbbf24" opacity="0.8" />
        <circle cx="68" cy="86" r="1.5" fill="#ffffff" />
        <circle cx="50" cy="92" r="5" fill="#f87171" opacity="0.8" />
        <circle cx="50" cy="92" r="1.5" fill="#ffffff" />
      `;
      break;
    case 9: // Athletic Jersey
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#ea580c" />
        <path d="M32 74 L50 82 L68 74 Z" fill="#ffffff" />
        <text x="50" y="93" fill="#ffffff" font-family="system-ui" font-weight="900" font-size="14" text-anchor="middle">25</text>
      `;
      break;
    case 10: // Yellow Raincoat
      outfitSvg = `
        <path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#eab308" />
        <path d="M48 72 L48 95" stroke="#ca8a04" stroke-width="3" stroke-linecap="round" />
        <circle cx="48" cy="80" r="2" fill="#ca8a04" />
        <circle cx="48" cy="88" r="2" fill="#ca8a04" />
        <path d="M30 73 C 35 68, 65 68, 70 73" fill="none" stroke="#eab308" stroke-width="6" stroke-linecap="round" />
      `;
      break;
    default:
      outfitSvg = `<path d="M15 95 C 15 75, 85 75, 85 95 Z" fill="#0d9488" />`;
  }

  // 4. Face/Eyes/Blush 5 styles
  let faceSvg = '';
  switch (face) {
    case 1: // Cute & Simple
      faceSvg = `
        <circle cx="42" cy="48" r="3" fill="#1e293b" />
        <circle cx="58" cy="48" r="3" fill="#1e293b" />
        <path d="M45 56 Q50 60 55 56" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="34" cy="53" r="2.5" fill="#f43f5e" opacity="0.3" />
        <circle cx="66" cy="53" r="2.5" fill="#f43f5e" opacity="0.3" />
      `;
      break;
    case 2: // Friendly with Glasses
      faceSvg = `
        <circle cx="40" cy="47" r="7" fill="none" stroke="#0f172a" stroke-width="2.5" />
        <circle cx="60" cy="47" r="7" fill="none" stroke="#0f172a" stroke-width="2.5" />
        <path d="M47 47 L53 47" stroke="#0f172a" stroke-width="2.5" />
        <circle cx="40" cy="47" r="1.5" fill="#0f172a" />
        <circle cx="60" cy="47" r="1.5" fill="#0f172a" />
        <path d="M45 56 Q50 63 55 56 Z" fill="#e11d48" />
      `;
      break;
    case 3: // Playful Wink
      faceSvg = `
        <path d="M37 48 Q41 44 44 48" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
        <circle cx="58" cy="48" r="3" fill="#1e293b" />
        <path d="M45 56 Q50 59 55 56" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" />
        <path d="M48 57 C 48 62, 52 62, 52 57 Z" fill="#fb7185" />
      `;
      break;
    case 4: // Cool Sunglasses
      faceSvg = `
        <path d="M31 43 L69 43 C69 43, 71 52, 60 52 L55 47 L45 47 L40 52 C29 52, 31 43, 31 43 Z" fill="#0f172a" />
        <path d="M46 57 Q52 55 55 58" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" />
      `;
      break;
    case 5: // Shy Happy (Closed eyes)
      faceSvg = `
        <path d="M36 49 Q41 44 44 49" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
        <path d="M56 49 Q59 44 64 49" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
        <circle cx="34" cy="53" r="4" fill="#f43f5e" opacity="0.5" />
        <circle cx="66" cy="53" r="4" fill="#f43f5e" opacity="0.5" />
        <path d="M47 56 Q50 58 53 56" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" />
      `;
      break;
  }

  // 5. Hair Styles (Male/Female split)
  let hairSvg = '';
  if (gender === 'male') {
    switch (hair) {
      case 1: // Spiky Short
        hairSvg = `
          <path d="M24 38 L25 28 L31 32 L35 21 L41 26 L48 16 L55 26 L61 19 L66 29 L71 24 L76 33 L76 43 L72 43 L69 35 L31 35 L28 43 Z" fill="${hairColor}" />
        `;
        break;
      case 2: // Classic Side Part
        hairSvg = `
          <path d="M23 38 C 23 21, 60 17, 77 31 C 79 33, 77 44, 77 44 L71 39 C 61 35, 39 35, 29 44 Z" fill="${hairColor}" />
        `;
        break;
      case 3: // Curly Afro
        hairSvg = `
          <path d="M21 39 C15 35, 15 22, 25 18 C29 10, 44 10, 50 14 C56 8, 70 10, 74 18 C84 22, 84 35, 78 39 L74 43 C60 37, 40 37, 25 43 Z" fill="${hairColor}" />
        `;
        break;
      case 4: // Cool Beanie Hat
        hairSvg = `
          <path d="M25 36 L28 45 L32 45 L30 36 Z" fill="${hairColor}" />
          <path d="M75 36 L72 45 L68 45 L70 36 Z" fill="${hairColor}" />
          <path d="M23 37 C 23 16, 77 16, 77 37 Z" fill="#0f766e" />
          <path d="M21 37 L79 37 L79 41 L21 41 Z" fill="#0d9488" rx="2" />
        `;
        break;
      case 5: // Top Knot / Undercut
        hairSvg = `
          <circle cx="50" cy="14" r="6" fill="${hairColor}" />
          <path d="M25 38 L29 38 L31 32 Q50 32 69 32 L71 38 L75 38 C77 38, 77 42, 73 42 C67 42, 33 42, 27 42 C23 42, 23 38, 25 38 Z" fill="${hairColor}" />
        `;
        break;
    }
  } else {
    // Female Hair Styles
    switch (hair) {
      case 1: // Long Bangs
        hairSvg = `
          <path d="M23 38 C 23 28, 77 28, 77 38 L77 75 C77 75, 73 75, 73 43 L69 43 C 65 33, 35 33, 31 43 L27 43 C 27 75, 23 75, 23 75 Z" fill="${hairColor}" />
          <path d="M27 34 C 29 22, 71 22, 73 34 C 73 34, 69 39, 61 39 C 53 39, 47 38, 39 39 C 31 39, 27 34, 27 34 Z" fill="${hairColor}" />
        `;
        break;
      case 2: // Bob Cut
        hairSvg = `
          <path d="M22 42 C 20 31, 29 19, 50 19 C 71 19, 80 31, 78 42 L78 60 C 78 62, 74 62, 74 52 C 72 40, 28 40, 26 52 C 26 62, 22 62, 22 60 Z" fill="${hairColor}" />
        `;
        break;
      case 3: // Double Buns
        hairSvg = `
          <circle cx="23" cy="21" r="9" fill="${hairColor}" />
          <circle cx="77" cy="21" r="9" fill="${hairColor}" />
          <path d="M23 38 C 23 23, 77 23, 77 38 C 77 42, 71 40, 61 40 C 51 40, 39 40, 23 38 Z" fill="${hairColor}" />
        `;
        break;
      case 4: // Ponytail
        hairSvg = `
          <rect x="67" y="23" width="7" height="4" rx="1.5" fill="#ec4899" />
          <path d="M71 25 C 83 25, 87 41, 81 53 C 79 49, 75 37, 69 31 Z" fill="${hairColor}" />
          <path d="M23 38 C 23 22, 77 22, 77 38 C 77 38, 71 36, 61 36 C 51 36, 39 36, 23 38 Z" fill="${hairColor}" />
        `;
        break;
      case 5: // Wavy Flow
        hairSvg = `
          <path d="M21 40 C17 34, 17 18, 50 16 C83 18, 83 34, 79 40 L81 64 C81 70, 75 70, 73 56 C71 42, 29 42, 27 56 C25 70, 19 70, 19 64 Z" fill="${hairColor}" />
          <path d="M27 36 C39 34, 61 34, 73 36 C73 36, 69 39, 61 39 C53 39, 47 38, 39 39 Z" fill="${hairColor}" />
        `;
        break;
    }
  }

  return `
    <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="circle-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="2" />
      <g clip-path="url(#circle-clip)">
        <rect x="44" y="62" width="12" height="15" fill="${skinColor}" rx="2" />
        <path d="M44 68 Q50 71 56 68" fill="none" stroke="#000000" stroke-width="1.5" opacity="0.1" />
        <circle cx="50" cy="48" r="23" fill="${skinColor}" />
        <circle cx="26" cy="48" r="4.5" fill="${skinColor}" />
        <circle cx="74" cy="48" r="4.5" fill="${skinColor}" />
        ${faceSvg}
        ${hairSvg}
        ${outfitSvg}
      </g>
    </svg>
  `.trim().replace(/>\s+</g, '><');
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
  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // --- Cart/Saved Items State ---
  const [cart, setCart] = useState<string[]>(() => {
    const saved = localStorage.getItem('sero_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const toggleCart = (productId: string) => {
    const isIn = cart.includes(productId);
    let newCart: string[];
    const product = products.find(p => p.id === productId);
    if (isIn) {
      newCart = cart.filter(id => id !== productId);
      if (product) {
        triggerPushNotification(
          "💔 Cart Updated (관심목록 해제)",
          `"${product.title}"을(를) 관심목록에서 제거했습니다.`
        );
      }
    } else {
      newCart = [...cart, productId];
      if (product) {
        triggerPushNotification(
          "🛒 Cart Added (관심목록 추가)",
          `"${product.title}"을(를) 관심목록에 담았습니다. 가격 인하 및 판매 완료 알림을 받게 됩니다.`
        );
      }
    }
    setCart(newCart);
    localStorage.setItem('sero_cart', JSON.stringify(newCart));
  };

  const handleStartChatForProduct = (prod: Product) => {
    const existingRoom = chatRooms.find(r => r.product.id === prod.id && r.product.seller.id === prod.seller.id);
    if (existingRoom) {
      setActiveChatRoomId(existingRoom.id);
      setActiveTab('chat');
      setSelectedProduct(null);
      setMobileShowConvo(true);
    } else {
      const newRoomId = `chat-room-${Date.now()}`;
      const newRoom = {
        id: newRoomId,
        product: prod,
        messages: [
          {
            id: `sys-${Date.now()}`,
            sender: 'system',
            text: `🤝 New vicinity handshake discussion initiated for "${prod.title}"! Ask about item inspection or coordinate meetup points.`,
            time: "Just now"
          },
          {
            id: `msg-${Date.now()}`,
            sender: 'them',
            text: `Hello! I see you are interested in my ${prod.title}. Is there any specific neighborhood handshake spot you prefer?`,
            time: "Just now"
          }
        ],
        isCompleted: false
      };
      setChatRooms(prev => [newRoom, ...prev]);
      setActiveChatRoomId(newRoomId);
      setActiveTab('chat');
      setSelectedProduct(null);
      setMobileShowConvo(true);
    }
  };

  // Simulator to trigger Price Drop of a product
  const simulatePriceDrop = (productId: string) => {
    setProducts(prevProducts => {
      const updated = prevProducts.map(p => {
        if (p.id === productId) {
          const originalPrice = p.originalPrice || p.price;
          const newPrice = Math.round(p.price * 0.9);
          
          triggerPushNotification(
            "📉 가격 인하 알림! (Price Drop)",
            `장바구니에 담아둔 "${p.title}"의 가격이 Rs. ${p.price.toLocaleString()}에서 Rs. ${newPrice.toLocaleString()}으로 인하되었습니다!`
          );
          
          return {
            ...p,
            price: newPrice,
            originalPrice: originalPrice
          };
        }
        return p;
      });
      return updated;
    });

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => {
        if (!prev) return null;
        return {
          ...prev,
          price: Math.round(prev.price * 0.9),
          originalPrice: prev.originalPrice || prev.price
        };
      });
    }
  };

  // Simulator to trigger Sold status of a product
  const simulateSoldOut = (productId: string) => {
    setProducts(prevProducts => {
      const updated = prevProducts.map(p => {
        if (p.id === productId) {
          triggerPushNotification(
            "🚫 판매 완료 알림! (Sold Out)",
            `아쉽게도 장바구니에 담아둔 "${p.title}"이(가) 다른 이웃에게 판매되었습니다.`
          );
          return {
            ...p,
            isSold: true
          };
        }
        return p;
      });
      return updated;
    });

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isSold: true
        };
      });
    }
  };

  // Reset simulator
  const simulateResetProduct = (productId: string) => {
    const originalProd = [INITIAL_MY_PRODUCT, ...MOCK_PRODUCTS].find(p => p.id === productId);
    const fallbackPrice = originalProd ? originalProd.price : 1000;
    
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            price: fallbackPrice,
            originalPrice: undefined,
            isSold: false
          };
        }
        return p;
      });
    });

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => {
        if (!prev) return null;
        return {
          ...prev,
          price: fallbackPrice,
          originalPrice: undefined,
          isSold: false
        };
      });
    }

    triggerPushNotification(
      "🔄 Status Reset (원래대로 복구)",
      `상품 상태 및 가격이 성공적으로 복구되었습니다.`
    );
  };

  // --- Avatar Creator States ---
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(() => {
    const saved = localStorage.getItem('sero_avatar_options');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { gender: 'male', hair: 1, skin: 2, face: 1, outfit: 1 };
  });

  const [myAvatarUrl, setMyAvatarUrl] = useState(() => {
    const saved = localStorage.getItem('sero_avatar_url');
    if (saved) return saved;
    // Default initial avatar matching the initial options
    const defaultSvg = renderAvatarSvg({ gender: 'male', hair: 1, skin: 2, face: 1, outfit: 1 });
    return `data:image/svg+xml;utf8,${encodeURIComponent(defaultSvg)}`;
  });

  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [tempAvatarOptions, setTempAvatarOptions] = useState<AvatarOptions>(avatarOptions);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const openAvatarCreator = () => {
    setTempAvatarOptions({ ...avatarOptions });
    setShowAvatarCreator(true);
  };

  // Dynamic products state to support live trust score changes on review
  const [products, setProducts] = useState<Product[]>([INITIAL_MY_PRODUCT, ...MOCK_PRODUCTS]);

  // Sync avatar changes back to ME_USER and product seller instances dynamically
  useEffect(() => {
    ME_USER.avatarUrl = myAvatarUrl;
    localStorage.setItem('sero_avatar_url', myAvatarUrl);
    localStorage.setItem('sero_avatar_options', JSON.stringify(avatarOptions));

    setProducts(prev => prev.map(p => {
      if (p.seller.id === 'me') {
        return {
          ...p,
          seller: {
            ...p.seller,
            avatarUrl: myAvatarUrl
          }
        };
      }
      return p;
    }));
  }, [myAvatarUrl]);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveySeller, setSurveySeller] = useState<any | null>(null);
  const [surveyProduct, setSurveyProduct] = useState<any | null>(null);
  const [activeChatRoomId, setActiveChatRoomId] = useState<string>('c1');
  const [mobileShowConvo, setMobileShowConvo] = useState(false);
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

  // Complete trade survey handler to dynamically update trust score & feed accolades for both parties
  const handleCompleteSurvey = (
    buyerRatings: { q1: number; q2: number; q3: number; q4: number; comment: string },
    sellerRatings: { q1: number; q2: number; comment: string }
  ) => {
    // 1. Calculate Seller score change based on Buyer's evaluation
    const sellerAvg = (buyerRatings.q1 + buyerRatings.q2 + buyerRatings.q3 + buyerRatings.q4) / 4;
    let sellerScoreChange = 0.5;
    if (sellerAvg >= 4.5) sellerScoreChange = 2.5;
    else if (sellerAvg < 3.0) sellerScoreChange = -4.0;

    // 2. Calculate Buyer score change based on Seller's evaluation
    const buyerAvg = (sellerRatings.q1 + sellerRatings.q2) / 2;
    let buyerScoreChange = 0.5;
    if (buyerAvg >= 4.5) buyerScoreChange = 2.5;
    else if (buyerAvg < 3.0) buyerScoreChange = -4.0;

    if (surveyProduct && surveySeller) {
      const isMeSeller = surveyProduct.seller.id === 'me';

      // 3. Update products and seller trust metrics
      setProducts(prevProducts => {
        return prevProducts.map(p => {
          if (p.seller.id === surveySeller.id) {
            const currentScore = p.seller.trustScore;
            const appliedChange = isMeSeller ? buyerScoreChange : sellerScoreChange;
            const newScore = Math.min(100, Math.max(0, Math.round(currentScore + appliedChange)));
            
            const currentFeedback = p.seller.feedback || { punctual: 10, polite: 10, asDescribed: 10, fast: 10 };
            const newFeedback = { ...currentFeedback };
            
            if (isMeSeller) {
              // Other person was buyer. Update their stats
              if (sellerRatings.q1 >= 4) newFeedback.punctual += 1;
              if (sellerRatings.q2 >= 4) newFeedback.polite += 1;
            } else {
              // Other person was seller. Update their stats
              if (buyerRatings.q1 >= 4) newFeedback.asDescribed += 1;
              if (buyerRatings.q2 >= 4) newFeedback.punctual += 1;
              if (buyerRatings.q4 >= 4) newFeedback.polite += 1;
            }

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

      // 4. Update ME_USER (the logged-in user) trust metrics dynamically as well!
      const myAppliedChange = isMeSeller ? sellerScoreChange : buyerScoreChange;
      ME_USER.trustScore = Math.min(100, Math.max(0, Math.round(ME_USER.trustScore + myAppliedChange)));
      ME_USER.dealsCount = (ME_USER.dealsCount || 0) + 1;
      
      if (isMeSeller) {
        // me is the seller. Increment me's accolades based on buyer's evaluation
        if (buyerRatings.q1 >= 4) ME_USER.feedback.asDescribed += 1;
        if (buyerRatings.q2 >= 4) ME_USER.feedback.punctual += 1;
        if (buyerRatings.q4 >= 4) ME_USER.feedback.polite += 1;
      } else {
        // me is the buyer. Increment me's accolades based on seller's evaluation
        if (sellerRatings.q1 >= 4) ME_USER.feedback.punctual += 1;
        if (sellerRatings.q2 >= 4) ME_USER.feedback.polite += 1;
      }

      // 5. Generate beautiful summaries for chat verification ledger
      const buyerText = `⭐ Buyer evaluated Seller: [Item Match: ${buyerRatings.q1}/5, Punctual: ${buyerRatings.q2}/5, Price: ${buyerRatings.q3}/5, Friendly: ${buyerRatings.q4}/5] comments: "${buyerRatings.comment || "Perfect handshake exchange!"}"`;
      const sellerText = `⭐ Seller evaluated Buyer: [Punctual: ${sellerRatings.q1}/5, Friendly: ${sellerRatings.q2}/5] comments: "${sellerRatings.comment || "Polite neighbor, smooth deal!"}"`;

      // Mark specific chat room as completed & insert verified ledger bubble
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
                  text: `🤝 Handshake Completed! Mutual feedback registered successfully!\n\n${buyerText}\n\n${sellerText}`, 
                  time: "Just now" 
                }
              ]
            };
          }
          return room;
        });
      });

      // 6. Trigger native and in-app feedback celebration
      triggerPushNotification(
        `💖 Mutual Reviews Exchanged!`,
        `Feedback completed successfully. Your Sero trust score is now ${ME_USER.trustScore}%.`
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
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border cursor-pointer",
                      cat === activeCategory 
                        ? "bg-teal-800 text-white border-teal-800 shadow-md scale-105" 
                        : "bg-white text-gray-500 border-gray-100 hover:border-teal-200 hover:text-teal-800"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid - Responsive Bento Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6 bg-gray-50/20">
                {products
                  .filter((p) => activeCategory === 'All' || p.category === activeCategory)
                  .map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product} 
                      onClick={() => { setSelectedProduct(product); }} 
                    />
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
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Connecting your surroundings through safe and easy local trade.
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-6 text-xs font-black text-teal-800 uppercase tracking-wider">
                    <button onClick={() => setShowTerms(true)} className="hover:underline hover:text-teal-950 transition-colors cursor-pointer">Terms of Service</button>
                    <span className="text-gray-300 select-none">•</span>
                    <button onClick={() => setShowPrivacy(true)} className="hover:underline hover:text-teal-950 transition-colors cursor-pointer">Privacy Policy</button>
                  </div>
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
            <div className="flex h-[600px] max-w-5xl mx-auto bg-white overflow-hidden rounded-[32px] border border-gray-100 shadow-xl m-4">
              {/* Chat Rooms List (Left Sidebar) */}
              <div className={cn(
                "w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/50",
                mobileShowConvo ? "hidden md:flex" : "flex"
              )}>
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
                          setMobileShowConvo(true);
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
                  <div className={cn(
                    "flex-grow flex flex-col bg-white",
                    mobileShowConvo ? "flex" : "hidden md:flex"
                  )}>
                    {/* Chat Header with Deal & Survey Button */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setMobileShowConvo(false)}
                          className="md:hidden p-2 -ml-2 text-gray-500 hover:text-teal-800 transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
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
                          <p className="text-[11px] text-teal-700 font-medium truncate max-w-[150px] sm:max-w-[200px] mt-1">
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

          {activeTab === 'cart' && (
            <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 pb-24">
              {/* Header Banner */}
              <div className="bg-teal-800 text-white p-6 rounded-[28px] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <h2 className="font-black text-2xl tracking-tight mb-1 flex items-center gap-2">
                  <ShoppingCart className="text-amber-400" />
                  My Cart (관심목록)
                </h2>
                <p className="text-xs text-teal-100/70">
                  Save items of interest to review later and coordinate neighborhood handshakes.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-white/15 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/5">
                    {cart.length} Saved Items
                  </span>
                  <span className="bg-amber-500 text-teal-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                    <BellRing size={10} /> Dynamic Alerts Active
                  </span>
                </div>
              </div>

              {/* Dynamic Notification Guide */}
              <div className="bg-teal-50 border border-teal-100 rounded-3xl p-5 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                  <BellRing size={14} className="text-teal-700" />
                  Real-time Vicinity Price Drop & Sale Alerts
                </h4>
                <p className="text-xs text-teal-800 leading-relaxed font-medium">
                  We automatically monitor saved items in your cart. You will receive immediate browser push and in-app notifications if a seller lowers the price or if the item gets sold. Try the **interactive state simulator** below to test this feature!
                </p>
              </div>

              {cart.length === 0 ? (
                /* Empty state */
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 border border-gray-100">
                    <ShoppingCart size={28} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-black text-base text-gray-900">Your Cart is Empty</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                      Browse neighborhood listings and tap the **Heart (찜하기)** button to save items you wish to follow.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-all"
                  >
                    Explore Listings
                  </button>
                </div>
              ) : (
                /* Saved Items List */
                <div className="space-y-4">
                  {cart.map(productId => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;

                    return (
                      <div 
                        key={product.id} 
                        className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <div 
                            onClick={() => setSelectedProduct(product)}
                            className="w-24 h-24 rounded-2xl bg-gray-50 overflow-hidden relative flex-shrink-0 cursor-pointer"
                          >
                            <img 
                              src={product.imageUrl} 
                              alt={product.title} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {product.isSold && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="bg-red-600 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md">
                                  Sold
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-grow flex flex-col justify-between min-w-0">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                                  {product.category}
                                </span>
                                <button 
                                  onClick={() => toggleCart(product.id)}
                                  className="text-gray-300 hover:text-red-500 p-1"
                                  title="Remove"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              <h3 
                                onClick={() => setSelectedProduct(product)}
                                className="font-black text-sm text-gray-900 truncate hover:text-teal-700 cursor-pointer"
                              >
                                {product.title}
                              </h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                <MapPin size={10} /> {product.location}
                              </p>
                            </div>

                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="font-black text-teal-800 text-base">
                                Rs. {product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-gray-400 line-through">
                                  Rs. {product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Cart Action Buttons */}
                        <div className="flex gap-2 mt-4 border-t border-gray-50 pt-3">
                          <button 
                            onClick={() => handleStartChatForProduct(product)}
                            disabled={product.isSold}
                            className="flex-grow bg-teal-50 hover:bg-teal-100 text-teal-800 disabled:opacity-40 disabled:cursor-not-allowed py-2.5 rounded-xl font-black text-xs active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                          >
                            <MessageCircle size={14} />
                            {product.isSold ? "Seller Handshake Done" : "Contact Seller"}
                          </button>
                          <button 
                            onClick={() => toggleCart(product.id)}
                            className="bg-gray-50 hover:bg-gray-100 text-gray-600 py-2.5 px-4 rounded-xl font-black text-xs active:scale-95 transition-all"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Interactive alert simulation panel */}
                        <div className="bg-amber-500/5 rounded-2xl p-3 border border-amber-500/10 mt-3 space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-800 tracking-wider">
                            <BellRing size={12} className="text-amber-600 animate-pulse" />
                            <span>Trade Alert Simulator (알림 테스트)</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5">
                            <button 
                              onClick={() => simulatePriceDrop(product.id)}
                              disabled={product.isSold}
                              className="bg-amber-500 hover:bg-amber-600 text-teal-950 py-1.5 rounded-lg font-black text-[9px] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                              title="Trigger simulated price drop alert"
                            >
                              📉 Price -10%
                            </button>
                            <button 
                              onClick={() => simulateSoldOut(product.id)}
                              disabled={product.isSold}
                              className="bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-lg font-black text-[9px] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                              title="Trigger simulated sold out alert"
                            >
                              🚫 Mark Sold
                            </button>
                            <button 
                              onClick={() => simulateResetProduct(product.id)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-lg font-black text-[9px] active:scale-95 transition-all"
                              title="Reset status and price"
                            >
                              🔄 Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 pb-24">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white p-6 rounded-[28px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
                  <div 
                    onClick={openAvatarCreator}
                    className="w-20 h-20 bg-teal-100 rounded-full overflow-hidden border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 cursor-pointer relative group transition-all hover:scale-105 active:scale-95"
                    title="Customize Avatar"
                  >
                    <img 
                      src={myAvatarUrl} 
                      alt={ME_USER.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={16} className="text-white" />
                      <span className="text-[8px] text-white font-black uppercase mt-0.5 tracking-wider">EDIT</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left flex-grow space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="text-xl font-black tracking-tight">{ME_USER.name}</h2>
                      <span className="self-center sm:self-auto bg-amber-500 text-teal-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm">
                        🛡️ SeroID Verified
                      </span>
                    </div>
                    <p className="text-xs text-teal-100/80 font-medium">himpower2025@gmail.com</p>
                    <p className="text-xs text-teal-100/60 font-medium">+977 981******8 (OTP Secured)</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2">
                      <div className="flex items-center gap-1 text-[10px] bg-white/10 text-white font-bold px-2.5 py-1 rounded-full border border-white/5">
                        <MapPin size={10} />
                        <span>{ME_USER.location} (Ward 3)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] bg-white/10 text-white font-bold px-2.5 py-1 rounded-full border border-white/5">
                        <Calendar size={10} />
                        <span>Joined {ME_USER.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Stats Block */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <span className="text-xl block mb-1">🤝</span>
                  <span className="text-xs text-gray-400 font-bold block">Handshakes</span>
                  <span className="text-lg font-black text-teal-900 mt-1 block">{ME_USER.dealsCount} Done</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <span className="text-xl block mb-1">🏷️</span>
                  <span className="text-xs text-gray-400 font-bold block">Listings</span>
                  <span className="text-lg font-black text-teal-900 mt-1 block">
                    {products.filter(p => p.seller.id === 'me').length} Live
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <span className="text-xl block mb-1">🌱</span>
                  <span className="text-xs text-gray-400 font-bold block">Circles</span>
                  <span className="text-lg font-black text-teal-900 mt-1 block">2 Joined</span>
                </div>
              </div>

              {/* Sero Trust Report Card */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Neighborhood Sero Score</h3>
                  <span className="text-[10px] bg-amber-500 text-teal-950 px-2.5 py-0.5 rounded-full font-black uppercase tracking-tight shadow-sm">
                    🤝 Unshakable Bond 💎
                  </span>
                </div>
                
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-teal-900 tracking-tight">{ME_USER.trustScore}%</span>
                  <div className="flex-grow pb-1">
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-teal-600 rounded-full" 
                        style={{ width: `${ME_USER.trustScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-teal-50/50 p-3.5 rounded-2xl border border-teal-100/20">
                  <Award size={18} className="text-teal-700 flex-shrink-0" />
                  <p className="text-xs text-teal-800 font-bold leading-tight">
                    Verified neighbor score based on trade survey feedback & completion rating.
                  </p>
                </div>

                {/* Accolades breakdown */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2.5">My Sero Accolades</h4>
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
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedProduct(p)}
                        className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-50/60 hover:bg-gray-100/60 hover:border-teal-100 cursor-pointer transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-black text-xs text-gray-900 truncate group-hover:text-teal-800 transition-colors">{p.title}</h4>
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
                <div className="flex items-center justify-center gap-4 text-xs font-black text-teal-800 uppercase tracking-wider">
                  <button onClick={() => setShowTerms(true)} className="hover:underline hover:text-teal-950 transition-colors cursor-pointer">Terms of Service</button>
                  <span className="text-gray-300 select-none">•</span>
                  <button onClick={() => setShowPrivacy(true)} className="hover:underline hover:text-teal-950 transition-colors cursor-pointer">Privacy Policy</button>
                </div>
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
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
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
            onClick={() => setActiveTab('cart')}
            className={cn("flex flex-col items-center gap-1.5 relative", activeTab === 'cart' ? "text-teal-700" : "text-gray-300")}
          >
            <div className="relative">
              <ShoppingCart size={24} strokeWidth={activeTab === 'cart' ? 3 : 2} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-rose-600 text-white text-[9px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border border-white">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
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
            isInCart={cart.includes(selectedProduct.id)}
            onToggleCart={() => toggleCart(selectedProduct.id)}
            onStartChat={() => handleStartChatForProduct(selectedProduct)}
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
                sellerName={surveyProduct.seller.id === 'me' ? ME_USER.name : surveySeller.name}
                buyerName={surveyProduct.seller.id === 'me' ? "Rajesh Kaji" : ME_USER.name}
                onSubmit={(buyerRatings, sellerRatings) => {
                  handleCompleteSurvey(buyerRatings, sellerRatings);
                }}
                onCancel={() => setShowSurvey(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Serofero Avatar Creator Modal */}
      <AnimatePresence>
        {showAvatarCreator && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col my-8 max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-6 relative flex-shrink-0">
                <button 
                  onClick={() => setShowAvatarCreator(false)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-teal-300 mb-1">
                  <User size={14} className="text-amber-400" />
                  <span>Sero ID Customization</span>
                </div>
                <h3 className="text-xl font-black tracking-tight mt-1">Design Your Avatar</h3>
                <p className="text-xs text-teal-100/70 mt-1">Create a unique graphic representing you in the neighborhood.</p>
              </div>

              {/* Scrollable Editor Container */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
                {/* Live Preview Display Card */}
                <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 flex flex-col items-center justify-center relative">
                  <span className="absolute top-3 left-4 text-[9px] uppercase font-black text-gray-400 tracking-wider">Live Preview</span>
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center">
                    <div 
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: renderAvatarSvg(tempAvatarOptions) }}
                    />
                  </div>
                  <p className="text-[10px] text-teal-800 font-extrabold mt-3 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-full">
                    🧑‍🎨 {tempAvatarOptions.gender === 'male' ? 'Male' : 'Female'} Neighbor
                  </p>
                </div>

                {/* Customizer Panels */}
                <div className="space-y-5">
                  {/* 1. Gender */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">1. Gender / Identity</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setTempAvatarOptions(prev => ({ 
                            ...prev, 
                            gender: 'male',
                            hair: 1 
                          }));
                        }}
                        className={cn(
                          "py-3 rounded-2xl border-2 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all",
                          tempAvatarOptions.gender === 'male' 
                            ? "bg-teal-50 border-teal-700 text-teal-900 shadow-sm" 
                            : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50"
                        )}
                      >
                        <span>🙋‍♂️</span> Male
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTempAvatarOptions(prev => ({ 
                            ...prev, 
                            gender: 'female',
                            hair: 1 
                          }));
                        }}
                        className={cn(
                          "py-3 rounded-2xl border-2 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all",
                          tempAvatarOptions.gender === 'female' 
                            ? "bg-teal-50 border-teal-700 text-teal-900 shadow-sm" 
                            : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50"
                        )}
                      >
                        <span>🙋‍♀️</span> Female
                      </button>
                    </div>
                  </div>

                  {/* 2. Skin Tone */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">2. Skin Color</label>
                    <div className="flex items-center gap-3">
                      {["#FFDBAC", "#F1C27D", "#E0AC69", "#C68642", "#8D5524"].map((color, idx) => {
                        const skinNum = idx + 1;
                        const isSelected = tempAvatarOptions.skin === skinNum;
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setTempAvatarOptions(prev => ({ ...prev, skin: skinNum }))}
                            style={{ backgroundColor: color }}
                            className={cn(
                              "w-10 h-10 rounded-full border-2 transition-all shadow-sm focus:outline-none flex items-center justify-center relative",
                              isSelected 
                                ? "border-teal-800 scale-110 ring-2 ring-teal-700/20" 
                                : "border-white hover:scale-105"
                            )}
                            title={`Skin tone ${skinNum}`}
                          >
                            {isSelected && (
                              <span className="text-[10px] text-white drop-shadow-sm font-black">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Hair Style */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">3. Hair Style (5 Options)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((hairNum) => {
                        const isSelected = tempAvatarOptions.hair === hairNum;
                        const maleHairNames = ["Spiky", "Side Part", "Curly Afro", "Beanie Hat", "Top Knot"];
                        const femaleHairNames = ["Long Bangs", "Bob Cut", "Double Buns", "Ponytail", "Wavy Flow"];
                        const name = tempAvatarOptions.gender === 'male' ? maleHairNames[hairNum - 1] : femaleHairNames[hairNum - 1];

                        return (
                          <button
                            key={hairNum}
                            type="button"
                            onClick={() => setTempAvatarOptions(prev => ({ ...prev, hair: hairNum }))}
                            className={cn(
                              "py-2.5 px-1 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center select-none",
                              isSelected 
                                ? "border-teal-700 bg-teal-50 text-teal-900 shadow-sm" 
                                : "border-gray-100 hover:bg-gray-50 text-gray-500"
                            )}
                          >
                            <span className="text-sm block mb-0.5">💇</span>
                            <span className="text-[9px] truncate max-w-full block leading-tight px-0.5 font-bold">
                              {name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Face Shapes & Expression */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">4. Facial Expression & Shape (5 Options)</label>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((faceNum) => {
                        const isSelected = tempAvatarOptions.face === faceNum;
                        const expressions = [
                          { emoji: "😊", name: "Cute" },
                          { emoji: "🤓", name: "Glasses" },
                          { emoji: "😜", name: "Wink" },
                          { emoji: "😎", name: "Cool" },
                          { emoji: "🥰", name: "Happy" }
                        ];
                        const exp = expressions[faceNum - 1] || { emoji: "😊", name: "Expression" };

                        return (
                          <button
                            key={faceNum}
                            type="button"
                            onClick={() => setTempAvatarOptions(prev => ({ ...prev, face: faceNum }))}
                            className={cn(
                              "py-2.5 px-1 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center select-none",
                              isSelected 
                                ? "border-teal-700 bg-teal-50 text-teal-900 shadow-sm" 
                                : "border-gray-100 hover:bg-gray-50 text-gray-500"
                            )}
                          >
                            <span className="text-lg block mb-0.5">{exp.emoji}</span>
                            <span className="text-[9px] font-black uppercase tracking-wider block">
                              {exp.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. Outfit Style */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">5. Outfit & Style (10 Options)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((outfitNum) => {
                        const isSelected = tempAvatarOptions.outfit === outfitNum;
                        const outfitNames = [
                          "Teal Hoodie", 
                          "Varsity Jkt", 
                          "Striped Tee", 
                          "Biz Blazer", 
                          "Denim Jkt", 
                          "Cozy Red", 
                          "Leather Jkt", 
                          "Hawaiian", 
                          "Athl Jersey", 
                          "Yellow Rain"
                        ];
                        const outfitEmojis = ["🧥", "🧥", "👕", "👔", "🧥", "🧶", "🧥", "🌺", "🎽", "🧥"];

                        return (
                          <button
                            key={outfitNum}
                            type="button"
                            onClick={() => setTempAvatarOptions(prev => ({ ...prev, outfit: outfitNum }))}
                            className={cn(
                              "py-2 px-1 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center select-none",
                              isSelected 
                                ? "border-teal-700 bg-teal-50 text-teal-900 shadow-sm" 
                                : "border-gray-100 hover:bg-gray-50 text-gray-500"
                            )}
                          >
                            <span className="text-xs block mb-0.5">{outfitEmojis[outfitNum - 1]}</span>
                            <span className="text-[9px] font-bold block truncate max-w-full">
                              {outfitNames[outfitNum - 1]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowAvatarCreator(false)}
                  className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const finalSvg = renderAvatarSvg(tempAvatarOptions);
                    const finalDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(finalSvg)}`;
                    setAvatarOptions(tempAvatarOptions);
                    setMyAvatarUrl(finalDataUrl);
                    setShowAvatarCreator(false);
                    triggerPushNotification("🤝 Profile Updated!", "Your custom neighborhood Sero avatar has been saved.");
                  }}
                  className="flex-1 py-3.5 bg-teal-800 hover:bg-teal-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-100"
                >
                  Save Avatar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Serofero Terms of Service Modal */}
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col my-8 max-h-[85vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-6 relative flex-shrink-0">
                <button 
                  onClick={() => setShowTerms(false)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-teal-300 mb-1">
                  <ShieldCheck size={14} className="text-amber-400" />
                  <span>Sero Trust & Safety</span>
                </div>
                <h3 className="text-xl font-black tracking-tight mt-1">Terms of Service</h3>
                <p className="text-xs text-teal-100/70 mt-1">Last Updated: July 2026</p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-5 text-gray-600 text-xs leading-relaxed font-medium">
                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">1. Acceptance of Terms</h4>
                  <p>
                    Welcome to Serofero. These Terms of Service ("Terms") govern your access to and use of the Serofero listing platform, mobile applications, and services ("Services") operated and maintained by <span className="font-bold text-gray-950">Himpower Pvt. Ltd.</span> By registering a Sero ID or using our Services, you agree to be bound by these Terms and our Privacy Policy.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">2. Nature of Serofero</h4>
                  <p>
                    Serofero is a hyper-local peer-to-peer neighborhood marketplace platform designed to facilitate face-to-face handshakes and local item exchanges in Kathmandu and surrounding Nepalese municipalities. 
                  </p>
                  <p className="mt-1 bg-amber-50 text-amber-900 p-3 rounded-2xl font-semibold border border-amber-100/40">
                    ⚠️ <span className="font-bold uppercase tracking-wider text-[10px] text-amber-950 block mb-0.5">Critical Notice</span>
                    Serofero does NOT act as an escrow, shipping service, middleman, or payment processor. All meetups, item inspections, and cash/payment exchanges are conducted directly between users at their own risk. We strongly advise meeting in highly visible public locations and verifying goods prior to any exchange.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">3. Prohibited Transactions</h4>
                  <p>
                    Users are strictly prohibited from listing, chatting about, or exchanging counterfeit merchandise, stolen items, hazardous goods, firearms, weapons, illegal drugs, prescription medications, or any items violating Nepalese trade laws. You represent that you are the lawful owner of any listing you publish.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">4. Sero Trust Score & Feedback</h4>
                  <p>
                    To ensure neighborhood transparency, users agree to participate in honest feedback surveys following local exchanges. Your Sero Trust Score and community accolades are dynamically calculated based on neighbor feedback. Serofero reserves the right to restrict or terminate accounts that consistently receive negative feedback or violate trust policies.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">5. Limitation of Liability</h4>
                  <p>
                    Himpower Pvt. Ltd. shall not be liable for any disputes, financial losses, personal safety incidents, or transaction failures that occur during face-to-face user meetups. Our platform is provided "as is" without warranties of any kind.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">6. Contact Information</h4>
                  <p>
                    For legal questions or platform assistance, please reach out to our administration office: <span className="font-bold text-teal-800">legal@sero.com</span>.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowTerms(false)}
                  className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 text-white font-black rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-teal-100 text-center"
                >
                  Close & Acknowledge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Serofero Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col my-8 max-h-[85vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-6 relative flex-shrink-0">
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-teal-300 mb-1">
                  <Lock size={14} className="text-amber-400" />
                  <span>Sero ID Privacy</span>
                </div>
                <h3 className="text-xl font-black tracking-tight mt-1">Privacy Policy</h3>
                <p className="text-xs text-teal-100/70 mt-1">Last Updated: July 2026</p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-5 text-gray-600 text-xs leading-relaxed font-medium">
                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">1. Commitment to Privacy</h4>
                  <p>
                    <span className="font-bold text-gray-950">Himpower Pvt. Ltd.</span> is committed to protecting your neighborhood privacy. This policy details how we handle Sero ID details, listing metrics, and trade chat histories to ensure safe local exchanges.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">2. Information We Collect</h4>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li><span className="font-bold text-teal-950">Registration Details</span>: Your username, contact email, neighborhood ward location, and secure local options (e.g. customized Sero avatar).</li>
                    <li><span className="font-bold text-teal-950">Listing Content</span>: Uploaded item photos, descriptions, and pricing published in our public feed catalog.</li>
                    <li><span className="font-bold text-teal-950">Transaction Feedback</span>: Community ratings and ratings provided by other neighbors to formulate public trust indices.</li>
                    <li><span className="font-bold text-teal-950">Chat Messages</span>: Temporary vicinity chat history to allow convenient arrangement of local trade handshakes.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">3. How We Use Information</h4>
                  <p>
                    Your neighborhood proximity and customized avatar are shared publicly with potential buyers or sellers to build community context. Your trust percentage and accolades are displayed clearly to certify your reliability. We do NOT share or sell message histories or personal metadata.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">4. Secure Storage & Local Indexing</h4>
                  <p>
                    Data is handled securely inside local storage caches and verified server configurations. We employ industry-standard encryption protocols to protect your registered contact numbers and active listing photos.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">5. Your Data Control</h4>
                  <p>
                    You have absolute control over your catalog. Deleting an active product listing from your Profile tab permanently removes all associated images, pricing, and descriptions from the Serofero feed. You can update your custom avatar styling at any time.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">6. Contact Privacy Office</h4>
                  <p>
                    If you wish to request permanent Sero ID deletion, or ask privacy-related questions, please write to our privacy officer at <span className="font-bold text-teal-800">privacy@sero.com</span>.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPrivacy(false)}
                  className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 text-white font-black rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-teal-100 text-center"
                >
                  Close & Acknowledge
                </button>
              </div>
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
