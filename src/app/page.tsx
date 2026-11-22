'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import CommunityPreview from '@/components/CommunityPreview';
import FinalSignupBanner from '@/components/FinalSignupBanner';
import Footer from '@/components/Footer';
import LegalModals, { ModalType } from '@/components/LegalModals';

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [manageEmail, setManageEmail] = useState<string>('');

  const openManageModal = (email: string = '') => {
    setManageEmail(email);
    setActiveModal('manage');
  };

  const scrollToHero = () => {
    const el = document.getElementById('hero-signup');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = el.querySelector('input[type="email"]') as HTMLInputElement | null;
      if (input) input.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#0F172A] selection:bg-[#DBEAFE] selection:text-[#0066FF]">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0066FF] focus:text-white focus:rounded-lg shadow-lg font-medium"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Header
        onOpenAbout={() => setActiveModal('about')}
        onOpenHowItWorks={() => setActiveModal('how-it-works')}
        onScrollToSignup={scrollToHero}
      />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenPrivacy={() => setActiveModal('privacy')}
          onOpenManage={openManageModal}
        />

        {/* 2. Feature Highlights Section */}
        <FeatureCards />

        {/* 3. Community Content Preview Section */}
        <CommunityPreview />

        {/* 4. Bottom Final Callout Banner */}
        <FinalSignupBanner
          onOpenPrivacy={() => setActiveModal('privacy')}
          onOpenManage={openManageModal}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setActiveModal('privacy')}
        onOpenTerms={() => setActiveModal('terms')}
        onOpenManage={() => openManageModal('')}
      />

      {/* Modal Dialogs for Legal & Data Management */}
      <LegalModals
        activeModal={activeModal}
        initialEmail={manageEmail}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
