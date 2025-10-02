import React, { useState, useEffect } from 'react';
import { 
  Battery, 
  Sun, 
  Wind, 
  Zap, 
  Home, 
  AlertTriangle, 
  Settings, 
  TrendingUp,
  Users,
  Activity,
  Wifi,
  WifiOff,
  RefreshCw,
  Bell,
  MapPin,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  Eye,
  Lightbulb
} from 'lucide-react';

const MicrogridApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Battery getting low - Please save power!', time: '2 min ago', priority: 'high' },
    { id: 2, type: 'maintenance', message: 'Solar panels need cleaning for better power', time: '1 hour ago', priority: 'medium' },
    { id: 3, type: 'info', message: 'Great! Maximum power generated today', time: '3 hours ago', priority: 'low' }
  ]);

  // Simulate real-time data updates
  const [gridData, setGridData] = useState({
    solarGeneration: 4.2,
    windGeneration: 1.8,
    batteryLevel: 72.90,
    consumption: 3.5,
    efficiency: 87.3,
    temperature: 28,
    weather: 'sunny',
    dailyGeneration: 45.2,
    weeklyGeneration: 298.5,
    costSaved: 1250
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGridData(prev => ({
        ...prev,
        solarGeneration: Math.max(0, prev.solarGeneration + (Math.random() - 0.5) * 0.5),
        windGeneration: Math.max(0, prev.windGeneration + (Math.random() - 0.5) * 0.3),
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 0.8)),
        consumption: Math.max(0, prev.consumption + (Math.random() - 0.5) * 0.3),
        efficiency: Math.max(70, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 1))
      }));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBatteryBgColor = (level) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getEfficiencyColor = (eff) => {
    if (eff > 85) return 'text-green-500';
    if (eff > 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const StatusCard = ({ title, value, unit, icon: Icon, color, trend, bgColor }) => (
    <div className={`${bgColor || 'bg-white'} rounded-xl p-4 shadow-lg border-2 border-gray-100 transform transition-all hover:scale-105`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${color.replace('text-', 'bg-').replace('500', '100')}`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <span className="text-sm font-bold text-gray-700">{title}</span>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${
            trend > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
          }`}>
            <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline">
        <span className={`text-3xl font-black ${color}`}>{value}</span>
        <span className="text-lg text-gray-600 ml-2 font-semibold">{unit}</span>
      </div>
    </div>
  );

  const AlertItem = ({ alert }) => {
    const getAlertColor = (type) => {
      switch (type) {
        case 'warning': return 'border-l-red-500 bg-gradient-to-r from-red-50 to-red-100';
        case 'maintenance': return 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100';
        default: return 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100';
      }
    };

    return (
      <div className={`border-l-4 p-4 mb-3 rounded-r-xl shadow-md ${getAlertColor(alert.type)}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">{alert.message}</p>
            <p className="text-xs text-gray-600 mt-2 font-medium">{alert.time}</p>
          </div>
          <span className={`text-xs px-3 py-2 rounded-full font-bold ${
            alert.priority === 'high' ? 'bg-red-500 text-white' :
            alert.priority === 'medium' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {alert.priority.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Status Header with Visual Elements */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-black">Power Status</h2>
          </div>
          <div className="flex items-center space-x-3">
            {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            <span className="text-sm font-bold">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 mb-3">
          <MapPin className="w-5 h-5" />
          <span className="text-lg font-bold">Kakuma Village, Kenya</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Key Metrics Grid with Visual Improvements */}
      <div className="grid grid-cols-2 gap-4">
        <StatusCard
          title="☀️ Solar Power"
          value={gridData.solarGeneration.toFixed(1)}
          unit="kW"
          icon={Sun}
          color="text-yellow-500"
          trend={2.1}
          bgColor="bg-gradient-to-br from-yellow-50 to-orange-100"
        />
        <StatusCard
          title="💨 Wind Power"
          value={gridData.windGeneration.toFixed(1)}
          unit="kW"
          icon={Wind}
          color="text-blue-500"
          trend={-0.5}
          bgColor="bg-gradient-to-br from-blue-50 to-cyan-100"
        />
        <StatusCard
          title="🔋 Battery Stored"
          value={gridData.batteryLevel.toFixed(2)}
          unit="%"
          icon={Battery}
          color={getBatteryColor(gridData.batteryLevel)}
          bgColor="bg-gradient-to-br from-green-50 to-emerald-100"
        />
        <StatusCard
          title="⚡ Power Used"
          value={gridData.consumption.toFixed(1)}
          unit="kW"
          icon={Zap}
          color="text-purple-500"
          bgColor="bg-gradient-to-br from-purple-50 to-pink-100"
        />
      </div>

      {/* Large Battery Visual Display */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-gray-800 flex items-center">
            <Battery className="w-6 h-6 mr-2 text-green-500" />
            Battery Storage
          </h3>
          <span className={`text-3xl font-black ${getBatteryColor(gridData.batteryLevel)}`}>
            {gridData.batteryLevel.toFixed(2)}%
          </span>
        </div>
        
        {/* Large Visual Battery */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-2xl h-16 border-4 border-gray-300">
            <div 
              className={`h-full rounded-2xl transition-all duration-1000 flex items-center justify-center text-white font-black text-lg ${getBatteryBgColor(gridData.batteryLevel)}`}
              style={{ width: `${gridData.batteryLevel}%` }}
            >
              {gridData.batteryLevel > 20 && `${gridData.batteryLevel.toFixed(1)}%`}
            </div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-2 h-8 bg-gray-300 rounded-r-md"></div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded-lg ${gridData.batteryLevel > 75 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
            <span className="text-xs font-bold">Full</span>
          </div>
          <div className={`p-2 rounded-lg ${gridData.batteryLevel > 25 && gridData.batteryLevel <= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}>
            <span className="text-xs font-bold">Medium</span>
          </div>
          <div className={`p-2 rounded-lg ${gridData.batteryLevel <= 25 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-500'}`}>
            <span className="text-xs font-bold">Low</span>
          </div>
        </div>
      </div>

      {/* Visual Energy Flow Diagram */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
        <h3 className="text-xl font-black text-gray-800 mb-6 text-center">Power Flow</h3>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl mb-3 mx-auto w-fit shadow-lg transform hover:scale-110 transition-all">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-600">☀️ Solar</p>
            <p className="text-lg font-black text-yellow-600">{gridData.solarGeneration.toFixed(1)}kW</p>
          </div>
          
          <div className="flex-1 mx-4 relative">
            <div className="border-t-4 border-dashed border-green-400 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-green-500 p-2 rounded-full animate-pulse">
                  <Activity className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <p className="text-xs text-center font-bold text-green-600 mt-1">FLOWING</p>
          </div>
          
          <div className="text-center">
            <div className={`p-4 rounded-2xl mb-3 mx-auto w-fit shadow-lg transform hover:scale-110 transition-all ${
              gridData.batteryLevel > 60 ? 'bg-gradient-to-br from-green-400 to-green-600' :
              gridData.batteryLevel > 30 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
              'bg-gradient-to-br from-red-400 to-red-600'
            }`}>
              <Battery className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-600">🔋 Battery</p>
            <p className={`text-lg font-black ${getBatteryColor(gridData.batteryLevel)}`}>
              {gridData.batteryLevel.toFixed(1)}%
            </p>
          </div>
          
          <div className="flex-1 mx-4 relative">
            <div className="border-t-4 border-dashed border-purple-400 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-purple-500 p-2 rounded-full animate-pulse">
                  <Activity className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <p className="text-xs text-center font-bold text-purple-600 mt-1">USING</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-4 rounded-2xl mb-3 mx-auto w-fit shadow-lg transform hover:scale-110 transition-all">
              <Home className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-600">🏠 Village</p>
            <p className="text-lg font-black text-purple-600">{gridData.consumption.toFixed(1)}kW</p>
          </div>
        </div>
      </div>

      {/* Recent Alerts with Visual Improvements */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-gray-800 flex items-center">
            <Bell className="w-6 h-6 mr-2 text-orange-500" />
            Important Messages
          </h3>
          <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {alerts.length}
          </div>
        </div>
        {alerts.slice(0, 2).map(alert => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-xl mt-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
          View All Messages
        </button>
      </div>
    </div>
  );

  const AnalysisView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-800 flex items-center">
          <BarChart3 className="w-7 h-7 mr-3 text-blue-600" />
          Power Analysis
        </h2>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
          <div className="flex items-center mb-2">
            <Sun className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-bold text-green-800">Today's Power</span>
          </div>
          <p className="text-2xl font-black text-green-700">{gridData.dailyGeneration} kWh</p>
          <p className="text-xs text-green-600 font-medium">+15% from yesterday</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-bold text-blue-800">This Week</span>
          </div>
          <p className="text-2xl font-black text-blue-700">{gridData.weeklyGeneration} kWh</p>
          <p className="text-xs text-blue-600 font-medium">Great performance!</p>
        </div>
      </div>

      {/* Cost Savings */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center mb-3">
          <div className="bg-white p-2 rounded-full mr-3">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-black">Money Saved</h3>
        </div>
        <p className="text-3xl font-black mb-2">KSh {gridData.costSaved.toLocaleString()}</p>
        <p className="text-sm font-medium opacity-90">This month compared to grid power</p>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
        <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
          System Performance
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">System Efficiency</span>
              <span className={`text-lg font-black ${getEfficiencyColor(gridData.efficiency)}`}>
                {gridData.efficiency.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  gridData.efficiency > 85 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  gridData.efficiency > 75 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${gridData.efficiency}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">Peak Generation Today</span>
              <span className="text-lg font-black text-green-600">6.8 kW</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-blue-400 to-green-500 transition-all duration-1000"
                style={{ width: '85%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">Village Power Coverage</span>
              <span className="text-lg font-black text-blue-600">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-1000"
                style={{ width: '92%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Simple Charts Representation */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
        <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center">
          <PieChart className="w-6 h-6 mr-2 text-blue-500" />
          Power Usage Today
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="font-bold text-green-800">🏠 Community Center</span>
            <span className="font-black text-green-600">45%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="font-bold text-blue-800">💡 Street Lights</span>
            <span className="font-black text-blue-600">25%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span className="font-bold text-purple-800">💧 Water Pump</span>
            <span className="font-black text-purple-600">20%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="font-bold text-yellow-800">📱 Phone Charging</span>
            <span className="font-black text-yellow-600">10%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AlertsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-800 flex items-center">
          <AlertTriangle className="w-7 h-7 mr-3 text-red-500" />
          All Messages
        </h2>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
          Mark All Read
        </button>
      </div>
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  );

  const ControlsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-gray-800 flex items-center">
        <Settings className="w-7 h-7 mr-3 text-gray-600" />
        Power Controls
      </h2>
      
      {/* Load Management with Visual Switches */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
        <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-500" />
          Device Control
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <span className="font-bold text-gray-800">🏠 Community Center</span>
                <p className="text-sm text-gray-600 font-medium">2.1 kW</p>
              </div>
            </div>
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all">
              ON
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <span className="font-bold text-gray-800">💡 Street Lighting</span>
                <p className="text-sm text-gray-600 font-medium">0.8 kW</p>
              </div>
            </div>
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all">
              ON
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span className="font-bold text-gray-800">💧 Water Pump</span>
                <p className="text-sm text-gray-600 font-medium">1.5 kW</p>
              </div>
            </div>
            <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all">
              OFF
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Controls with Visual Warnings */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-red-200">
        <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
          Emergency Controls
        </h3>
        <div className="space-y-4">
          <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-black text-lg shadow-xl transform hover:scale-105 transition-all">
            ⚠️ EMERGENCY SHUTDOWN
          </button>
          <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-black text-lg shadow-xl transform hover:scale-105 transition-all">
            ⚡ SAVE POWER MODE
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4 font-medium">Use only in emergencies</p>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-gray-800 flex items-center">
        <Users className="w-7 h-7 mr-3 text-blue-600" />
        Settings
      </h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 space-y-6">
        <div>
          <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-500" />
            Message Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 bg-gray-50 rounded-xl">
              <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
              <span className="font-bold text-gray-800">🚨 Critical alerts</span>
            </label>
            <label className="flex items-center p-3 bg-gray-50 rounded-xl">
              <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
              <span className="font-bold text-gray-800">🔧 Maintenance reminders</span>
            </label>
            <label className="flex items-center p-3 bg-gray-50 rounded-xl">
              <input type="checkbox" className="mr-3 w-5 h-5" />
              <span className="font-bold text-gray-800">📊 Daily reports</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-green-500" />
            Data Update
          </h3>
          <div className="space-y-3">
            <button className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-3 rounded-xl w-full font-bold">
              <RefreshCw className="w-5 h-5" />
              <span>🔄 Update Now</span>
            </button>
            <p className="text-sm text-gray-600 font-medium">Last update: {lastUpdate.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-purple-500" />
            System Information
          </h3>
          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <p className="font-bold text-gray-700">📱 Version: 2.1.0</p>
            <p className="font-bold text-gray-700">🆔 Device ID: MG-001-KK</p>
            <p className="font-bold text-gray-700">📍 Location: Kakuma Village</p>
            <p className="font-bold text-gray-700">👥 Connected Users: 157</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'analysis': return <AnalysisView />;
      case 'alerts': return <AlertsView />;
      case 'controls': return <ControlsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header with TEAM ECLIPSE Branding */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 shadow-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">TEAM ECLIPSE</h1>
              <p className="text-xs text-blue-100 font-medium">Village Power System</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-xl px-3 py-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <span className="text-white font-bold text-lg">
              {Math.round(gridData.solarGeneration + gridData.windGeneration)} kW
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {renderContent()}
      </div>

      {/* Bottom Navigation with Visual Improvements */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white border-t-4 border-blue-200 shadow-2xl">
        <div className="flex justify-around py-3">
          {[
            { id: 'dashboard', icon: Home, label: 'Home', emoji: '🏠' },
            { id: 'analysis', icon: BarChart3, label: 'Analysis', emoji: '📊' },
            { id: 'alerts', icon: AlertTriangle, label: 'Messages', emoji: '🔔' },
            { id: 'controls', icon: Settings, label: 'Controls', emoji: '⚙️' },
            { id: 'settings', icon: Users, label: 'Settings', emoji: '👥' }
          ].map(({ id, icon: Icon, label, emoji }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all transform hover:scale-110 ${
                activeTab === id 
                  ? 'text-blue-600 bg-blue-50 shadow-md' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6 mb-1" />
                {id === 'alerts' && alerts.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                    {alerts.length}
                  </div>
                )}
              </div>
              <span className="text-xs font-bold">{label}</span>
              <span className="text-xs">{emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MicrogridApp;
