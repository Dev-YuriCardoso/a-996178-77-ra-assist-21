
import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  BarChart3,
  Calendar,
  Search,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [sellers, setSellers] = useState(['João Silva', 'Maria Santos', 'Pedro Oliveira']);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', price: '' });
  const [newSale, setNewSale] = useState({ productId: '', sellerId: '', quantity: '' });
  const [newSeller, setNewSeller] = useState('');

  // Carregar dados do localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('raProducts');
    const savedSales = localStorage.getItem('raSales');
    const savedSellers = localStorage.getItem('raSellers');
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    }
    if (savedSellers) {
      setSellers(JSON.parse(savedSellers));
    }
  }, []);

  // Salvar produtos no localStorage
  useEffect(() => {
    localStorage.setItem('raProducts', JSON.stringify(products));
  }, [products]);

  // Salvar vendas no localStorage
  useEffect(() => {
    localStorage.setItem('raSales', JSON.stringify(sales));
  }, [sales]);

  // Salvar vendedores no localStorage
  useEffect(() => {
    localStorage.setItem('raSellers', JSON.stringify(sellers));
  }, [sellers]);

  const addProduct = () => {
    if (newProduct.name && newProduct.quantity && newProduct.price) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        quantity: parseInt(newProduct.quantity),
        price: parseFloat(newProduct.price),
        createdAt: new Date().toISOString()
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', quantity: '', price: '' });
    }
  };

  const addSale = () => {
    if (newSale.productId && newSale.sellerId && newSale.quantity) {
      const product = products.find(p => p.id === parseInt(newSale.productId));
      if (product && product.quantity >= parseInt(newSale.quantity)) {
        const sale = {
          id: Date.now(),
          productId: parseInt(newSale.productId),
          productName: product.name,
          sellerId: newSale.sellerId,
          quantity: parseInt(newSale.quantity),
          totalValue: product.price * parseInt(newSale.quantity),
          date: new Date().toISOString()
        };
        
        // Atualizar estoque
        setProducts(products.map(p => 
          p.id === parseInt(newSale.productId) 
            ? { ...p, quantity: p.quantity - parseInt(newSale.quantity) }
            : p
        ));
        
        setSales([...sales, sale]);
        setNewSale({ productId: '', sellerId: '', quantity: '' });
      }
    }
  };

  const addSeller = () => {
    if (newSeller.trim() && !sellers.includes(newSeller.trim())) {
      setSellers([...sellers, newSeller.trim()]);
      setNewSeller('');
    }
  };

  const deleteSeller = (sellerName) => {
    setSellers(sellers.filter(seller => seller !== sellerName));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getCurrentMonthSales = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
    });
  };

  const getTotalRevenue = () => {
    return getCurrentMonthSales().reduce((total, sale) => total + sale.totalValue, 0);
  };

  const getTotalProducts = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  const getSalesBySeller = () => {
    const salesBySeller = {};
    getCurrentMonthSales().forEach(sale => {
      if (!salesBySeller[sale.sellerId]) {
        salesBySeller[sale.sellerId] = { count: 0, revenue: 0 };
      }
      salesBySeller[sale.sellerId].count += sale.quantity;
      salesBySeller[sale.sellerId].revenue += sale.totalValue;
    });
    return salesBySeller;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{getTotalProducts()}</div>
            <p className="text-sm text-gray-600">itens em estoque</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Vendas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{getCurrentMonthSales().length}</div>
            <p className="text-sm text-gray-600">transações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Receita do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ {getTotalRevenue().toFixed(2)}</div>
            <p className="text-sm text-gray-600">faturamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Produtos Únicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            <p className="text-sm text-gray-600">tipos diferentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Vendas por vendedor */}
      <Card>
        <CardHeader>
          <CardTitle>Performance dos Vendedores (Mês Atual)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(getSalesBySeller()).map(([seller, data]) => (
              <div key={seller} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{seller}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{data.count} vendas</div>
                  <div className="text-sm text-gray-600">R$ {data.revenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Adicionar produto */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Nome do produto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Preço (R$)"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={addProduct} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Estoque de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Produto</th>
                  <th className="text-left py-3">Quantidade</th>
                  <th className="text-left py-3">Preço</th>
                  <th className="text-left py-3">Valor Total</th>
                  <th className="text-left py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3">{product.name}</td>
                    <td className="py-3">{product.quantity}</td>
                    <td className="py-3">R$ {product.price.toFixed(2)}</td>
                    <td className="py-3">R$ {(product.quantity * product.price).toFixed(2)}</td>
                    <td className="py-3">
                      <Button
                        onClick={() => deleteProduct(product.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      {/* Adicionar venda */}
      <Card>
        <CardHeader>
          <CardTitle>Registrar Nova Venda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={newSale.productId}
              onChange={(e) => setNewSale({...newSale, productId: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o produto</option>
              {products.filter(p => p.quantity > 0).map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (Estoque: {product.quantity})
                </option>
              ))}
            </select>
            <select
              value={newSale.sellerId}
              onChange={(e) => setNewSale({...newSale, sellerId: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o vendedor</option>
              {sellers.map(seller => (
                <option key={seller} value={seller}>{seller}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantidade"
              value={newSale.quantity}
              onChange={(e) => setNewSale({...newSale, quantity: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={addSale} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Registrar Venda
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de vendas */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Data</th>
                  <th className="text-left py-3">Produto</th>
                  <th className="text-left py-3">Vendedor</th>
                  <th className="text-left py-3">Quantidade</th>
                  <th className="text-left py-3">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b">
                    <td className="py-3">
                      {new Date(sale.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3">{sale.productName}</td>
                    <td className="py-3">{sale.sellerId}</td>
                    <td className="py-3">{sale.quantity}</td>
                    <td className="py-3">R$ {sale.totalValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSellers = () => (
    <div className="space-y-6">
      {/* Adicionar vendedor */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nome do vendedor"
              value={newSeller}
              onChange={(e) => setNewSeller(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={addSeller} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Vendedor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de vendedores */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Vendedores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sellers.map((seller) => (
              <div key={seller} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{seller}</span>
                </div>
                <Button
                  onClick={() => deleteSeller(seller)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo - Ra Assistência</h1>
          <Button onClick={onLogout} variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'products' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Produtos</span>
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'sales' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <DollarSign className="h-5 w-5" />
              <span>Vendas</span>
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'sellers' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Vendedores</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'sales' && renderSales()}
          {activeTab === 'sellers' && renderSellers()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
