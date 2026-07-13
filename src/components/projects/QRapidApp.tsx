import { Globe, Building2, CreditCard, Activity } from 'lucide-react';

export default function QRapidApp() {
  return (
    <div className="flex h-full text-white/90">
      {/* Sidebar */}
      <div className="w-64 bg-black/40 border-r border-white/10 p-4 hidden md:block">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Project Scope</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm bg-white/10 px-3 py-2 rounded-md">
                <Globe size={16} /> Overview
              </li>
              <li className="flex items-center gap-3 text-sm hover:bg-white/5 px-3 py-2 rounded-md cursor-pointer transition-colors">
                <Building2 size={16} /> Architecture
              </li>
              <li className="flex items-center gap-3 text-sm hover:bg-white/5 px-3 py-2 rounded-md cursor-pointer transition-colors">
                <CreditCard size={16} /> Payments
              </li>
              <li className="flex items-center gap-3 text-sm hover:bg-white/5 px-3 py-2 rounded-md cursor-pointer transition-colors">
                <Activity size={16} /> Analytics
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">Next.js</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">TypeScript</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">Tailwind</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">Stripe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">QRapid</h1>
        <p className="text-xl text-white/60 mb-12 max-w-2xl">
          A high-performance contactless ordering platform powering 40+ restaurants with real-time analytics and seamless payments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-4xl font-light mb-2">₹1Cr+</h3>
            <p className="text-sm text-white/50 uppercase tracking-wider">Transactions Processed</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-4xl font-light mb-2">40+</h3>
            <p className="text-sm text-white/50 uppercase tracking-wider">Active Restaurants</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:col-span-2">
            <h3 className="text-lg font-medium mb-4">The Challenge</h3>
            <p className="text-white/70 leading-relaxed">
              Traditional restaurant ordering is slow and error-prone. Waitstaff spend too much time taking orders and processing payments, leading to bottlenecks during peak hours. QRapid solves this by putting the entire POS experience directly in the customer's pocket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
