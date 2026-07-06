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
  Tag
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

const TrustScore = ({ score }: { score: number }) => {
  const colorClass = score > 80 ? 'text-teal-600' : score > 50 ? 'text-amber-600' : 'text-gray-500';
  const emoji = score > 80 ? '🌟' : score > 50 ? '👍' : '🤝';

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1">
        <span className={cn("font-bold text-lg", colorClass)}>{score}%</span>
        <span>{emoji}</span>
      </div>
      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className={cn("h-full", score > 80 ? 'bg-teal-600' : score > 50 ? 'bg-amber-600' : 'bg-gray-500')}
        />
      </div>
      <span className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-semibold">Community Trust</span>
    </div>
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
        <TrustScore score={product.seller.trustScore} />
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

const SellScreen = ({ onBack }: { onBack: () => void }) => {
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
            alert('Post uploaded successfully!');
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isSelling, setIsSelling] = useState(false);
  const [location] = useState('Kathmandu');
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

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
                {MOCK_PRODUCTS.map((product) => (
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

          {activeTab === 'profile' && (
            <div className="p-6 max-w-md mx-auto">
              <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                  <User size={48} className="text-teal-700" />
                </div>
                <h2 className="text-2xl font-black text-gray-900">User Profile</h2>
                <p className="text-sm text-gray-500">himpower2025@gmail.com</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Application Info</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">App Name</span>
                      <span className="text-sm font-bold text-teal-800">Serofero</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Version</span>
                      <span className="text-sm font-bold text-teal-800">1.0.0</span>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Developed By</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-800 rounded-xl flex items-center justify-center">
                          <Handshake size={20} className="text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-teal-900">Himpower Pvt. Ltd.</p>
                          <p className="text-[10px] text-gray-500">Official Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Push Notification Panel for Demos */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Push Notification System</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Test the built-in push notification engine. For production, this connects to Google Cloud Messaging (FCM) & Apple APNs.
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={requestNotificationPermission}
                      className={cn(
                        "w-full py-3.5 rounded-2xl font-bold text-xs transition-all border",
                        permissionGranted 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-teal-50 text-teal-800 border-teal-100 hover:bg-teal-100/50"
                      )}
                    >
                      {permissionGranted ? "✓ Device Notifications Allowed" : "Enable Device Notifications"}
                    </button>
                    
                    <button 
                      onClick={() => triggerPushNotification(
                        "💰 Price Offer Received!",
                        "A buyer offered Rs. 4,500 for your vintage leather jacket."
                      )}
                      className="w-full py-3.5 bg-teal-800 text-white font-bold rounded-2xl text-xs hover:bg-teal-900 transition-colors"
                    >
                      Trigger Demo Offer Notification
                    </button>

                    <button 
                      onClick={() => triggerPushNotification(
                        "💬 Rajesh Kaji",
                        "Namaste! Can we meet tomorrow at Patan Durbar Square?"
                      )}
                      className="w-full py-3.5 bg-amber-500 text-teal-950 font-bold rounded-2xl text-xs hover:bg-amber-400 transition-colors"
                    >
                      Trigger Demo Message Notification
                    </button>
                  </div>
                </div>

                <button className="w-full py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl text-sm">
                  Settings
                </button>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full py-4 text-red-500 font-bold rounded-2xl text-sm hover:bg-red-50 transition-colors"
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
          <SellScreen onBack={() => setIsSelling(false)} />
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
