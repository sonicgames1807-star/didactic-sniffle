import { useEffect, useRef, useState } from 'react'
import {
  Aperture, ArrowLeft, Camera, Check, ChevronRight, Crop, Download, Eye,
  FlipHorizontal2, Grid3X3, HelpCircle, Home, ImagePlus, Lock, Menu, Moon,
  MoreHorizontal, Move, Plus, RotateCcw, RotateCw, Save, Settings, Share2,
  Sparkles, Sun, Trash2, Unlock, Upload, X, ZoomIn
} from 'lucide-react'

const onboarding = [
  { title: 'Подготовь место', text: 'Поставь телефон над листом или планшетом. Экран станет аккуратной визуальной подложкой.', icon: Aperture, art: 'stand' },
  { title: 'Добавь рисунок', text: 'Выбери изображение из галереи или сделай фотографию прямо сейчас.', icon: ImagePlus, art: 'image' },
  { title: 'Настрой видимость', text: 'Проведи по неоновой дорожке: от едва заметных контуров до чёткой картинки.', icon: Eye, art: 'opacity' },
  { title: 'Размести и рисуй', text: 'Двигай одним пальцем, масштабируй и поворачивай двумя. Затем зафиксируй рисунок.', icon: Move, art: 'gesture' }
]

const starterProjects = [
  { id: 'demo-1', name: 'Лист монстеры', date: 'Сегодня, 16:42', thumb: 'leaf' },
  { id: 'demo-2', name: 'Профиль', date: 'Вчера, 20:18', thumb: 'face' }
]

const IconButton = ({ label, children, active, ...props }) => <button className={`icon-button ${active ? 'active' : ''}`} aria-label={label} aria-pressed={active} {...props}>{children}</button>

function Logo() {
  return <div className="brand"><span className="brand-mark"><Sparkles size={17} aria-hidden="true" /></span><span>Trace Neon</span></div>
}

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0)
  const item = onboarding[step]
  const ArtIcon = item.icon
  return <main id="main" className="onboarding page-enter">
    <header className="onboarding-head"><Logo /><button className="text-button" onClick={onDone}>Пропустить</button></header>
    <section className="onboarding-body" aria-live="polite">
      <div className={`lesson-art ${item.art}`}>
        <div className="lesson-orbit" />
        <div className="phone-demo"><div className="demo-screen"><ArtIcon size={54} strokeWidth={1.3} aria-hidden="true" /></div></div>
        <div className="paper-demo"><span /><span /><span /></div>
      </div>
      <div className="step-copy"><span className="step-count">{step + 1} из {onboarding.length}</span><h1>{item.title}</h1><p>{item.text}</p></div>
    </section>
    <footer className="onboarding-footer">
      <div className="dots" aria-label={`Шаг ${step + 1} из 4`}>{onboarding.map((_, i) => <span key={i} className={i === step ? 'current' : ''} />)}</div>
      <button className="primary-button" onClick={() => step === 3 ? onDone() : setStep(step + 1)}>{step === 3 ? 'Начать' : 'Далее'}<ChevronRight size={20} aria-hidden="true" /></button>
    </footer>
  </main>
}

function EmptyArtwork() {
  return <div className="empty-art" aria-hidden="true"><div className="empty-glow"/><div className="mini-phone"><div className="mini-drawing"><Sparkles size={28}/></div></div><div className="mini-paper"><i/><i/><i/></div></div>
}

function ProjectThumb({ type }) {
  return <div className={`project-thumb ${type}`} aria-hidden="true"><svg viewBox="0 0 120 100"><path d={type === 'leaf' ? 'M65 88C34 68 33 27 91 14c4 37-3 66-26 74Zm0 0c3-28 10-46 26-74M59 65 39 51m28-4 18-13' : 'M42 86c0-16 8-20 17-23-10-9-15-25-8-38 9-17 38-14 43 7 3 14-5 24-14 31 10 4 17 10 20 23M53 38c12 2 24-2 31-10M63 47h1m17 0h1M69 57c4 3 9 3 13 0'} /></svg></div>
}

