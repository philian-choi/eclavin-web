'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Episode } from '@/lib/episodes';
import { logoutAction } from '../actions';
import { ArrowLeft, Search, Copy, Check, Sparkles, AppWindow } from 'lucide-react';

interface MarketingClientProps {
  l1_ko: Episode[];
  l1_en: Episode[];
  l2_ko: Episode[];
  l2_en: Episode[];
}

export default function MarketingClient({ l1_ko, l1_en, l2_ko, l2_en }: MarketingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<1 | 2>(1);
  const [selectedLang, setSelectedLang] = useState<'ko' | 'en'>('ko');
  const [selectedEpId, setSelectedEpId] = useState<string>('episode_001');
  const [copiedType, setCopiedType] = useState<'threads' | 'shorts' | null>(null);

  // Grouped datasets
  const dataset = useMemo(() => {
    if (selectedLevel === 1) {
      return selectedLang === 'ko' ? l1_ko : l1_en;
    } else {
      return selectedLang === 'ko' ? l2_ko : l2_en;
    }
  }, [selectedLevel, selectedLang, l1_ko, l1_en, l2_ko, l2_en]);

  // Filtered episodes based on search query
  const filteredEpisodes = useMemo(() => {
    if (!searchQuery.trim()) return dataset;
    const query = searchQuery.toLowerCase().trim();
    return dataset.filter(ep => 
      ep.number.toString().includes(query) ||
      ep.title.toLowerCase().includes(query) ||
      ep.question.toLowerCase().includes(query)
    );
  }, [dataset, searchQuery]);

  // Currently selected episode details
  const activeEpisode = useMemo(() => {
    return dataset.find(ep => ep.id === selectedEpId) || dataset[0];
  }, [dataset, selectedEpId]);

  // Copy helper that appends target CTA links
  const handleCopy = async (type: 'threads' | 'shorts') => {
    if (!activeEpisode) return;

    const isEn = selectedLang === 'en';
    const baseUrl = 'https://www.eclavin.com';
    const episodeUrl = `${baseUrl}/level/${selectedLevel}/episode/${activeEpisode.id}?lang=${selectedLang}`;
    const appStoreUrl = 'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

    let contentToCopy = '';

    if (type === 'threads') {
      const originalPost = activeEpisode.threadsPost || '';
      
      if (isEn) {
        contentToCopy = `${originalPost}\n\n---\n👉 Read the full explanation and practice for FREE:\n${episodeUrl}\n\n🔥 Master WSET Exams from Level 1 to 3 with 1,800+ high-yield questions! Download Eclavin now on the App Store:\n${appStoreUrl}`;
      } else {
        contentToCopy = `${originalPost}\n\n---\n👉 이 문제의 전체 오답 분석과 상세 해설 무료로 보기:\n${episodeUrl}\n\n🔥 1,800개 이상의 적중 기출문제와 Level 3까지 완벽 마스터하려면? 에클라뱅 앱스토어 다운로드:\n${appStoreUrl}`;
      }
    } else {
      const originalShorts = activeEpisode.shortsScript || '';
      
      if (isEn) {
        contentToCopy = `${originalShorts}\n\n---\n👉 Master WSET Exams for FREE at Eclavin Web: ${episodeUrl}\n👉 Download the full Eclavin App (1,800+ Questions): ${appStoreUrl}`;
      } else {
        contentToCopy = `${originalShorts}\n\n---\n👉 WSET 1초 만에 무료 오답체크하기: ${episodeUrl}\n👉 1,800개 기출 족보 에클라뱅 앱스토어 바로가기: ${appStoreUrl}`;
      }
    }

    try {
      await navigator.clipboard.writeText(contentToCopy);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="marketing-layout">
      <header className="marketing-header">
        <div className="header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin" className="btn-back">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1>Eclavin SNS Marketing Booster</h1>
              <p>Viral marketing scripts generator for Threads & YouTube Shorts</p>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <Link href="/" className="btn-secondary">View Site</Link>
          <form action={logoutAction}>
            <button type="submit" className="btn-logout">Logout</button>
          </form>
        </div>
      </header>

      <div className="marketing-content-grid">
        {/* Left column: Episode selector */}
        <aside className="sidebar-section">
          <div className="filter-controls">
            <div className="level-tabs">
              <button 
                className={`level-tab ${selectedLevel === 1 ? 'active' : ''}`}
                onClick={() => { setSelectedLevel(1); setSelectedEpId('episode_001'); }}
              >
                Level 1
              </button>
              <button 
                className={`level-tab ${selectedLevel === 2 ? 'active' : ''}`}
                onClick={() => { setSelectedLevel(2); setSelectedEpId('episode_001'); }}
              >
                Level 2
              </button>
            </div>

            <div className="lang-tabs" style={{ marginTop: '1rem' }}>
              <button 
                className={`lang-tab ${selectedLang === 'ko' ? 'active' : ''}`}
                onClick={() => { setSelectedLang('ko'); setSelectedEpId('episode_001'); }}
              >
                🇰🇷 Korean
              </button>
              <button 
                className={`lang-tab ${selectedLang === 'en' ? 'active' : ''}`}
                onClick={() => { setSelectedLang('en'); setSelectedEpId('episode_001'); }}
              >
                🇺🇸 English
              </button>
            </div>

            <div className="search-box" style={{ marginTop: '1.25rem' }}>
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search episode or quiz..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="episode-selector-list">
            {filteredEpisodes.length === 0 ? (
              <div className="empty-state">No episodes found</div>
            ) : (
              filteredEpisodes.map(ep => (
                <button
                  key={ep.id}
                  className={`episode-select-item ${selectedEpId === ep.id ? 'active' : ''}`}
                  onClick={() => setSelectedEpId(ep.id)}
                >
                  <span className="item-number">Ep {ep.number}</span>
                  <span className="item-title">{ep.title}</span>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Right column: Script copy paste workspace */}
        <main className="workspace-section">
          {activeEpisode ? (
            <div className="active-workspace">
              <div className="episode-meta-header">
                <span className="level-badge">LEVEL {selectedLevel}</span>
                <h2>Episode {activeEpisode.number}: {activeEpisode.title}</h2>
                <div className="meta-question-card">
                  <strong>Question:</strong> {activeEpisode.question}
                </div>
              </div>

              <div className="scripts-split-grid">
                {/* Threads Post */}
                <div className="script-container">
                  <div className="script-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={18} style={{ color: '#832d32' }} />
                      <h3>Threads Post Template</h3>
                    </div>
                    <button 
                      onClick={() => handleCopy('threads')} 
                      className={`btn-copy ${copiedType === 'threads' ? 'copied' : ''}`}
                    >
                      {copiedType === 'threads' ? (
                        <><Check size={16} /> Copied!</>
                      ) : (
                        <><Copy size={16} /> Copy + CTA Link</>
                      )}
                    </button>
                  </div>
                  <div className="script-content-preview">
                    {activeEpisode.threadsPost ? (
                      <pre>{activeEpisode.threadsPost}</pre>
                    ) : (
                      <div className="no-script-notice">No Threads script found inside this file metadata.</div>
                    )}
                  </div>
                  <div className="cta-preview-badge">
                    ⚡ <strong>Auto-appended:</strong> Direct Link + Premium Eclavin App Store Promo
                  </div>
                </div>

                {/* YouTube Shorts Script */}
                <div className="script-container">
                  <div className="script-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={18} style={{ color: '#832d32' }} />
                      <h3>YouTube Shorts Script</h3>
                    </div>
                    <button 
                      onClick={() => handleCopy('shorts')} 
                      className={`btn-copy ${copiedType === 'shorts' ? 'copied' : ''}`}
                    >
                      {copiedType === 'shorts' ? (
                        <><Check size={16} /> Copied!</>
                      ) : (
                        <><Copy size={16} /> Copy + CTA Link</>
                      )}
                    </button>
                  </div>
                  <div className="script-content-preview">
                    {activeEpisode.shortsScript ? (
                      <pre>{activeEpisode.shortsScript}</pre>
                    ) : (
                      <div className="no-script-notice">No Shorts script found inside this file metadata.</div>
                    )}
                  </div>
                  <div className="cta-preview-badge">
                    ⚡ <strong>Auto-appended:</strong> Direct Link + Premium Eclavin App Store Promo
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-workspace">
              <AppWindow size={64} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
              <h3>Select an episode to view scripts</h3>
              <p>Pre-written marketing copies will render here with auto-appended sales hooks.</p>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        #app-wrapper {
          max-width: 100% !important;
          background-color: var(--bg-primary) !important;
        }
        body {
          display: block !important;
          overflow-x: hidden;
        }
      `}</style>

      <style jsx>{`
        .marketing-layout {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 2.5rem;
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
        }
        .marketing-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .btn-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          transition: all 0.2s;
        }
        .btn-back:hover {
          background: var(--border-light);
          transform: translateX(-3px);
        }
        .marketing-header h1 {
          font-size: 2.2rem;
          font-weight: 850;
          margin: 0;
          letter-spacing: -0.03em;
        }
        .marketing-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0.25rem 0 0 0;
        }
        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .btn-secondary {
          padding: 0.75rem 1.4rem;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 700;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: var(--border-light);
        }
        .btn-logout {
          padding: 0.75rem 1.4rem;
          border-radius: 10px;
          background: transparent;
          border: 1px solid rgba(255, 0, 0, 0.2);
          color: #ff4d4d;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 700;
          transition: all 0.2s;
        }
        .btn-logout:hover {
          background: rgba(255, 0, 0, 0.05);
        }
        
        /* Layout split */
        .marketing-content-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2.5rem;
          min-height: 75vh;
        }
        @media (max-width: 1024px) {
          .marketing-content-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Sidebar layout */
        .sidebar-section {
          background: var(--bg-secondary);
          border-radius: 24px;
          border: 1px solid var(--border-light);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: fit-content;
        }
        .level-tabs, .lang-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          background: var(--bg-primary);
          padding: 0.35rem;
          border-radius: 10px;
          border: 1px solid var(--border-light);
        }
        .level-tab, .lang-tab {
          padding: 0.6rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 750;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .level-tab.active, .lang-tab.active {
          background: var(--accent-primary, #722f37);
          color: white;
          box-shadow: 0 4px 10px rgba(114, 47, 85, 0.2);
        }
        .search-box {
          display: flex;
          align-items: center;
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: 10px;
          padding: 0 0.8rem;
          gap: 0.5rem;
        }
        .search-icon {
          color: var(--text-tertiary);
        }
        .search-box input {
          width: 100%;
          border: none;
          background: transparent;
          color: var(--text-primary);
          padding: 0.8rem 0;
          outline: none;
          font-size: 0.9rem;
        }
        
        .episode-selector-list {
          max-height: 480px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-right: 0.25rem;
        }
        .episode-select-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .episode-select-item:hover {
          border-color: var(--text-secondary);
          transform: translateX(3px);
        }
        .episode-select-item.active {
          background: var(--border-light);
          border-color: var(--accent-primary, #722f37);
        }
        .item-number {
          font-weight: 800;
          font-size: 0.8rem;
          color: var(--accent-primary, #722f37);
          text-transform: uppercase;
        }
        .item-title {
          font-size: 0.9rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .empty-state {
          text-align: center;
          color: var(--text-tertiary);
          padding: 2rem 0;
          font-size: 0.9rem;
        }

        /* Workspace workspace */
        .workspace-section {
          background: var(--bg-secondary);
          border-radius: 24px;
          border: 1px solid var(--border-light);
          padding: 2rem;
          min-height: 700px;
        }
        .empty-workspace {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 600px;
          color: var(--text-secondary);
          text-align: center;
        }
        .empty-workspace p {
          color: var(--text-tertiary);
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        
        .active-workspace {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .episode-meta-header {
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 1.5rem;
        }
        .level-badge {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--accent-primary, #722f37);
        }
        .episode-meta-header h2 {
          font-size: 1.75rem;
          margin: 0.25rem 0 1rem 0;
          font-weight: 800;
        }
        .meta-question-card {
          background: var(--bg-primary);
          padding: 1rem 1.25rem;
          border-radius: 12px;
          border: 1px solid var(--border-light);
          font-size: 0.95rem;
          line-height: 1.6;
          word-break: keep-all;
        }

        .scripts-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 1400px) {
          .scripts-split-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .script-container {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .script-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0.75rem;
        }
        .script-header h3 {
          font-size: 1rem;
          margin: 0;
          font-weight: 800;
        }
        .btn-copy {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-copy:hover {
          background: var(--border-light);
          border-color: var(--text-secondary);
        }
        .btn-copy.copied {
          background: rgba(114, 220, 173, 0.15);
          color: #72DCAD;
          border-color: #3A7A5D;
        }
        .script-content-preview {
          background: var(--bg-secondary);
          border-radius: 10px;
          padding: 1.25rem;
          height: 380px;
          overflow-y: auto;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }
        .script-content-preview pre {
          margin: 0;
          white-space: pre-wrap;
          font-family: inherit;
          font-size: 0.92rem;
          line-height: 1.7;
          color: var(--text-primary);
        }
        .no-script-notice {
          color: var(--text-tertiary);
          text-align: center;
          padding: 5rem 0;
          font-size: 0.9rem;
        }
        .cta-preview-badge {
          background: rgba(131, 45, 50, 0.05);
          border: 1px dashed rgba(131, 45, 50, 0.25);
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
