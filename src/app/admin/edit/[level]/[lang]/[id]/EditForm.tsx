'use client';

import { useState, useEffect } from 'react';
import { Episode } from '@/lib/episodes';
import { saveEpisodeAction } from '../../../../actions';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function EditForm({ initialEpisode }: { initialEpisode: Episode }) {
  const [episode, setEpisode] = useState(initialEpisode);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const router = useRouter();

  const handleOptionChange = (index: number, text: string) => {
    const newOptions = [...episode.options];
    newOptions[index].text = text;
    setEpisode({ ...episode, options: newOptions });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const result = await saveEpisodeAction(episode);
    setLoading(false);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Successfully saved!' });
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 1000);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [episode]);

  return (
    <div className="editor-container">
      {/* 1. Optimized Header */}
      <header className="editor-nav">
        <div className="nav-left">
          <button onClick={() => router.back()} className="back-btn">
            <ArrowLeft size={22} />
          </button>
          <div className="meta-info">
            <div className="meta-badges">
               <span className="badge">L{episode.level}</span>
               <span className="badge lang">{episode.lang.toUpperCase()}</span>
            </div>
            <h2>Episode {episode.number}</h2>
          </div>
        </div>
        
        <div className="nav-center">
          <div className="tab-group">
            <button className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`} onClick={() => setActiveTab('edit')}>Edit</button>
            <button className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')}>Preview</button>
          </div>
        </div>

        <div className="nav-right">
          <button onClick={() => handleSubmit()} disabled={loading} className="save-btn">
            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
          </button>
        </div>
      </header>

      <main className={`editor-content ${activeTab === 'preview' ? 'preview-mode' : ''}`}>
        {activeTab === 'edit' ? (
          <div className="edit-workspace animate-fade-in">
            
            {/* 1. Header Section: Compact Question Area */}
            <section className="form-section">
              <div className="input-row">
                <div className="input-wrapper" style={{ flex: 1 }}>
                  <label>Title</label>
                  <input type="text" value={episode.title} onChange={(e) => setEpisode({ ...episode, title: e.target.value })} />
                </div>
              </div>
              <div className="input-wrapper" style={{ marginTop: '1.5rem' }}>
                <label>Question</label>
                <textarea value={episode.question} onChange={(e) => setEpisode({ ...episode, question: e.target.value })} rows={2} />
              </div>
            </section>

            {/* 2. Options Section: 2-Column Grid (Balanced) */}
            <section className="form-section">
              <h3 className="sub-header">Multiple Choice Options</h3>
              <div className="options-grid">
                {episode.options.map((opt, i) => (
                  <div key={opt.label} className={`option-card ${episode.answer === opt.label ? 'is-correct' : ''}`}>
                    <div className="card-top">
                      <span className="opt-key">{opt.label}</span>
                      <button 
                        type="button"
                        className={`correct-toggle ${episode.answer === opt.label ? 'active' : ''}`}
                        onClick={() => setEpisode({ ...episode, answer: opt.label })}
                      >
                        {episode.answer === opt.label ? 'CORRECT' : 'SET AS CORRECT'}
                      </button>
                    </div>
                    <textarea 
                      value={opt.text} 
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Explanations: Full Width Vertical (Focused) */}
            <section className="form-section">
              <h3 className="sub-header">Detailed Explanations</h3>
              <div className="expl-stack">
                <div className="input-wrapper">
                  <label>Core Explanation</label>
                  <textarea value={episode.explanation} onChange={(e) => setEpisode({ ...episode, explanation: e.target.value })} rows={18} />
                  <div className="char-count">{episode.explanation.length} characters</div>
                </div>
                <div className="input-wrapper">
                  <label>Expert Concept (Theory)</label>
                  <textarea value={episode.theory} onChange={(e) => setEpisode({ ...episode, theory: e.target.value })} rows={10} />
                </div>
                <div className="input-wrapper">
                  <label>Exam Tip & Trap</label>
                  <textarea value={episode.tip} onChange={(e) => setEpisode({ ...episode, tip: e.target.value })} rows={6} />
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="preview-pane animate-fade-in">
            <div className="preview-mobile-shell">
              <div className="preview-inner">
                <div className="preview-top"><span className="preview-badge">L{episode.level} • Ep {episode.number}</span></div>
                <h2 className="preview-question">{episode.question}</h2>
                <div className="preview-options">
                  {episode.options.map((opt) => (
                    <div key={opt.label} className={`preview-option ${episode.answer === opt.label ? 'correct' : ''}`}>
                      <span className="p-key">{opt.label}.</span>
                      <span className="p-text">{opt.text}</span>
                      {episode.answer === opt.label && <CheckCircle2 size={16} className="correct-icon" />}
                    </div>
                  ))}
                </div>
                <div className="preview-explanation">
                  <div className="expl-header">Explanation</div>
                  <p>{episode.explanation}</p>
                  {episode.theory && <div className="expl-sub"><div className="expl-header">Expert Concept</div><p>{episode.theory}</p></div>}
                  {episode.tip && <div className="expl-sub"><div className="expl-header">Exam Tip</div><p>{episode.tip}</p></div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {message && (
        <div className={`notification ${message.type}`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <style jsx global>{`
        #app-wrapper { max-width: 100% !important; background-color: #f8f9fa !important; }
        body { display: block !important; overflow-x: hidden; }
        * { box-sizing: border-box; }
      `}</style>

      <style jsx>{`
        .editor-container { min-height: 100vh; background: #f8f9fa; display: flex; flex-direction: column; }
        .editor-nav { position: sticky; top: 0; z-index: 1000; height: 80px; padding: 0 3rem; background: #fff; border-bottom: 1px solid #e9ecef; display: flex; justify-content: space-between; align-items: center; }
        .nav-left { display: flex; align-items: center; gap: 1.5rem; }
        .meta-info h2 { font-size: 1.2rem; font-weight: 800; margin: 0; color: #1a1a1a; }
        .badge { padding: 0.2rem 0.6rem; background: #f1f3f5; border-radius: 4px; font-size: 0.7rem; font-weight: 800; color: #495057; margin-right: 0.4rem; }
        .back-btn { width: 42px; height: 42px; border-radius: 10px; border: 1px solid #dee2e6; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .back-btn:hover { background: #f8f9fa; }
        
        .tab-group { background: #f1f3f5; padding: 4px; border-radius: 10px; display: flex; gap: 4px; }
        .tab-btn { padding: 0.5rem 1.5rem; border-radius: 8px; border: none; background: transparent; font-weight: 700; font-size: 0.9rem; color: #868e96; cursor: pointer; }
        .tab-btn.active { background: #fff; color: #1a1a1a; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

        .save-btn { padding: 0.75rem 1.75rem; background: #722f37; color: #fff; border: none; border-radius: 12px; font-weight: 800; font-size: 1rem; display: flex; align-items: center; gap: 0.6rem; cursor: pointer; transition: all 0.2s; }
        .save-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 15px rgba(114, 47, 55, 0.3); }

        .editor-content { flex: 1; padding: 3rem; width: 100%; display: flex; flex-direction: column; align-items: center; }
        .edit-workspace { width: 100%; max-width: 1400px; display: flex; flex-direction: column; gap: 2rem; }
        
        .form-section { background: #fff; border-radius: 20px; padding: 2rem; border: 1px solid #e9ecef; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .sub-header { font-size: 1.3rem; font-weight: 900; margin: 0 0 1.5rem 0; color: #1a1a1a; }

        .input-wrapper { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }
        .input-wrapper label { font-size: 0.85rem; font-weight: 800; color: #868e96; text-transform: uppercase; letter-spacing: 0.05em; }
        .input-wrapper input, .input-wrapper textarea { width: 100%; padding: 1rem; border-radius: 12px; border: 1px solid #dee2e6; background: #f8f9fa; font-size: 1.05rem; color: #1a1a1a; transition: all 0.2s; line-height: 1.6; display: block; }
        .input-wrapper input:focus, .input-wrapper textarea:focus { outline: none; border-color: #722f37; background: #fff; }

        .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; width: 100%; }
        .option-card { background: #f8f9fa; border: 2px solid transparent; border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; width: 100%; }
        .option-card.is-correct { border-color: #22c55e; background: #f0fdf4; }
        .card-top { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .opt-key { font-size: 1.4rem; font-weight: 900; color: #adb5bd; }
        .is-correct .opt-key { color: #22c55e; }
        
        .correct-toggle { padding: 0.5rem 1rem; border-radius: 8px; border: 1.5px solid #dee2e6; background: #fff; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: all 0.2s; }
        .correct-toggle.active { background: #22c55e; border-color: #22c55e; color: #fff; }
        .option-card textarea { width: 100%; padding: 1rem; border-radius: 10px; border: 1px solid #e1e4e8; background: #fff; font-size: 1rem; color: #1a1a1a; display: block; }

        .expl-stack { display: flex; flex-direction: column; gap: 2rem; }
        .char-count { font-size: 0.75rem; color: #adb5bd; text-align: right; margin-top: 0.3rem; }

        /* Preview Shell */
        .preview-pane { width: 100%; display: flex; justify-content: center; }
        .preview-mobile-shell { width: 400px; height: 800px; background: #1a1a1a; border-radius: 50px; padding: 12px; box-shadow: 0 40px 100px rgba(0,0,0,0.2); }
        .preview-inner { background: #fff; width: 100%; height: 100%; border-radius: 38px; overflow-y: auto; padding: 3rem 1.5rem; }
        .preview-question { font-size: 1.5rem; font-weight: 900; margin: 1.5rem 0; line-height: 1.3; }
        .preview-option { padding: 1.2rem; background: #f1f3f5; border-radius: 16px; margin-bottom: 1rem; display: flex; gap: 0.8rem; font-weight: 700; border: 2px solid transparent; }
        .preview-option.correct { border-color: #22c55e; background: #f0fdf4; }
        .preview-explanation { margin-top: 3rem; border-top: 2px solid #f1f3f5; padding-top: 2rem; }

        .notification { position: fixed; bottom: 2rem; right: 2rem; padding: 1.2rem 2.5rem; border-radius: 16px; display: flex; align-items: center; gap: 0.8rem; font-weight: 800; font-size: 1.1rem; color: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.2); z-index: 2000; animation: slideIn 0.4s ease-out; }
        .notification.success { background: #22c55e; }
        .notification.error { background: #ef4444; }

        @keyframes slideIn { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