function HomeScreen({ projects, onPick, onOpenProject, onHelp, onSettings }) {
  return <main id="main" className="home-screen page-enter">
    <header className="topbar"><Logo /><IconButton label="Открыть настройки" onClick={onSettings}><Settings size={21}/></IconButton></header>
    <section className="hero-copy"><p className="hello">Твоя мастерская</p><h1>Что будем<br/>рисовать?</h1></section>
    <section className="add-card">
      <EmptyArtwork />
      <div className="add-copy"><h2>Добавь изображение</h2><p>Контуры появятся на рабочем экране</p></div>
      <div className="add-actions">
        <button className="primary-button" onClick={() => onPick('gallery')}><Upload size={20}/>Из галереи</button>
        <button className="secondary-button" onClick={() => onPick('camera')}><Camera size={20}/>Сделать фото</button>
      </div>
    </section>
    <section className="recent-section">
      <div className="section-heading"><h2>Недавние</h2><button className="text-button">Все проекты</button></div>
      <div className="project-list">{projects.map(project => <button className="project-row" key={project.id} onClick={() => onOpenProject(project)}><ProjectThumb type={project.thumb}/><span className="project-meta"><strong>{project.name}</strong><small>{project.date}</small></span><ChevronRight size={20}/></button>)}</div>
    </section>
    <button className="how-link" onClick={onHelp}><HelpCircle size={19}/>Как это работает?</button>
    <BottomNav current="home" />
  </main>
}

function BottomNav({ current }) {
  return <nav className="bottom-nav" aria-label="Основная навигация"><button className={current === 'home' ? 'active' : ''}><Home size={21}/><span>Главная</span></button><button><Plus size={23}/><span>Новый</span></button><button><Settings size={21}/><span>Настройки</span></button></nav>
}

function AddSheet({ onClose, onPick }) {
  return <div className="modal-layer"><button className="scrim" aria-label="Закрыть меню" onClick={onClose}/><section className="sheet page-up" role="dialog" aria-modal="true" aria-labelledby="add-title"><div className="sheet-handle"/><div className="sheet-title"><div><h2 id="add-title">Добавить рисунок</h2><p>Выбери источник изображения</p></div><IconButton label="Закрыть" onClick={onClose}><X size={21}/></IconButton></div><div className="source-list"><button onClick={() => onPick('gallery')}><span className="source-icon"><ImagePlus/></span><span><strong>Выбрать из галереи</strong><small>JPG, PNG или WebP</small></span><ChevronRight/></button><button onClick={() => onPick('camera')}><span className="source-icon violet"><Camera/></span><span><strong>Сделать фото</strong><small>Откроется камера телефона</small></span><ChevronRight/></button></div><p className="privacy-note">Изображения остаются только на твоём устройстве.</p></section></div>
}

function Toast({ children }) { return <div className="toast" role="status"><Check size={18}/>{children}</div> }

