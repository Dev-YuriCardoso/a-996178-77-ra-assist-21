
import React, { useState } from 'react';
import { Smartphone, Monitor, Wrench, Clock, Star, Shield, MapPin, Phone, Mail, Zap, Cpu, Wifi, User, LogIn, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginModal from '@/components/LoginModal';
import AdminPanel from '@/components/AdminPanel';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    dispositivo: '',
    problema: ''
  });

  const handleLogin = (email, password) => {
    if (email === 'admin' && password === 'alan@123') {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    const { nome, telefone, dispositivo, problema } = formData;
    
    // Criar o corpo do email
    const subject = encodeURIComponent('Nova Solicitação Tech - Ra Assistência');
    const body = encodeURIComponent(`
Olá,

Uma nova solicitação tech foi recebida através do site:

Nome: ${nome}
Telefone: ${telefone}
Dispositivo: ${dispositivo}
Problema: ${problema}

Atenciosamente,
Sistema Ra Assistência Técnica
    `);
    
    // Abrir cliente de email
    window.location.href = `mailto:lixeiradoyuno@gmail.com?subject=${subject}&body=${body}`;
    
    // Limpar formulário
    setFormData({
      nome: '',
      telefone: '',
      dispositivo: '',
      problema: ''
    });
  };

  if (isLoggedIn) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl shadow-2xl border-b border-gray-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 rounded-2xl shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <Wrench className="h-8 w-8 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ra Assistência Técnica
              </h1>
              <p className="text-sm text-gray-400 font-medium">Tecnologia Avançada</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Início', 'Serviços', 'Sobre', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={item === 'Serviços' ? '#services' : '#'} 
                onClick={item === 'Serviços' ? scrollToServices : undefined}
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group font-medium"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="flex space-x-3">
            <Button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Zap className="mr-2 h-4 w-4" />
              Orçamento Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-slate-900/70 to-black/90"></div>
        {/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-20 gap-1 h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div 
                key={i} 
                className="border border-cyan-500/30 animate-pulse" 
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
        {/* Floating Tech Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-black/70 backdrop-blur-sm border border-cyan-400/50 rounded-full px-6 py-3 shadow-2xl">
                <Cpu className="h-5 w-5 text-cyan-400" />
                <span className="text-cyan-300 font-medium">Tecnologia Avançada</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-6xl md:text-7xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">Conserto</span>
                  <br />
                  <span className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 bg-clip-text text-transparent">Tech</span>
                  <br />
                  <span className="text-white">Avançado</span>
                </h2>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Especialistas em reparo de dispositivos com tecnologia de ponta e mais de 10 anos de experiência. 
                <span className="text-cyan-400 font-semibold"> Diagnóstico gratuito</span> e garantia premium.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group">
                  <Phone className="mr-2 h-5 w-5" />
                  Ligar Agora
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 bg-black/50 backdrop-blur-sm shadow-xl transition-all duration-300">
                  <MapPin className="mr-2 h-5 w-5" />
                  Como Chegar
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop" 
                alt="Reparo de computadores"
                className="relative rounded-3xl shadow-2xl w-full object-cover h-96 border border-cyan-400/30"
              />
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-yellow-400/30">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-white" />
                  <div>
                    <p className="font-bold text-white text-lg">Garantia</p>
                    <p className="text-yellow-100 text-sm">90 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Informativos */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Por que escolher a Ra Assistência?
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Nossos diferenciais tecnológicos que nos tornam únicos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group bg-black/50 border-2 border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <CardHeader className="text-center relative">
                <div className="mx-auto bg-gradient-to-br from-cyan-500/20 to-cyan-600/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-cyan-400/30">
                  <Clock className="h-10 w-10 text-cyan-400" />
                </div>
                <CardTitle className="text-white text-xl">Velocidade Tech</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center leading-relaxed">
                  Diagnóstico em 30 minutos e reparo ultra-rápido com tecnologia avançada
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-black/50 border-2 border-purple-500/30 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <CardHeader className="text-center relative">
                <div className="mx-auto bg-gradient-to-br from-purple-500/20 to-purple-600/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-400/30">
                  <Star className="h-10 w-10 text-purple-400" />
                </div>
                <CardTitle className="text-white text-xl">Excelência</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center leading-relaxed">
                  Técnicos especializados e peças premium para máxima durabilidade
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-black/50 border-2 border-pink-500/30 hover:border-pink-400/60 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <CardHeader className="text-center relative">
                <div className="mx-auto bg-gradient-to-br from-pink-500/20 to-pink-600/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-pink-400/30">
                  <Shield className="h-10 w-10 text-pink-400" />
                </div>
                <CardTitle className="text-white text-xl">Confiança Tech</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center leading-relaxed">
                  Mais de 5000 clientes satisfeitos e garantia premium estendida
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Serviços Cards */}
      <section id="services" className="py-24 bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Serviços Tecnológicos
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed">
              Soluções avançadas para seus dispositivos com tecnologia de última geração
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smartphones */}
            <Card className="group bg-black/70 border border-cyan-500/30 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 border-b border-cyan-500/30">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 border border-cyan-400/50">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Smartphones</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="mb-6 text-gray-400 text-base leading-relaxed">
                  Reparo especializado com tecnologia avançada
                </CardDescription>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Troca de tela e touch</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Reparo de placa mãe</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Troca de bateria</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Problemas de software</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Recuperação pós água</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Computadores */}
            <Card className="group bg-black/70 border border-purple-500/30 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border-b border-purple-500/30">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 border border-purple-400/50">
                    <Monitor className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Computadores</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="mb-6 text-gray-400 text-base leading-relaxed">
                  Manutenção completa com tecnologia premium
                </CardDescription>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                    <span>Formatação e instalação</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                    <span>Limpeza e manutenção</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                    <span>Upgrade de hardware</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                    <span>Remoção de malware</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                    <span>Recuperação de dados</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Serviço Express */}
            <Card className="group bg-black/70 border border-pink-500/30 shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-br from-pink-500/10 to-pink-600/20 border-b border-pink-500/30">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 border border-pink-400/50">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Express Tech</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="mb-6 text-gray-400 text-base leading-relaxed">
                  Serviços ultra-rápidos com tecnologia instantânea
                </CardDescription>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-pink-400" />
                    <span>Instalação de películas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-pink-400" />
                    <span>Setup de aplicativos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-pink-400" />
                    <span>Backup de dados</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-pink-400" />
                    <span>Configurações avançadas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-pink-400" />
                    <span>Diagnóstico tech</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 relative bg-gradient-to-br from-gray-900 via-black to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tecnologia do Futuro
              </span>
            </h3>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Utilizamos as mais avançadas tecnologias e práticas do mercado mundial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/30 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-500/50 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-green-500/20">
                <Shield className="h-12 w-12 text-green-400" />
              </div>
              <h4 className="text-3xl font-bold text-white mb-6">Garantia Premium</h4>
              <p className="text-gray-400 text-lg leading-relaxed">
                Garantia estendida de 90 dias com suporte técnico especializado 24/7
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/50 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-yellow-500/20">
                <Clock className="h-12 w-12 text-yellow-400" />
              </div>
              <h4 className="text-3xl font-bold text-white mb-6">Velocidade Quantum</h4>
              <p className="text-gray-400 text-lg leading-relaxed">
                Diagnóstico instantâneo e reparo ultra-rápido com IA e automação avançada
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/30 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-pink-500/50 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-pink-500/20">
                <Star className="h-12 w-12 text-pink-400" />
              </div>
              <h4 className="text-3xl font-bold text-white mb-6">Excelência Tech</h4>
              <p className="text-gray-400 text-lg leading-relaxed">
                Peças premium certificadas e técnicos com certificação internacional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato - Updated with new contact information and form functionality */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contato Tecnológico
              </h3>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Entre em contato através dos nossos canais digitais avançados
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-black/70 shadow-2xl border border-cyan-500/30 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/30">
                  <CardTitle className="text-white text-3xl">Canais de Contato</CardTitle>
                  <CardDescription className="text-gray-400 text-lg">Conecte-se conosco digitalmente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl shadow-xl border border-cyan-400/50">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xl">Telefone</p>
                      <p className="text-gray-400 text-lg">+55 71 98555-5286</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-xl border border-purple-400/50">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xl">E-mail</p>
                      <p className="text-gray-400 text-lg">lixeiradoyuno@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl shadow-xl border border-pink-400/50">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xl">Endereço</p>
                      <p className="text-gray-400 text-lg">R. Adalgisa Silva Lima, 133 - São Gonçalo<br />Salvador - BA, 41190-150, Brasil</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-xl border border-green-400/50">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xl">Horário Tech</p>
                      <p className="text-gray-400 text-lg">Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 14h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/70 shadow-2xl border border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-500/30">
                  <CardTitle className="text-white text-3xl">Orçamento Digital</CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Solicite seu orçamento através do nosso sistema inteligente
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmitForm} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">Nome</label>
                      <input 
                        type="text" 
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">Telefone</label>
                      <input 
                        type="tel" 
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="(71) 99999-9999"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">Dispositivo</label>
                      <select 
                        name="dispositivo"
                        value={formData.dispositivo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white transition-all duration-300 backdrop-blur-sm"
                        required
                      >
                        <option value="" className="bg-gray-800">Selecione...</option>
                        <option value="Smartphone" className="bg-gray-800">Smartphone</option>
                        <option value="Notebook" className="bg-gray-800">Notebook</option>
                        <option value="Computador Desktop" className="bg-gray-800">Computador Desktop</option>
                        <option value="Tablet" className="bg-gray-800">Tablet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">Problema</label>
                      <textarea 
                        name="problema"
                        value={formData.problema}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 h-32 transition-all duration-300 resize-none backdrop-blur-sm"
                        placeholder="Descreva o problema do seu dispositivo..."
                        required
                      ></textarea>
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 py-4 text-lg"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Enviar Solicitação
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-gray-900 to-black py-16 border-t border-gray-700/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <div className="p-3 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 rounded-2xl shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
                <Wrench className="h-8 w-8 text-white relative z-10" />
              </div>
              <span className="font-bold text-white text-2xl">Ra Assistência Técnica</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-lg">© 2024 Ra Assistência Técnica. Todos os direitos reservados.</p>
              <p className="text-gray-500 text-sm mt-2">Desenvolvido com tecnologia futurística e inovação</p>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
};

export default Index;
