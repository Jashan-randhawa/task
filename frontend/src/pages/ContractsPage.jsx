import React from 'react';
import { 
  FileCheck, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  TrendingUp, 
  Clock, 
  FileText,
  Download,
  Eye
} from 'lucide-react';
import './ContractsPage.css';

const contractsData = [
  {
    id: 'CTR-2024-089',
    talentName: 'Sarah Jenkins',
    talentEmail: 'sarah.j@example.com',
    role: 'Lead Sound Engineer',
    startDate: 'Oct 01, 2024',
    value: '$12,500',
    status: 'Signed',
    initials: 'SJ'
  },
  {
    id: 'CTR-2024-090',
    talentName: 'Michael Chang',
    talentEmail: 'm.chang@example.com',
    role: 'Lighting Director',
    startDate: 'Oct 15, 2024',
    value: '$8,200',
    status: 'Pending',
    initials: 'MC'
  },
  {
    id: 'CTR-2024-091',
    talentName: 'Elena Rodriguez',
    talentEmail: 'elena.r@example.com',
    role: 'Stage Manager',
    startDate: 'Nov 05, 2024',
    value: '$15,000',
    status: 'Signed',
    initials: 'ER'
  },
  {
    id: 'CTR-2024-092',
    talentName: 'David Kim',
    talentEmail: 'dkim@example.com',
    role: 'Visual Effects Coordinator',
    startDate: 'Nov 12, 2024',
    value: '$9,800',
    status: 'Draft',
    initials: 'DK'
  },
  {
    id: 'CTR-2024-085',
    talentName: 'Jessica Taylor',
    talentEmail: 'jess.t@example.com',
    role: 'Event Producer',
    startDate: 'Sep 20, 2024',
    value: '$22,000',
    status: 'Signed',
    initials: 'JT'
  }
];

export default function ContractsPage() {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Signed':
        return <span className="badge badge-success">Signed</span>;
      case 'Pending':
        return <span className="badge badge-pending">Pending</span>;
      case 'Draft':
        return <span className="badge badge-draft">Draft</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="contracts-page">
      <div className="contracts-header animate-fade-in">
        <div>
          <h1>Contracts & Agreements</h1>
          <p>Manage all your talent agreements, NDAs, and payment terms in one place.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Create Contract
        </button>
      </div>

      <div className="kpi-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <FileCheck size={18} className="text-primary" /> Active Contracts
          </div>
          <div className="kpi-value">124</div>
          <div className="kpi-trend">
            <TrendingUp size={14} /> +12% from last month
          </div>
        </div>
        
        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <Clock size={18} className="text-amber-400" /> Pending Signatures
          </div>
          <div className="kpi-value">18</div>
          <div className="kpi-trend negative">
            <Clock size={14} /> 5 requiring follow-up
          </div>
        </div>
        
        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <FileText size={18} className="text-secondary" /> Total Volume
          </div>
          <div className="kpi-value">$2.4M</div>
          <div className="kpi-trend">
            <TrendingUp size={14} /> +8.4% YoY
          </div>
        </div>
      </div>

      <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="table-toolbar">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search by name, ID, or role..." 
            />
          </div>
          
          <div className="toolbar-actions">
            <button className="btn btn-secondary">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="contracts-table-wrapper">
          <table className="contracts-table">
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Talent</th>
                <th>Role/Position</th>
                <th>Start Date</th>
                <th>Value</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contractsData.map(contract => (
                <tr key={contract.id}>
                  <td className="font-medium text-primary">{contract.id}</td>
                  <td>
                    <div className="talent-cell">
                      <div className="talent-avatar">{contract.initials}</div>
                      <div className="talent-info">
                        <span className="talent-name">{contract.talentName}</span>
                        <span className="talent-email">{contract.talentEmail}</span>
                      </div>
                    </div>
                  </td>
                  <td>{contract.role}</td>
                  <td>{contract.startDate}</td>
                  <td className="font-semibold">{contract.value}</td>
                  <td>{getStatusBadge(contract.status)}</td>
                  <td>
                    <div className="action-buttons justify-end">
                      <button className="action-btn" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Download PDF">
                        <Download size={16} />
                      </button>
                      <button className="action-btn" title="More Options">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
