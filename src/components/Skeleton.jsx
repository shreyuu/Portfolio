import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className = '', type = 'text' }) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';

  const variants = {
    text: 'h-4 w-3/4',
    title: 'h-8 w-1/2',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full',
    button: 'h-10 w-24',
  };

  return (
    <motion.div
      className={`${baseClasses} ${variants[type]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton key={index} type="text" />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-4 space-y-4 ${className}`}>
    <Skeleton type="title" />
    <SkeletonText lines={4} />
    <Skeleton type="button" />
  </div>
);

export const SkeletonProfile = ({ className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <div className="flex items-center space-x-4">
      <Skeleton type="avatar" />
      <div className="space-y-2 flex-1">
        <Skeleton type="title" />
        <Skeleton type="text" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);

export const SkeletonProject = ({ className = '' }) => (
  <div className={`p-6 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
    <Skeleton type="card" className="mb-4" />
    <Skeleton type="title" className="mb-4" />
    <SkeletonText lines={3} />
    <div className="flex space-x-2 mt-4">
      <Skeleton type="button" />
      <Skeleton type="button" />
    </div>
  </div>
);

export const SkeletonContact = ({ className = '' }) => (
  <div className={`space-y-6 ${className}`}>
    <Skeleton type="title" className="mx-auto w-1/3" />
    <div className="space-y-4">
      <Skeleton type="text" className="w-full" />
      <Skeleton type="text" className="w-full" />
      <Skeleton type="text" className="w-full h-32" />
      <Skeleton type="button" className="w-full" />
    </div>
  </div>
);

export default Skeleton;
