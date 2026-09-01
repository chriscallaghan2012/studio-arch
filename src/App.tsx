import React, { useState } from 'react';
import { PageView, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { QuoteEstimatorModal } from './components/QuoteEstimatorModal';
import { AIAssistantChat } from './components/AIAssistantChat';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [enquiryBrief, setEnquiryBrief] = useState('');

  const handleOpenEstimator = () => {
    setIsEstimatorOpen(true);
  };

  const handleCloseEstimator = () => {
    setIsEstimatorOpen(false);
  };

  const handleApplyToEnquiry = (briefSummary: string) => {
    setEnquiryBrief(briefSummary);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateSimilar = (projectTitle: string) => {
    setEnquiryBrief(`Interested in building plans & specification similar to "${projectTitle}".`);
    setSelectedProject(null);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateWithService = (serviceName: string) => {
    setEnquiryBrief(`Requesting quotation and consultation for ${serviceName} package.`);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2ED] text-slate-900 selection:bg-[#001f3f] selection:text-sky-300">
      
      {/* Sticky Architectural Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenEstimator={handleOpenEstimator}
      />

      {/* Primary Page Canvas */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onOpenEstimator={handleOpenEstimator}
            onSelectProject={setSelectedProject}
            enquiryBrief={enquiryBrief}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            onSelectProject={setSelectedProject}
            onOpenEstimator={handleOpenEstimator}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenEstimator={handleOpenEstimator}
            onInitiateWithService={handleInitiateWithService}
          />
        )}

        {currentPage === 'process' && (
          <ProcessPage
            onOpenEstimator={handleOpenEstimator}
            onInitiateProject={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenEstimator={handleOpenEstimator}
            onContactClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'faqs' && (
          <FaqPage
            onOpenEstimator={handleOpenEstimator}
            onContactClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialBrief={enquiryBrief}
            onOpenEstimator={handleOpenEstimator}
          />
        )}
      </main>

      {/* Blueprint Title Block Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onOpenEstimator={handleOpenEstimator}
      />

      {/* Project Dossier Fullscreen Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInitiateSimilar={handleInitiateSimilar}
      />

      {/* Instant Architectural Scope & Fee Estimator Modal */}
      <QuoteEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={handleCloseEstimator}
        onApplyToEnquiry={handleApplyToEnquiry}
        setCurrentPage={setCurrentPage}
      />

      {/* AI Design Assistant — floating chat widget */}
      <AIAssistantChat />

    </div>
  );
};

export default App;
