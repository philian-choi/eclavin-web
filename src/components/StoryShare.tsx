'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import saveAs from 'file-saver';
import { Share2, Download, Loader2 } from 'lucide-react';
import { Episode } from '@/lib/episodes';
import { Language } from '@/constants/translations';

interface StoryShareProps {
  episode: Episode;
  lang: Language;
  t: any;
}

export default function StoryShare({ episode, lang, t }: StoryShareProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!storyRef.current) return;
    
    setIsGenerating(true);
    try {
      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(storyRef.current, {
        width: 1080,
        height: 1920,
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0c0506', // Force solid background matching new theme
        style: {
          visibility: 'visible',
          left: '0',
          top: '0'
        }
      });
      
      saveAs(dataUrl, `wine-quiz-ep${episode.number}-${lang}.png`);
    } catch (err) {
      console.error('Failed to generate image:', err);
      alert('이미지 생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button 
        onClick={handleDownload}
        className="pill-btn"
        disabled={isGenerating}
        style={{ 
          backgroundColor: 'var(--text-primary)', 
          color: 'var(--bg-primary)',
          border: '1px solid rgba(128, 128, 128, 0.2)',
          padding: '0.6rem 1.1rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
        }}
      >
        {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {isGenerating ? '생성 중...' : '스토리용 저장'}
      </button>

      {/* Hidden Story Template for Capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div 
          ref={storyRef}
          style={{
            width: '1080px',
            height: '1920px',
            background: '#0c0506', // Deep, rich background base
            backgroundImage: 'radial-gradient(circle at 80% 20%, #38121a 0%, #0c0506 80%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 60px',
            color: '#FFFFFF',
            fontFamily: "'SUIT', 'Inter', system-ui, sans-serif",
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Decorative background elements */}
          <div style={{
            position: 'absolute',
            top: '-200px',
            left: '-200px',
            width: '900px',
            height: '900px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230, 194, 122, 0.05) 0%, transparent 60%)',
            zIndex: 0
          }} />
          
          {/* Content Card - Using flexible sizing & Premium Glassmorphism */}
          <div style={{
            width: '100%',
            maxHeight: '1500px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '48px',
            padding: '80px 60px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderTop: '1px solid rgba(255, 255, 255, 0.25)', // Glossy top edge
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.6)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
          >
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <span style={{ 
                color: '#E6C27A', // Champagne Gold
                fontSize: '28px', 
                fontWeight: 800, 
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px'
              }}>
                WSET L{episode.level} Quiz
              </span>
              <div style={{ width: '60px', height: '2px', background: '#E6C27A', margin: '0 auto', opacity: 0.6 }} />
            </div>

            {/* Dynamic Font Size for Question */}
            <h2 style={{ 
              fontSize: episode.question.length > 80 ? '54px' : episode.question.length > 40 ? '64px' : '76px',
              lineHeight: '1.3', 
              fontWeight: 700, 
              textAlign: 'left',
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
              margin: '0 0 70px 0',
              color: '#FFFFFF',
              textShadow: '0 4px 12px rgba(0,0,0,0.3)', // Text depth
              display: '-webkit-box',
              WebkitLineClamp: 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {episode.question}
            </h2>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '80px',
              width: '100%'
            }}>
              {episode.options.map((opt) => (
                <div 
                  key={opt.label}
                  style={{
                    padding: '36px 40px',
                    borderRadius: '24px',
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: '4px solid #E6C27A', // Accent border
                    display: 'flex',
                    gap: '30px',
                    alignItems: 'center',
                    width: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                  }}
                >
                  <span style={{ 
                    color: '#E6C27A', 
                    fontWeight: 800,
                    fontSize: '46px',
                    flexShrink: 0
                  }}>{opt.label}</span>
                  <span style={{ 
                    flex: 1, 
                    color: '#FFFFFF',
                    fontSize: opt.text.length > 40 ? '36px' : '42px',
                    fontWeight: 500,
                    opacity: 0.95,
                    lineHeight: '1.35',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word'
                  }}>{opt.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer branding */}
          <div style={{ 
            marginTop: '70px', 
            textAlign: 'center', 
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ fontSize: '40px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              Eclavin <span style={{ fontWeight: 300, opacity: 0.3, margin: '0 12px' }}>|</span> Wine Study
            </div>
            <div style={{ fontSize: '26px', color: '#E6C27A', fontWeight: 500, opacity: 0.8, letterSpacing: '0.1em' }}>
              @eclavin_official
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