function Workspace({ source, project, onBack, onSave, onReplace }) {
  const [opacity, setOpacity] = useState(project?.opacity ?? 58)
  const [locked, setLocked] = useState(project?.locked ?? false)
  const [grid, setGrid] = useState(project?.grid ?? false)
  const [tools, setTools] = useState(true)
  const [toast, setToast] = useState('')
  const [transform, setTransform] = useState(project?.transform ?? { x: 0, y: 0, scale: 1, rotate: 0, flip: 1 })
  const pointers = useRef(new Map())
  const gesture = useRef(null)

  const flash = text => { setToast(text); window.setTimeout(() => setToast(''), 2200) }
  const reset = () => { setTransform({ x: 0, y: 0, scale: 1, rotate: 0, flip: 1 }); flash('Положение сброшено') }
  const save = () => { onSave({ name: project?.name || 'Новый рисунок', opacity, thumb: project?.thumb || 'leaf', transform, grid, locked }); flash('Проект сохранён') }

  const pointerDown = e => {
    if (locked) return
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const pts = [...pointers.current.values()]
    gesture.current = pts.length === 1 ? { type: 'move', start: pts[0], base: transform } : { type: 'pinch', distance: Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y), angle: Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x), base: transform }
  }
  const pointerMove = e => {
    if (locked || !pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const pts = [...pointers.current.values()]
    if (pts.length === 1 && gesture.current?.type === 'move') setTransform(t => ({ ...t, x: gesture.current.base.x + pts[0].x - gesture.current.start.x, y: gesture.current.base.y + pts[0].y - gesture.current.start.y }))
    if (pts.length >= 2 && gesture.current?.type === 'pinch') {
      const distance = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
      const angle = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x)
      setTransform(t => ({ ...t, scale: Math.max(.35, Math.min(4, gesture.current.base.scale * distance / gesture.current.distance)), rotate: gesture.current.base.rotate + (angle - gesture.current.angle) * 180 / Math.PI }))
    }
  }
  const pointerUp = e => { pointers.current.delete(e.pointerId); gesture.current = null }

  return <main id="main" className="workspace page-enter">
    <header className="workspace-bar"><IconButton label="Вернуться на главный экран" onClick={onBack}><ArrowLeft/></IconButton><div><strong>{project?.name || 'Новый рисунок'}</strong><small>{locked ? 'Положение зафиксировано' : 'Можно двигать и масштабировать'}</small></div><IconButton label="Сохранить проект" onClick={save}><Save/></IconButton></header>
    <section className={`canvas ${grid ? 'show-grid' : ''} ${locked ? 'is-locked' : ''}`} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
      <div className="canvas-vignette"/>
      <div className="trace-image" style={{ opacity: opacity / 100, transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale * transform.flip}, ${transform.scale}) rotate(${transform.rotate}deg)` }}>
        {source ? <img src={source} alt="Загруженный рисунок для срисовки" draggable="false"/> : <ProjectThumb type={project?.thumb || 'leaf'}/>} 
      </div>
      <div className="canvas-status"><span><ZoomIn size={15}/>{Math.round(transform.scale * 100)}%</span><span><RotateCw size={15}/>{Math.round(transform.rotate)}°</span></div>
      {locked && <div className="locked-pill"><Lock size={15}/>Зафиксировано</div>}
    </section>
    <section className="control-deck">
      <div className="opacity-head"><div><span>Прозрачность</span><strong>{opacity}%</strong></div><div className="quick-values">{[25,50,75,100].map(v => <button key={v} className={opacity === v ? 'active' : ''} onClick={() => setOpacity(v)}>{v}</button>)}</div></div>
      <div className="range-wrap"><Eye size={18}/><input aria-label="Прозрачность изображения" type="range" min="0" max="100" value={opacity} onChange={e => setOpacity(Number(e.target.value))} style={{ '--value': `${opacity}%` }}/><Sun size={18}/></div>
      <button className="tool-toggle" aria-expanded={tools} onClick={() => setTools(!tools)}><span>{tools ? 'Свернуть инструменты' : 'Показать инструменты'}</span><Menu size={18}/></button>
      {tools && <div className="tool-grid">
        <button onClick={onReplace}><ImagePlus/><span>Заменить</span></button>
        <button onClick={() => setTransform(t => ({ ...t, rotate: t.rotate + 90 }))}><RotateCw/><span>Повернуть</span></button>
        <button onClick={() => setTransform(t => ({ ...t, flip: t.flip * -1 }))}><FlipHorizontal2/><span>Отразить</span></button>
        <button className={grid ? 'active' : ''} aria-pressed={grid} onClick={() => setGrid(!grid)}><Grid3X3/><span>Сетка</span></button>
        <button className={locked ? 'active' : ''} aria-pressed={locked} onClick={() => { setLocked(!locked); flash(locked ? 'Рисунок разблокирован' : 'Рисунок зафиксирован') }}>{locked ? <Unlock/> : <Lock/>}<span>{locked ? 'Открыть' : 'Закрепить'}</span></button>
        <button onClick={reset}><RotateCcw/><span>Сбросить</span></button>
        <button onClick={save}><Save/><span>Сохранить</span></button>
        <button onClick={() => navigator.share?.({ title: 'Trace Neon', text: 'Мой проект в Trace Neon' }).catch(() => {})}><Share2/><span>Поделиться</span></button>
      </div>}
    </section>
    {toast && <Toast>{toast}</Toast>}
  </main>
}

function SettingsScreen({ onBack, onTutorial }) {
  const [theme, setTheme] = useState('dark')
  return <main id="main" className="settings-screen page-enter"><header className="simple-header"><IconButton label="Назад" onClick={onBack}><ArrowLeft/></IconButton><h1>Настройки</h1><span/></header><section className="settings-group"><h2>Внешний вид</h2><button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span className="settings-icon">{theme === 'dark' ? <Moon/> : <Sun/>}</span><span><strong>Тема</strong><small>{theme === 'dark' ? 'Тёмная' : 'Светлая'}</small></span><ChevronRight/></button><button><span className="settings-icon"><Aperture/></span><span><strong>Ориентация</strong><small>Автоматически</small></span><ChevronRight/></button></section><section className="settings-group"><h2>Работа</h2><label className="switch-row"><span><strong>Автосохранение</strong><small>Не потерять положение рисунка</small></span><input type="checkbox" defaultChecked/><i/></label><label className="switch-row"><span><strong>Подсказки качества</strong><small>Предупреждать о тёмных фото</small></span><input type="checkbox" defaultChecked/><i/></label></section><section className="settings-group"><h2>Помощь</h2><button onClick={onTutorial}><span className="settings-icon"><HelpCircle/></span><span><strong>Пройти обучение снова</strong><small>4 коротких шага</small></span><ChevronRight/></button></section><p className="version">Trace Neon · версия 1.0</p></main>
}

function CropScreen({ source, onCancel, onUse }) {
  return <main id="main" className="crop-screen page-enter"><header className="simple-header"><IconButton label="Отменить" onClick={onCancel}><X/></IconButton><h1>Подготовить рисунок</h1><span/></header><div className="crop-stage"><img src={source} alt="Предпросмотр выбранного рисунка"/><div className="crop-frame"><i/><i/><i/><i/></div></div><section className="crop-options"><div><Crop/><span>Обрезать</span></div><div><RotateCw/><span>Повернуть</span></div><div><Sparkles/><span>Улучшить</span></div></section><div className="quality-hint"><Sparkles size={18}/><p><strong>Изображение готово</strong><br/>Мы сохраним исходные пропорции.</p></div><footer className="crop-footer"><button className="primary-button" onClick={onUse}>Использовать рисунок<Check size={20}/></button></footer></main>
}

export default function App() {
  const [screen, setScreen] = useState(() => localStorage.getItem('trace-onboarded') ? 'home' : 'onboarding')
  const [sheet, setSheet] = useState(false)
  const [source, setSource] = useState('')
  const [project, setProject] = useState(null)
  const [projects, setProjects] = useState(() => { try { return JSON.parse(localStorage.getItem('trace-projects')) || starterProjects } catch { return starterProjects } })
  const fileRef = useRef(null)
  const cameraRef = useRef(null)

  useEffect(() => localStorage.setItem('trace-projects', JSON.stringify(projects)), [projects])
  const finishTutorial = () => { localStorage.setItem('trace-onboarded', 'yes'); setScreen('home') }
  const choose = type => { setSheet(false); (type === 'camera' ? cameraRef : fileRef).current?.click() }
  const fileChosen = e => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { setSource(reader.result); setScreen('crop') }; reader.readAsDataURL(file); e.target.value = '' }
  const saveProject = data => { const next = { ...data, source: source || project?.source || '', id: project?.id || `p-${Date.now()}`, date: 'Только что' }; setProject(next); setProjects(prev => [next, ...prev.filter(p => p.id !== next.id)].slice(0, 8)) }

  return <div className="app-shell">
    <input ref={fileRef} className="visually-hidden" type="file" accept="image/*" onChange={fileChosen}/>
    <input ref={cameraRef} className="visually-hidden" type="file" accept="image/*" capture="environment" onChange={fileChosen}/>
    {screen === 'onboarding' && <Onboarding onDone={finishTutorial}/>} 
    {screen === 'home' && <HomeScreen projects={projects} onPick={() => setSheet(true)} onOpenProject={p => { setProject(p); setSource(p.source || ''); setScreen('workspace') }} onHelp={() => setScreen('onboarding')} onSettings={() => setScreen('settings')}/>} 
    {screen === 'crop' && <CropScreen source={source} onCancel={() => setScreen('home')} onUse={() => { setProject(null); setScreen('workspace') }}/>} 
    {screen === 'workspace' && <Workspace source={source} project={project} onBack={() => setScreen('home')} onSave={saveProject} onReplace={() => setSheet(true)}/>} 
    {screen === 'settings' && <SettingsScreen onBack={() => setScreen('home')} onTutorial={() => setScreen('onboarding')}/>} 
    {sheet && <AddSheet onClose={() => setSheet(false)} onPick={choose}/>} 
  </div>
}
