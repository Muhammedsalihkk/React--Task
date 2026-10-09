import { useMemo, useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Overview', icon: '◫' },
  { label: 'Sales', icon: '↗' },
  { label: 'Inventory', icon: '▦' },
  { label: 'Customers', icon: '◎' },
  { label: 'Purchases', icon: '↓' },
]

const orders = [
  { id: '#ORD-2048', customer: 'Nora Williams', date: 'Today, 10:42 AM', amount: '$428.00', status: 'Paid', initials: 'NW', tone: 'lavender' },
  { id: '#ORD-2047', customer: 'Daniel Kim', date: 'Today, 09:18 AM', amount: '$86.50', status: 'Processing', initials: 'DK', tone: 'peach' },
  { id: '#ORD-2046', customer: 'Sofia Martinez', date: 'Yesterday, 04:32 PM', amount: '$1,240.00', status: 'Paid', initials: 'SM', tone: 'mint' },
  { id: '#ORD-2045', customer: 'James Wilson', date: 'Yesterday, 01:15 PM', amount: '$74.20', status: 'Pending', initials: 'JW', tone: 'sky' },
]

function Icon({ children }) {
  return <span className="nav-icon" aria-hidden="true">{children}</span>
}

function App() {
  const [active, setActive] = useState('Overview')
  const [range, setRange] = useState('Last 30 days')
  const [query, setQuery] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const filteredOrders = useMemo(() => orders.filter((order) =>
    `${order.id} ${order.customer}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">N</div><span>Nimble</span></div>
        <div className="workspace"><div className="workspace-avatar">M</div><div><strong>Maple & Co.</strong><small>Retail workspace</small></div><span className="chevron">⌄</span></div>
        <div className="nav-section-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.label} className={`nav-item ${active === item.label ? 'active' : ''}`} onClick={() => setActive(item.label)}><Icon>{item.icon}</Icon><span>{item.label}</span>{item.label === 'Sales' && <b className="nav-count">8</b>}</button>)}
        </nav>
        <div className="nav-section-label">MANAGE</div>
        <nav className="nav-list">
          <button className="nav-item"><Icon>◒</Icon><span>Reports</span></button>
          <button className="nav-item"><Icon>⚙</Icon><span>Settings</span></button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="help-card"><div className="help-icon">?</div><strong>Need a hand?</strong><p>Explore our quick start guide.</p><button>View guide <span>→</span></button></div>
        <div className="profile"><div className="profile-avatar">AS</div><div><strong>Alex Smith</strong><small>Owner</small></div><span className="more">•••</span></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{active}</strong></div><div className="top-actions"><div className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></div><button className="icon-button" onClick={() => setShowNotification(!showNotification)} aria-label="Notifications">♧<i /></button><button className="avatar-small">AS</button></div>{showNotification && <div className="notification">You&apos;re all caught up.<button onClick={() => setShowNotification(false)}>×</button></div>}</header>
        <div className="content-wrap">
          <section className="page-heading"><div><p className="eyebrow">MONDAY, OCTOBER 9, 2026</p><h1>Good morning, Alex <span>✦</span></h1><p className="subheading">Here&apos;s what&apos;s happening with your business today.</p></div><button className="primary-button" onClick={() => alert('New order flow opened')}>＋ New order</button></section>

          <section className="stats-grid" aria-label="Business summary"><div className="stat-card"><div className="stat-top"><span>Total revenue</span><span className="stat-icon green">↗</span></div><strong>$24,680.00</strong><p className="positive">↑ 12.8% <span>vs. last month</span></p><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="stat-card"><div className="stat-top"><span>Orders</span><span className="stat-icon purple">▤</span></div><strong>348</strong><p className="positive">↑ 8.4% <span>vs. last month</span></p><div className="mini-bars purple-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="stat-card"><div className="stat-top"><span>New customers</span><span className="stat-icon orange">◎</span></div><strong>86</strong><p className="positive">↑ 18.2% <span>vs. last month</span></p><div className="mini-bars orange-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="stat-card"><div className="stat-top"><span>Low stock items</span><span className="stat-icon red">!</span></div><strong>12</strong><p className="negative">↓ 3 items <span>since yesterday</span></p><div className="stock-progress"><span /></div><small>Requires attention</small></div></section>

          <section className="dashboard-grid"><div className="panel revenue-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track your sales performance over time.</p></div><select value={range} onChange={(e) => setRange(e.target.value)}><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select></div><div className="chart-legend"><span><i className="dot sales-dot" />Sales</span><span><i className="dot orders-dot" />Orders</span></div><div className="chart"><div className="y-labels"><span>$8k</span><span>$6k</span><span>$4k</span><span>$2k</span><span>$0</span></div><div className="chart-area"><div className="grid-line" /><div className="grid-line" /><div className="grid-line" /><div className="grid-line" /><svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Revenue chart"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#87b8a0" stopOpacity=".34" /><stop offset="100%" stopColor="#87b8a0" stopOpacity=".02" /></linearGradient></defs><path d="M0,166 C30,152 36,172 64,145 S110,135 128,149 S168,115 192,130 S222,105 246,121 S287,95 310,108 S348,82 372,97 S407,72 430,84 S464,44 492,71 S531,51 552,63 S595,30 618,51 S660,22 700,36 L700,220 L0,220 Z" fill="url(#area)" /><path d="M0,166 C30,152 36,172 64,145 S110,135 128,149 S168,115 192,130 S222,105 246,121 S287,95 310,108 S348,82 372,97 S407,72 430,84 S464,44 492,71 S531,51 552,63 S595,30 618,51 S660,22 700,36" fill="none" stroke="#4c9b74" strokeWidth="3" /><path d="M0,190 C45,182 70,184 105,174 S155,190 190,168 S238,186 270,169 S315,177 350,152 S400,172 430,148 S475,157 510,131 S559,149 590,120 S645,137 700,113" fill="none" stroke="#b6a8d8" strokeWidth="2.5" strokeDasharray="5 5" /></svg><div className="x-labels"><span>Sep 10</span><span>Sep 15</span><span>Sep 20</span><span>Sep 25</span><span>Sep 30</span><span>Oct 5</span><span>Oct 9</span></div></div></div></div><div className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Latest updates from your workspace.</p></div><button className="text-button">View all →</button></div><div className="activity-list"><div className="activity-item"><span className="activity-dot green-dot">✓</span><div><strong>New order received</strong><p>Order #ORD-2048 · $428.00</p></div><time>12 min ago</time></div><div className="activity-item"><span className="activity-dot purple-dot">+</span><div><strong>New customer added</strong><p>Emma Thompson joined your CRM</p></div><time>46 min ago</time></div><div className="activity-item"><span className="activity-dot orange-dot">↻</span><div><strong>Stock updated</strong><p>12 units of Ceramic Mug added</p></div><time>2 hrs ago</time></div><div className="activity-item"><span className="activity-dot blue-dot">$</span><div><strong>Payment received</strong><p>Invoice #INV-1092 · $1,240.00</p></div><time>3 hrs ago</time></div></div></div></section>

          <section className="panel orders-panel"><div className="panel-heading"><div><h2>Recent orders</h2><p>Keep an eye on your latest sales.</p></div><button className="outline-button">View all orders <span>→</span></button></div><div className="table-wrap"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th><th /></tr></thead><tbody>{filteredOrders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td><div className="customer"><span className={`customer-avatar ${order.tone}`}>{order.initials}</span>{order.customer}</div></td><td>{order.date}</td><td><strong>{order.amount}</strong></td><td><span className={`status ${order.status.toLowerCase()}`}><i />{order.status}</span></td><td><button className="row-more">•••</button></td></tr>)}</tbody></table></div></section>
        </div>
      </main>
    </div>
  )
}

export default App
