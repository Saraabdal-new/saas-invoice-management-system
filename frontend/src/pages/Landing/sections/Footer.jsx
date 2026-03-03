export default function Footer() {
    return (
      <footer className="bg-black/50 border-t border-amber-500/20 backdrop-blur-xl py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">SMBill</h3>
            <p className="text-gray-400 text-sm">Simplifying invoicing for freelancers and small businesses worldwide.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-amber-400">Features</a></li>
              <li><a href="#" className="hover:text-amber-400">Pricing</a></li>
              <li><a href="#" className="hover:text-amber-400">Templates</a></li>
              <li><a href="#" className="hover:text-amber-400">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-amber-400">About</a></li>
              <li><a href="#" className="hover:text-amber-400">Blog</a></li>
              <li><a href="#" className="hover:text-amber-400">Careers</a></li>
              <li><a href="#" className="hover:text-amber-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-amber-400">Privacy</a></li>
              <li><a href="#" className="hover:text-amber-400">Terms</a></li>
              <li><a href="#" className="hover:text-amber-400">Cookies</a></li>
              <li><a href="#" className="hover:text-amber-400">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">© 2026 SMBill. All rights reserved.</div>
      </footer>
    );
  }
  